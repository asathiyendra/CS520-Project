from rest_framework import serializers
from .models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['userid', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }