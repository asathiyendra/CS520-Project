from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Prompt
from .serializers import PromptSerializer
import random

class PromptViewSet(viewsets.ModelViewSet):
    serializer_class = PromptSerializer

    
    def get_queryset(self):
        queryset = Prompt.objects.all()
        prompt_id = self.request.query_params.get('ID', None)
        if prompt_id is not None:
            queryset = queryset.filter(promptid=prompt_id)
        return queryset
    
    @action(detail=False, methods=['get'])
    def random_prompt(self, request):
        count = Prompt.objects.count()
        random_index = random.randint(0, count - 1)
        prompt = Prompt.objects.all()[random_index]
        return Response(PromptSerializer(prompt).data)
    
@api_view(['GET'])
def get_previous_prompts(request):
    previous_prompts = Prompt.objects.all()
    serializer = PromptSerializer(previous_prompts, many=True)
    
    return Response(serializer.data, status=200)
    