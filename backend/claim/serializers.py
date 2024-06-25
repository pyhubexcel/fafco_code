from rest_framework import serializers
from .models import Claim , UploadClaimDocument
from django.conf import settings
from utils.helper import generate_absolute_uri

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'


class UploadClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadClaimDocument
        fields = '__all__'

    # def get_document(self, instance):
    #     request = self.context.get("request")
    #     if instance.document:
    #         return generate_absolute_uri(request, instance.document.url)
    #     return ""



class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ('documents',)  

        
class SubmitClaimSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
