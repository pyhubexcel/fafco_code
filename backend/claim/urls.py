from django.urls import path
from .views import ClaimAPI, ClaimDetailAPI, UploadClaimeDocumentAPI, AddPartToClaimAPIView,SubmitClaimAPIView, RetrieveClaimAPIView, RetriveAddPartToClaimAPIView

urlpatterns = [
    path('claim/', ClaimAPI.as_view(), name='claim'),
    path('claim_detail/<int:pk>/', ClaimDetailAPI.as_view()),
    path('upload/document/',UploadClaimeDocumentAPI.as_view()),
    path('update/<int:profile_id>/documents/<int:document_id>/', UploadClaimeDocumentAPI.as_view(), name='update_claim_document'),
    path('upload/document/<int:pk>/',UploadClaimeDocumentAPI.as_view()),
    path('add-part/', AddPartToClaimAPIView.as_view(), name='add_part_to_claim'),
    path('submit-claim/<int:profile_id>/', SubmitClaimAPIView.as_view(), name='submit_claim'),
    path('retrieve-claims/<int:profile_id>/', RetrieveClaimAPIView.as_view(), name='claim_detail'),
    path('retrieve-add-part/<int:profile_id>/<int:part_id>/', RetriveAddPartToClaimAPIView.as_view()),
    
]
