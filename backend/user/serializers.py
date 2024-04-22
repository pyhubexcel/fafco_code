from rest_framework import serializers
from .models import Customer, Profile


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("username", "email", "notify_email", "customer_type", "password")
    
    def create(self, validated_data):
        user = Customer.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class UpdatePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()
    re_password = serializers.CharField()

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField()  
    confirm_password = serializers.CharField()  
  
