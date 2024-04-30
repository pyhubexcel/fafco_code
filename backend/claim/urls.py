from django.urls import path
from .views import ClaimAPI, ClaimDetailAPI, UploadClaimeDocumentAPI

urlpatterns = [
    path('claim/', ClaimAPI.as_view(), name='claim'),
    path('claim_detail/<int:pk>/', ClaimDetailAPI.as_view()),
    path('upload/document/',UploadClaimeDocumentAPI.as_view()),
    path('upload/document/<int:pk>/',UploadClaimeDocumentAPI.as_view())
]
