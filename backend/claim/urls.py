from django.urls import path
from .views import ClaimAPI, ClaimDetailAPI

urlpatterns = [
    # URL pattern for user registration/signup
    path('claim/', ClaimAPI.as_view(), name='claim'),
    path('claim_detail/', ClaimDetailAPI.as_view(), name='claim_detail'),

]
