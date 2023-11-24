from django.shortcuts import render
from rest_framework import viewsets
from .models import Prompt
from .serializers import PromptSerializer

class PromptViewSet(viewsets.ModelViewSet):
    serializer_class = PromptSerializer

    
    def get_queryset(self):
        queryset = Prompt.objects.all()
        prompt_id = self.request.query_params.get('ID', None)
        if prompt_id is not None:
            queryset = queryset.filter(promptid=prompt_id)
        return queryset