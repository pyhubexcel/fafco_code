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
from .serializers import ForgotPasswordSerializer,LoginSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from utils.mail_send import send_verification_email


class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        data["username"] = data["email"]
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()
            self.send_verification_email(user)
            return Response(             
                {"success": True, "message": "Verification link has been sent to your email. Please check your email inbox.","email": user.email},
                status=status.HTTP_200_OK,
            )
        else:
            errors = serializer.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        verification_url = f"http://{settings.BACKEND_IP}/api/auth/verify/{uid}/{token}/"
        click_here_link = f'<a href="{verification_url}">click here</a>'
        send_mail(
            "Verify Your Email",
            f"Click the link to verify your email: {click_here_link}",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
            html_message=f"Click the link to verify your email: {click_here_link}",
        )

class ResendVerificationEmailAPIView(APIView):
    def post(self, request):
        email = request.data['payload']['username']
        try:
            user = Customer.objects.get(email=email)
            if user.is_active:
                return Response(
                    {"status": "Failed", "message": "User is already active."},
                    status=status.HTTP_200_OK,
                )
            RegisterAPI.send_verification_email(self, user)
            return Response(
                {"success":True, "message": "Verification link has been resent to your email. Please check your email inbox."},
                status=status.HTTP_200_OK,
            )
        except Customer.DoesNotExist:
            return Response(
                {"success": False, "message": "User with this email does not exist."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

class VerifyEmailAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, uidb64, token):
        uid = urlsafe_base64_decode(uidb64).decode()
        user = Customer.objects.filter(pk=uid).first()
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            message = "Successfully verified. You can now log in."
            return render(request, 'email_template.html', {'message': message})
        else:
            message = "Successfully verified. You can now log in."
            return render(request, 'email_template.html', {'message': message})


class LoginAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            try:
                user = Customer.objects.get(email=email)
            except Customer.DoesNotExist:
                response_data = {
                    "success": False,
                    "message": "Email does not exist"
                }
                return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
            if not user.is_active:
                response_data = {
                    "success": False,
                    "message": "Inactive Account"
                }
                return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
            if not user.check_password(password):
                response_data = {
                    "success": False,
                    "message": "Invalid password"
                }
                return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
            refresh = RefreshToken.for_user(user)

            data = {
                'id': user.id,
                'customer_type': user.customer_type,
                'name': user.name,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            response_data = {
                "success": True,
                "message": "Login successfully",
                "data": data,
            }
            return Response(response_data, status=status.HTTP_200_OK)

        response_data = {
            "success": False,
            "message": "Invalid credentials"
        }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)


class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args):
        logout(request)
        response_data = {
         "success": True,
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
            user = get_object_or_404(Customer, email=email)
            if not user.is_active:
                return Response(
                {'detail': 'User in not active'},
                status=status.HTTP_400_BAD_REQUEST)          
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
        email = urlsafe_base64_encode(user.email.encode('utf-8'))
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        protocol = 'https' if request.is_secure() else 'http'
        domain = 'localhost:5173/newpassword/'
        return f"{protocol}://{domain}{email}"

    def _send_reset_email(self, email, reset_url):
        email_subject = 'Password Reset'
        email_body = f'Click the link below to reset your password:\n\n<a href="{reset_url}">click here</a>'
        email = EmailMultiAlternatives(email_subject, email_body, to=[email])
        email.send()
        
        
class PasswordResetConfirmAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        uid_bytes = urlsafe_base64_decode(email)
        uid_str = uid_bytes.decode('utf-8')
        print(uid_str) 
        user = get_object_or_404(Customer, email=uid_str)  
        if user:
            new_password = request.data.get('newPassword')
            confirm_password = request.data.get('confirmPassword')

            if new_password != confirm_password:
                return Response({'error': "Passwords should be same"},
                                status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.password_reset_done = True
            user.save()
            return Response({'message': 'Password reset successfully'},
                            status=status.HTTP_200_OK)
            
        return Response({'error': 'user not found'},
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
        
        
class UpdateCustomerAPI(APIView):
    def get(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)     
        data = {}
        if 'name' and 'phone' in request.data:
            data['name'] = request.data['name']
            data['phone'] = request.data['phone'] 
        serializer = CustomerSerializer(customer, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Updated Data"},
                            status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
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
        user = get_object_or_404(Profile, customer=request.user.id, pk=pk)
        user.is_active = True
        user.save()
        return Response(
            {"message": "User disabled Successfully"},
            status=status.HTTP_200_OK
        )


class AutocompleteAPIView(APIView):
    def get(self, request):
        search_term = request.GET.get('search_term', '')
        if not search_term:
            return Response(
               {'error': 'Please provide a search term'},
                status=status.HTTP_400_BAD_REQUEST
            )
        results = autocomplete(search_term)
        return Response(results)


class SingleAddressValidationAPIView(APIView):
    def post(self, request):
        address_data = request.data
        validation_result = singleaddressvalidation(address_data)
        return Response(validation_result)
