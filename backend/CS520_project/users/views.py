from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Users
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.db.models import Q

@api_view(['POST'])
def user_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    
    try:
        user = Users.objects.get(username=username)
    except Users.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)

    if user.authenticate(password):
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
    else:
        return Response({'error' : 'Invalid Password'}, status=401)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)

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
        request.data['userid'] = user.userid
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)
    except Users.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
        