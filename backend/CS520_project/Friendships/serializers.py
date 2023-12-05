
from rest_framework import serializers
from .models import Friendships, Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['userid', 'username', 'email']