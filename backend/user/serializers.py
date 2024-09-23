from rest_framework import serializers
from .models import Customer, Profile
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("username", "name","email", "phone",
                  "customer_type", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Customer.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        label=_("Username"),
        write_only=True
    )
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
   
    class Meta:
       model = Customer
       fields = ('username','password')



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def validate(self, data):
        request = self.context.get('request')
        if request:
            customer = request.user

            # Check if the medallion field is set to True and the user is not a dealer
            if data.get('medallion') and customer.customer_type != Customer.Dealer:
                raise serializers.ValidationError("Only dealers can set the medallion field to True.")
        return data

class UpdatePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()
    re_password = serializers.CharField()


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    confirm_password = serializers.CharField()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
