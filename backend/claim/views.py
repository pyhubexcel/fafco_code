from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Claim, Profile , UploadClaimDocument, ClaimStatus
from .serializers import ClaimSerializer , UploadClaimSerializer
from django.conf import settings
from part.models import Part


class ClaimAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        claims = Claim.objects.all()
        serializer = ClaimSerializer(claims, many=True)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response


    
    def post(self, request, *args, **kwargs):
        data = request.data
        part_ids = data.get('part_ids', [])
        if not isinstance(part_ids, list):
            part_ids = [part_ids]  
        
        response_data = []

        for part_id in part_ids:
            try:
                part = Part.objects.get(id=part_id)
                claim_data = {
                    'registration': part.id,
                    'status': data.get('status'),
                    'status_code': data.get('status_code'),
                    'date_finalized': data.get('date_finalized'),
                    'csr_note': data.get('csr_note'),
                    'add_comment': data.get('add_comment'),
                    'dealer_ref_number': data.get('dealer_ref_number'),
                    'claim_action': data.get('claim_action'),
                    'part_problem': data.get('part_problem'),
                }
                serializer = ClaimSerializer(data=claim_data)
                if serializer.is_valid():
                    serializer.save()
                    response_data.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Part.DoesNotExist:
                return Response({'error': f'Part with id {part_id} does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response(response_data, status=status.HTTP_201_CREATED)


class ClaimDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        claims = get_object_or_404(Claim, pk=pk)
        serializer = ClaimSerializer(claims)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response
     

    def patch(self, request, pk):
        claim = get_object_or_404(Claim, pk=pk)

        if claim.status.claim_code == 7 or claim.status.claim_code == 99:

            serializer = ClaimSerializer(claim, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                response = Response(serializer.data, status=200)
                response.success_message = "Updated Data."
                return response
            response = Response(serializer.errors, status=200)
            response.success_message = "Error Occured."
            return response

        else:
            return Response({"message": "Cannot update claim unless it is Denied or Voided."}, status=400)


    def delete(self, request, pk):
        claims = get_object_or_404(Claim, pk=pk)
        claims.delete()
        return Response({"message": "Deleted Successfully"})


class UploadClaimeDocumentAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        profile_id = data.get('profile_id')
        if not profile_id:
            return Response({"error": "Profile ID is required."}, status=400)

        try:
            profile = Profile.objects.get(id=profile_id, customer=request.user)
            data['regid'] = profile.id
        except Profile.DoesNotExist:
            return Response({"error": "Profile does not exist for this user."}, status=400)

        serializer = UploadClaimSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        document = serializer.save()

        response_serializer = UploadClaimSerializer(document)
        return Response({
            "message": "Document uploaded successfully",
            "document_id": document.id,
            "data": response_serializer.data
        }, status=201)


    def put(self, request, profile_id, document_id):
        try:
            document = UploadClaimDocument.objects.get(id=document_id, regid_id=profile_id)
        except UploadClaimDocument.DoesNotExist:
            return Response({"error": "Document not found for this Profile."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UploadClaimSerializer(document, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, profile_id=None):
        if profile_id:
            try:
                profile = Profile.objects.get(id=profile_id, customer=request.user)
                documents = UploadClaimDocument.objects.filter(regid=profile)
                serializer = UploadClaimSerializer(documents, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Profile.DoesNotExist:
                return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"error": "Profile ID is required."}, status=status.HTTP_400_BAD_REQUEST)


class AddPartToClaimAPIView(APIView):

    def post(self, request):
        documents = request.FILES.getlist('documents', [])
        serializer = ClaimSerializer(data=request.data)
        if serializer.is_valid():
            part_id = request.data.get('part_id')
            try:
                part = Part.objects.get(id=part_id)              
                repair_date = request.data.get("repair_date")
                if repair_date:  
                    part.repair_date = repair_date               
                    part.save()
            except Part.DoesNotExist:
                return Response({"error": "Part not found"}, status=status.HTTP_400_BAD_REQUEST)          
            # Check if there's an existing claim for this part ID
            existing_claim = Claim.objects.filter(part_id=part).first()
            
            if existing_claim:
                return Response({"error": "Claim already exists for this part ID"}, status=status.HTTP_400_BAD_REQUEST)
            statu = ClaimStatus.objects.get(claim_code=0)
            # Create a new claim if no existing claim is found
            claim = serializer.save(part_id=part, status=statu)
            
            # Handle document uploads
            if documents:
                document_paths = []
                for document in documents:
                    path = default_storage.save(f'uploads/{document.name}', ContentFile(document.read()))
                    document_paths.append(default_storage.url(path))
                
                claim.documents = document_paths
                claim.save()
            
            regid = part.registration.id
            response_data = {
                "repair_date": serializer.data["repair_date"],
                "ramid_id": "1000"+str(regid),  
                "claim_action": serializer.data["claim_action"],
                "part_problem": serializer.data["part_problem"],
                "part_id": serializer.data["part_id"],
                "part_number": part.part_number,
                "regid": regid,
                "add_comment": serializer.data["add_comment"],
                "status": claim.status.claim_code
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubmitClaimAPIView(APIView):

    def post(self, request, profile_id):
        # Get all parts related to the given profile ID with Received claims
        parts = Part.objects.filter(registration__id=profile_id, claim__status=0)
        
        if not parts.exists():
            return Response({"error": "No received parts found for the given profile ID"}, status=status.HTTP_400_BAD_REQUEST)

        part_ids = list(parts.values_list('id', flat=True))

        # Update claim status from Received to Processed
        claims_updated_count = Claim.objects.filter(part_id__in=part_ids, status=0).update(status=3)

        if claims_updated_count == 0:
            return Response({"error": "No claims found with the specified part IDs and Received status"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the part numbers of the updated claims
        updated_claims = Claim.objects.filter(part_id__in=part_ids, status=3)
        part_numbers = Part.objects.filter(id__in=updated_claims.values_list('part_id', flat=True)).values_list('part_number', flat=True)

        add_comment = request.data.get('add_comment')

        response_data = []

        for claim in updated_claims:
            # claim.add_comment = add_comment
            claim.save()

            claim_data = {
                "regid": claim.part_id.registration.id,
                "ramid": claim.part_id.registration.id,
                "part_id": claim.part_id.id,
                "action": claim.claim_action,
                "problem": claim.part_problem,
                "status": claim.status.claim_code,
                "add_comment": claim.add_comment,
            }
            response_data.append(claim_data)

        # Join part numbers into a string for the response message
        part_numbers_str = ', '.join(part_numbers)

        return Response({"message": f"Claims for parts {part_numbers_str} submitted successfully", "claims": response_data}, status=status.HTTP_200_OK)


class RetrieveClaimAPIView(APIView):

    def get(self, request, profile_id):
        parts = Part.objects.filter(registration__id=profile_id)
        
        if not parts.exists():
            return Response({"error": "No parts found for the given profile ID"}, status=status.HTTP_404_NOT_FOUND)

        part_ids = list(parts.values_list('id', flat=True))

        claims = Claim.objects.filter(part_id__in=part_ids)

        response_data = []

        for claim in claims:
            claim_data = {
                "regid": claim.part_id.registration.id,
                "repair_date": claim.part_id.repair_date,
                "ramid": "1000"+str(claim.part_id.registration.id),
                "part_id": claim.part_id.id,
                "part_description": claim.part_id.part_description,
                "action": claim.claim_action,
                "problem": claim.part_problem,
                "status": claim.status.claim_code,
                "documents":claim.documents,
                "add_comment": claim.add_comment  
            }
            response_data.append(claim_data)

        return Response({"claims": response_data}, status=status.HTTP_200_OK)


