# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Responses # replace with your model
from .serializers import ResponseSerializer  # replace with your serializer

@api_view(['POST'])
def store_response(request):
    serializer = ResponseSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
