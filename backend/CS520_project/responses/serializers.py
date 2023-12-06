import datetime
from rest_framework import serializers
from .models import Responses, Comments, Likes
from django.utils import timezone



class DateFromDateTimeField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, datetime.datetime):
            return value.date()
        return value
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return timezone.datetime.strptime(data, '%Y-%m-%d').date()
        elif isinstance(data, datetime.datetime):
            return data.date()
        else:
            raise serializers.ValidationError('Expected a string or a datetime object.')


class CommentSerializer(serializers.ModelSerializer):
    date = DateFromDateTimeField()
    class Meta:
        model = Comments
        fields = ['commentid', 'userid', 'responseid', 'text', 'date']

class LikeSerializer(serializers.ModelSerializer):
    date = DateFromDateTimeField()
    class Meta:
        model = Likes
        fields = ['likeid', 'userid', 'responseid', 'date']

class ResponseSerializer(serializers.ModelSerializer):
    date = DateFromDateTimeField()
    class Meta:
        model = Responses
        fields = ['responseid', 'userid', 'promptid', 'text', 'visibility', 'date']