from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    CustomerSerializer, ProfileSerializer, UpdatePasswordSerializer,
)
from .models import Customer, Profile
from rest_framework import permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from django.utils.http import (urlsafe_base64_encode, urlsafe_base64_decode)
from .custom_token import account_activation_token
from django.utils.encoding import force_bytes, force_str
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from utils.search_location import autocomplete
from utils.single_address_validation import singleaddressvalidation
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.urls import reverse
from .serializers import ForgotPasswordSerializer


class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        data["username"] = data["email"]
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                "status": "Successful",
                "message": "User Created",
                "data": serializer.data,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            errors = serializer.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
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
            response_data = {
                "status": "Successfull",
                "message": "Login successfully by user",
                "data": data,
                }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {
             "message": "Your account is Disabled."
            }
            return Response(response_data, status=status.HTTP_200_OK)


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args):
        logout(request)
        response_data = {
         "status": "Successfull",
         "message": "Logout successfully by user",
        }
        return Response(response_data, status=status.HTTP_200_OK)


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


class PasswordResetAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = get_object_or_404(Customer, email=email, is_active=True)
            user.password_reset_done = False
            user.save()
            reset_url = self._generate_reset_url(request, user)
            self._send_reset_email(user.email, reset_url)
            return Response(
                {'message': 'Password reset email sent'},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid request'},
                status=status.HTTP_400_BAD_REQUEST)

    def _generate_reset_url(self, request, user):
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        protocol = 'https' if request.is_secure() else 'http'
        domain = request.get_host()
        return f"{protocol}://{domain}{reverse('password_reset_confirm', args=[uid, token])}"

    def _send_reset_email(self, email, reset_url):
        email_subject = 'Password Reset'
        email_body = f'Click the link below to reset your password:\n\n{reset_url}'
        email = EmailMultiAlternatives(email_subject, email_body, to=[email])
        email.send()


class PasswordResetConfirmAPIView(APIView):

    def post(self, request, uidb64, token):
        uid = urlsafe_base64_decode(uidb64)
        user = get_object_or_404(Customer, pk=uid)

        if user is not None and default_token_generator.check_token(
                                                        user, token):
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('confirm_password')

            if new_password != confirm_password:
                return Response({'error': "Passwords should be same"},
                                status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.password_reset_done = True
            user.save()
            return Response({'message': 'Password reset successfully'},
                            status=status.HTTP_200_OK)
        return Response({'error': 'Invalid request'},
                        status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeAPI(APIView):
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
                        response_data = {
                         "status": "Successfull",
                         "message": "Password changed.",
                         "data": serializer.data,
                        }
                        return Response(response_data,
                                        status=status.HTTP_200_OK)
                    response_data = {
                     "status": "Faild",
                     "message": "Password mismatched.",
                    }
                    return Response(response_data,
                                    status=status.HTTP_400_BAD_REQUEST)
                return Response({"message": "UNAUTHORIZED"},
                                status=status.HTTP_401_UNAUTHORIZED)
            return Response({"message": "BAD REQUEST"},
                            status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response = Response(status=400)
            response.error_message = str(e)
            return response


class ProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        Profiles = Profile.objects.all()
        serializer = ProfileSerializer(Profiles, many=True)
        response_data = {
            "message": "Fetched Data.",
            "data": serializer.data
            }
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data["customer"] = request.user.id
        serializer = ProfileSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Profile created successfully"},
                        status=status.HTTP_200_OK)


class ProfileDetailAPI(APIView):

    def get(self, request, pk):

        user_profile = get_object_or_404(Profile,
                                         customer=request.user.id, pk=pk)

        serializer = ProfileSerializer(user_profile)

        response_data = {
         "message": "User Profile",
         "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        user_profile = get_object_or_404(Profile,
                                         customer=request.user.id, pk=pk)

        serializer = ProfileSerializer(
            user_profile, data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=False)
        serializer.save()
        response_data = {
         "message": "Updated Successfully",
         "data": serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = get_object_or_404(Profile, pk=pk)
        user.is_active = False
        user.save()
        return Response({"message": "User disabled Successfully"},
                        status=status.HTTP_200_OK)


class AutocompleteAPIView(APIView):
    def get(self, request):
        search_term = request.GET.get('search_term', '')
        if not search_term:
            return Response({'error': 'Please provide a search term'},
                            status=status.HTTP_400_BAD_REQUEST)
        results = autocomplete(search_term)
        return Response(results)


class SingleAddressValidationAPIView(APIView):
    def post(self, request):
        address_data = request.data
        validation_result = singleaddressvalidation(address_data)
        return Response(validation_result)
