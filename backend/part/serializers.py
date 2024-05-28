from rest_framework import serializers
from .models import Part, Partcsv


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'


class PartcsvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partcsv
        fields = '__all__'
