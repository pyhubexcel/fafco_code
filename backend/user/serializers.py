from rest_framework import serializers
from .models import Customer, Profile


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("username", "email", "notify_email", "customer_type", "password")
    
    # Override create method to create a new User instance
    def create(self, validated_data):
        # Create a new user using validated_data
        user = Customer.objects.create_user(**validated_data)

        # Return the created user instance
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
    password = serializers.CharField()  # Field for the new password
    confirm_password = serializers.CharField()  # Field for the confirmation of the new password
    # token = serializers.CharField()
    # uid = serializers.CharField()
