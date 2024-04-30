from django.urls import path
from django.contrib.auth import views as auth_views

from .views import (
    RegisterAPI, LoginAPI, LogoutAPI, UpdatePasswordAPIView,
    PasswordChangeAPI, ProfileAPI, ProfileDetailAPI,
    AutocompleteAPIView, SingleAddressValidationAPIView,
    PasswordResetAPIView, PasswordResetConfirmAPIView, VerifyEmailAPI, 
    ResendVerificationEmailAPIView
)

urlpatterns = [
    path('signup/', RegisterAPI.as_view(), name='signup'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('update_password/', UpdatePasswordAPIView.as_view(),
         name='update_password'),
    path('change_password/', PasswordChangeAPI.as_view(),
         name='change_password'),
    path('profiles/', ProfileAPI.as_view(), name='profile'),
    path('profile_detail/<int:pk>/', ProfileDetailAPI.as_view(),
         name='ProfileDetailAPI'),
    path('autocomplete/', AutocompleteAPIView.as_view(), name='autocomplete'),
    path('validation/', SingleAddressValidationAPIView.as_view(),
         name='validation'),
    path('forgot-password/', PasswordResetAPIView.as_view(),
         name='forgot_password'),
    path('reset/confirm/<uidb64>/<token>/',
         PasswordResetConfirmAPIView.as_view(), name='password_reset_confirm'),
    path('reset-password/complete/',
         auth_views.PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
    path('verify/<str:uidb64>/<str:token>/', VerifyEmailAPI.as_view(),
          name='verify_email'),
    path('resend-verification/', ResendVerificationEmailAPIView.as_view(),
         name='resend_verification'),
]
