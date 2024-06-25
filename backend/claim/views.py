from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Claim, Profile , UploadClaimDocument
from .serializers import ClaimSerializer , UploadClaimSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from part.models import Part
from rest_framework import status
from django.db.models import Q
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


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
        if claim.status == Claim.Denied or claim.status == Claim.Voided:

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
            # "document_id": document.id,
            # "data": response_serializer.data
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


    def get(self, request, profile_id=None, document_id=None):
        if document_id:
            try:
                document = UploadClaimDocument.objects.get(id=document_id, regid__customer=request.user)
                serializer = UploadClaimSerializer(document)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except UploadClaimDocument.DoesNotExist:
                return Response({"error": "Document not found."}, status=status.HTTP_404_NOT_FOUND)
        
        if profile_id:
            try:
                profile = Profile.objects.get(id=profile_id, customer=request.user)
                documents = UploadClaimDocument.objects.filter(regid=profile)
                serializer = UploadClaimSerializer(documents, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Profile.DoesNotExist:
                return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({"error": "Profile ID or Document ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    # def get(self, request, pk):
    #     claims_docs = get_object_or_404(UploadClaimDocument, pk=pk)
    #     serializer = UploadClaimSerializer(claims_docs,context={"request": request})
    #     document_url = serializer.get_document(claims_docs)
    #     serializer.data['document'] = document_url
    #     response = Response(serializer.data, status=200)
    #     response.success_message = "Fetched Data."
    #     return response


# class UploadClaimeDocumentAPI(APIView):
#     # permission_classes = [IsAuthenticated]

#     def post(self,request):
#         data =request.data
#         serializer = UploadClaimSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors)
#         serializer.save()
#         return Response({"message":"document is uploaded successfully"})



#     def get(self, request, pk):
#         claims_docs = get_object_or_404(UploadClaimDocument, pk=pk)
#         serializer = UploadClaimSerializer(claims_docs,context={"request": request})
#         document_url = serializer.get_document(claims_docs)
#         serializer.data['document'] = document_url
#         response = Response(serializer.data, status=200)
#         response.success_message = "Fetched Data."
#         return response


class AddPartToClaimAPIView(APIView):

    def post(self, request):
        documents = request.FILES.getlist('documents', [])
        serializer = ClaimSerializer(data=request.data)
        if serializer.is_valid():
            parts_id = request.data.get('part_id')  
            try:
                part = Part.objects.get(id=parts_id)  
            except Part.DoesNotExist:
                return Response({"error": "Part not found"}, status=status.HTTP_400_BAD_REQUEST)
            
            claim = serializer.save(part_id=part, status=Claim.Draft)
            
            if documents:
                document_paths = []
                for document in documents:
                    path = default_storage.save(f'uploads/{document.name}', ContentFile(document.read()))
                    document_paths.append(default_storage.url(path))
                
                claim.documents = document_paths
                claim.save()
            regid = part.registration.id
            response_data = {
                "ramid_id": claim.id,
                "claim_action": serializer.data["claim_action"],
                "part_problem": serializer.data["part_problem"],
                "part_id": serializer.data["part_id"],
                "part_number": part.part_number,
                "regid":regid,
                "add_comment":serializer.data["add_comment"],
                "status":claim.status
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class RetriveAddPartToClaimAPIView(APIView):

    def get(self, request, profile_id, part_id):
        try:
            profile = Profile.objects.get(id=profile_id)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            part = Part.objects.get(id=part_id)
        except Part.DoesNotExist:
            return Response({"error": "Part not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Filtering Claims related to the given Part and Profile
        claims = Claim.objects.filter(part=part, part__registration__profile=profile)
        serializer = ClaimSerializer(claims, many=True)
        
        response_data = []
        for claim in claims:
            response_data.append({
                "ramid_id": claim.id,
                "claim_action": claim.claim_action,
                "part_problem": claim.part_problem,
                "part_id": claim.part.id,
                "part_number": part.part_number,
                "regid": part.registration.id,
                "add_comment": claim.add_comment,
                "status": claim.status
            })

        return Response(response_data, status=status.HTTP_200_OK)



class SubmitClaimAPIView(APIView):

    def post(self, request, profile_id):
        parts = Part.objects.filter(registration__id=profile_id, claim__status=Claim.Draft)
        
        if not parts.exists():
            return Response({"error": "No draft parts found for the given profile ID"}, status=status.HTTP_400_BAD_REQUEST)

        part_ids = list(parts.values_list('id', flat=True))

        claims_updated_count = Claim.objects.filter(part_id__in=part_ids, status=Claim.Draft).update(status=Claim.Pending)

        if claims_updated_count == 0:
            return Response({"error": "No claims found with the specified part IDs and Draft status"}, status=status.HTTP_400_BAD_REQUEST)

        add_comment = request.data.get('add_comment')

        updated_claims = Claim.objects.filter(part_id__in=part_ids, status=Claim.Pending)

        response_data = []

        for claim in updated_claims:
            # claim.add_comment = add_comment
            claim.save()

            claim_data = {
                "regid": claim.part_id.registration.id,
                "ramid": claim.id,
                "part_id": claim.part_id.id,
                "action": claim.claim_action,
                "problem": claim.part_problem,
                "status": claim.status,
                "add_comment": claim.add_comment,
            }
            response_data.append(claim_data)

        return Response({"message": f"{claims_updated_count} claims submitted successfully", "claims": response_data}, status=status.HTTP_200_OK)


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
                "ramid": claim.id,
                "part_id": claim.part_id.id,
                "action": claim.claim_action,
                "problem": claim.part_problem,
                "status": claim.status,
                "add_comment": claim.add_comment  # Assuming 'add_comment' is a field on Claim model
            }
            response_data.append(claim_data)

        return Response({"claims": response_data}, status=status.HTTP_200_OK)
