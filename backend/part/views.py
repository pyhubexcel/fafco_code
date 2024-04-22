from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Part, Profile
from .serializers import PartSerializer
from rest_framework.permissions import IsAuthenticated


class PartAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        parts = Part.objects.all()
        serializer = PartSerializer(parts, many=True)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response

    def post(self, request):
        data = request.data
        parts = get_object_or_404(Profile, customer=request.user.id, pk=data["profile_id"])
        data["registration"] = parts.id
        serializer = PartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data, status=200)
            response.success_message = "Part created successfully."
            return response
        response = Response(serializer.errors, status=200)
        response.success_message = "Error occured."
        return response


class PartDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,part_id):
        user = request.user.id
        part = get_object_or_404(Part,pk=part_id)
        serializer = PartSerializer(part)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response

    def patch(self, request,part_id):
        user = request.user.id
        part = get_object_or_404(Part,pk=part_id)
        serializer = PartSerializer(part, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data, status=200)
            response.success_message = "Updated Data."
            return response
        response = Response(serializer.errors, status=200)
        response.success_message = "Error Occured."
        return response

    def delete(self, request,part_id):
        user = request.user.id
        part = get_object_or_404(Part,pk=part_id)
        part.delete()
        response = Response(status=200)
        response.success_message = "Deleted Successfully."
        return response