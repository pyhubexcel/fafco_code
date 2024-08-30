from rest_framework import serializers

from django.conf import settings

from .models import Claim , UploadClaimDocument
from utils.helper import generate_absolute_uri

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'


class UploadClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadClaimDocument
        fields = '__all__'


class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ('documents',)  

        
class SubmitClaimSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
