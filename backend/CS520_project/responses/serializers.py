from rest_framework import serializers
from .models import Responses, Comments

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responses
        fields = ['responseid', 'userid', 'promptid', 'text', 'visibility', 'date']