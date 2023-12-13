
from rest_framework import serializers
from .models import Friendships, Users
from django.db.models import Q

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['userid', 'username', 'email']
      
class FriendshipsSerializer1(serializers.ModelSerializer):
    status = serializers.CharField()
    
    user = UserSerializer(source='user2id')
    
    class Meta:
        model = Friendships
        fields = ['status', 'user']
    

class FriendshipsSerializer2(serializers.ModelSerializer):
    status = serializers.CharField()
    
    user = UserSerializer(source='user1id')
    
    class Meta:
        model = Friendships
        fields = ['status', 'user']