from django.urls import path
from .views import ClaimAPI, ClaimDetailAPI

urlpatterns = [
    path('claim/', ClaimAPI.as_view(), name='claim'),
    path('claim_detail/<int:pk>/', ClaimDetailAPI.as_view()),
]
