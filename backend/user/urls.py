from django.urls import path
from .views import (
    RegisterAPI, LoginAPI, LogoutAPI, UpdatePasswordAPIView,
    PasswordChangeAPI, ProfileAPI, 
)

urlpatterns = [
    # URL pattern for user registration/signup
    path('signup/', RegisterAPI.as_view(), name='signup'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('update_password/', UpdatePasswordAPIView.as_view(), name='update_password'),
    path('change_password/', PasswordChangeAPI.as_view(), name='change_password'),
    path('profile/', ProfileAPI.as_view(), name='profile'),

]
