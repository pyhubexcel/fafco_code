from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Claim, Profile
from .serializers import ClaimSerializer
from rest_framework.permissions import IsAuthenticated


class ClaimAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        parts = Claim.objects.all()
        serializer = ClaimSerializer(parts, many=True)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response

    def post(self, request):
        data = request.data
        profile = get_object_or_404(Profile, customer=request.user.id)
        data["registration"] = profile.id
        serializer = ClaimSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data, status=200)
            response.success_message = "Part created successfully."
            return response
        response = Response(serializer.errors, status=200)
        response.success_message = "Error occured."
        return response


class ClaimDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user.id
        profile = get_object_or_404(Profile, customer=user)
        part = get_object_or_404(Claim, registration=profile.id)
        serializer = ClaimSerializer(part)
        response = Response(serializer.data, status=200)
        response.success_message = "Fetched Data."
        return response

    def patch(self, request):
        user = request.user.id
        profile = get_object_or_404(Profile, customer=user)
        part = get_object_or_404(Claim, registration=profile.id)
        serializer = ClaimSerializer(part, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = Response(serializer.data, status=200)
            response.success_message = "Updated Data."
            return response
        response = Response(serializer.errors, status=200)
        response.success_message = "Error Occured."
        return response

    def delete(self, request):
        user = request.user.id
        profile = get_object_or_404(Profile, customer=user)
        part = get_object_or_404(Claim, registration=profile.id)
        part.delete()
        response = Response(status=200)
        response.success_message = "Deleted Successfully."
        return response
