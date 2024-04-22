from django.urls import path
from .views import PartAPI, PartDetailAPI

urlpatterns = [
    # URL pattern for user registration/signup
    path('part/', PartAPI.as_view(), name='part'),
    path('part_detail/<int:part_id>/', PartDetailAPI.as_view(), name='part_detail'),

]
