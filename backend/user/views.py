from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    CustomerSerializer, ProfileSerializer, UpdatePasswordSerializer,
    PasswordSerializer,
)
from .models import Customer, Profile
from rest_framework import permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .custom_token import account_activation_token
from django.utils.encoding import force_bytes, force_str
from utils.msg import FORGOT_PASSWORD_URL
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import logout
from dotenv import load_dotenv
import os

load_dotenv()


class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        data["username"] = data["email"]
        data["password"] = os.getenv("DEFAULT_PASSWORD")
        serializer = CustomerSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = Customer.objects.get(username=data["username"])

        subject = 'welcome,'
        html_message = FORGOT_PASSWORD_URL.format(
            name=user.first_name + ' ' + user.last_name,
            FRONTEND_IP=settings.FE_DOMAIN,
            user_id=urlsafe_base64_encode(force_bytes(user.id)),
            user_object=account_activation_token.make_token(user)
        )

        try:
            send_mail(
                subject=subject,
                message='',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[data["notify_email"]],
                fail_silently=False,
                html_message=html_message
            )
        except Exception as e:
            response = Response(status=400)
            response.success_message = "Failed to send email."
            return response

        response = Response(status=200)
        response.success_message = "User Created, please check your mail to change the password."
        return response


class LoginAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        if not request.data["password"]:
            request.data["password"] = os.getenv("DEFAULT_PASSWORD")
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(Customer, email=request.data["username"])
        if user.is_active:
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            data = {
                'id': user.id,
                'customer_type': user.customer_type,
                'email': user.email,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            response = Response(data, status=200)
            response.success_message = "Login successfully."
            return response
        else:
            response = Response(status=200)
            response.error_message = "Your account is Disabled."
            return response


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args):
        logout(request)
        response = Response(status=200)
        response.success_message = "Logout successfully."
        return response


class UpdatePasswordAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        serializer = UpdatePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        current_password = serializer.validated_data.get('current_password')
        new_password = serializer.validated_data.get('new_password')
        re_password = serializer.validated_data.get("re_password")

        if user.check_password(current_password):
            if new_password == re_password:
                user.password = make_password(new_password)
                user.save()
                return Response('Password updated successfully.')
            return Response("Password is mismatched.", status=400)
        return Response('Current password is incorrect.', status=400)


class PasswordChangeAPI(APIView):
    serializer_class = PasswordSerializer

    def post(self, request):
        data = dict(request.data)
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        uid = force_str(urlsafe_base64_decode(request.query_params["uid"]))
        try:
            password = serializer.validated_data['password']
            re_password = serializer.validated_data['confirm_password']

            if uid.isnumeric():
                token = request.query_params["token"]
                user = get_object_or_404(Customer, id=uid)
                if account_activation_token.check_token(user, token):
                    if password == re_password:
                        user.password = make_password(password)
                        user.save()
                        response = Response(status=200)
                        response.success_message = "Password changed."
                        return response

                    response = Response(status=400)
                    response.success_message = "Password mismatched."
                    return response
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response = Response(status=400)
            response.error_message = str(e)
            return response


class ProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = request.data
        data["customer"] = request.user.id
        serializer = ProfileSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        response = Response(status=200)
        response.success_message = "Profile changed successfully."
        return response
    
    def get(self, request):
        user_profile = get_object_or_404(Profile, customer=request.user.id)

        serializer = ProfileSerializer(user_profile)
        response = Response(serializer.data, status=200)
        response.success_message = "User Profile."
        return response

    def patch(self, request, pk=None):
        user_profile = get_object_or_404(Profile, customer=request.user.id)

        serializer = ProfileSerializer(
            user_profile, data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = Response(serializer.data, status=200)
        response.success_message = "Updated."
        return response

    def delete(self, request, pk=None):
        user = get_object_or_404(Profile, pk=pk)
        user.is_active = False
        user.save()
        response = Response(status=200)
        response.success_message = "User disabled Successfully."
        return response
