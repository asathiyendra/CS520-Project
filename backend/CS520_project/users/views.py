from django.shortcuts import render
from rest_framework import serializers
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Users
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.db.models import Q

@api_view(['GET'])
def get_user_data(request):
    userid = request.GET.get('userid')
    try:
        user = Users.objects.get(userid=userid)
        serializer = UserSerializer(user)
    
        return Response(serializer.data, status=200)
    except Users.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)

@api_view(['POST'])
def update_user_data(request):
    userid = request.GET.get('userid')
    try:
        user = Users.objects.get(userid=userid)
        serializer = UserSerializer(user, data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
    except Users.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
        