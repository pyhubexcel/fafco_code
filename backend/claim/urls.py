from django.urls import path
from .views import ClaimAPI, ClaimDetailAPI, UploadClaimeDocumentAPI, AddPartToClaimAPIView,SubmitClaimAPIView

urlpatterns = [
    path('claim/', ClaimAPI.as_view(), name='claim'),
    path('claim_detail/<int:pk>/', ClaimDetailAPI.as_view()),
    path('upload/document/',UploadClaimeDocumentAPI.as_view()),
    path('upload/document/<int:pk>/',UploadClaimeDocumentAPI.as_view()),
    path('add-part/', AddPartToClaimAPIView.as_view(), name='add_part_to_claim'),
    path('submit-claim/<int:profile_id>/', SubmitClaimAPIView.as_view(), name='submit_claim'),
]
