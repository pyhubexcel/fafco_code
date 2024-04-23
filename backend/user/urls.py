from django.urls import path
from .views import (
    RegisterAPI, LoginAPI, LogoutAPI, UpdatePasswordAPIView,
    PasswordChangeAPI, ProfileAPI, ProfileDetailAPI,
    AutocompleteAPIView, SingleAddressValidationAPIView
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
]
