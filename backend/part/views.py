from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Part, Profile,Partcsv
from .serializers import PartSerializer, PartcsvSerializer


class PartAPI(APIView):
    permission_classes = [IsAuthenticated]
    

    def post(self, request):
        data = request.data
        parts = get_object_or_404(Profile, customer=request.user.id,
                                pk=data["profile_id"])
        
        data["registration"] = parts.id
        
        serializer = PartSerializer(data=data)
        
        if serializer.is_valid():
            part = serializer.save()
            
            part_number = str(part.part_number).zfill(6)  
            serial_number = str(part.id).zfill(8)  
            barcode = f"{part_number}-{serial_number}" 
            part.barcode = barcode 
            part.save()  
            response_data = serializer.data
            response_data["barcode"] = barcode
            response = Response(response_data, status=200)
            response.success_message = "Part created successfully"
            return response
        else:
            response = Response(serializer.errors, status=200)
            response.success_message = "Error occurred."
            return response




class PartListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, profile_id):
        parts = Part.objects.filter(registration=profile_id)  
        serializer = PartSerializer(parts, many=True)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response

class PartupdatedeleteAPI(APIView):
    

    def get(self, request, profile_id, part_id):
        
        
        part = get_object_or_404(Part, registration=profile_id, pk=part_id)
        data = {
            "id": part.pk,
            "part_number": part.part_number,
            "part_description": part.part_description,
            "product_line": part.product_line,
            "active": part.active,
            "registration": part.registration_id
        }
        return Response(data, status=200)

    def patch(self, request, profile_id, part_id):
        part = get_object_or_404(Part, pk=part_id, registration=profile_id)

        part_number = request.data.get('part_number')
        profile_part = Part.objects.filter(part_number=part_number, registration= profile_id)

        if profile_part:
            return Response(
               {'error': 'Part is already exist for this profile'},
                status=status.HTTP_400_BAD_REQUEST
            )
        part_data = get_object_or_404(Partcsv, part_number=part_number)
        data = {
            "part_number": part_data.part_number,
            "part_description": part_data.part_description,
            "product_line": part_data.product_line,
        }

        serializer = PartSerializer(part, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()

            part_number_str = str(part.part_number).zfill(6)
            serial_number_str = str(part.id).zfill(8)
            part.barcode = f"{part_number_str}-{serial_number_str}"
            part.save()

            response_data = serializer.data
            response_data["barcode"] = part.barcode
            response = Response(response_data, status=200)
            response.success_message = "Updated Data Successfully"
            return response
        
        response = Response(serializer.errors, status=200)
        response.success_message = "Error Occurred."
        return response


    def delete(self, request, profile_id, part_id):
        part = get_object_or_404(Part, pk=part_id, registration=profile_id)
        part.delete()
        return Response({"message": "Part deleted Successfully","status":True},
                        status=status.HTTP_200_OK)


class PartcsvListView(APIView):
    def get(self, request):
        parts = Partcsv.objects.all()
        serializer = PartcsvSerializer(parts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PartupdateAPI(APIView):
    def patch(self, request, part_id):
        part = get_object_or_404(Part, pk=part_id)

        serializer = PartSerializer(part, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data, status=200)
            response.success_message = "Updated Data."
            return response
        response = Response(serializer.errors, status=200)
        response.success_message = "Error Occured."
        return response