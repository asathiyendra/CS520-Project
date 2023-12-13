# Create your views here.
from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Responses, Comments, Likes # replace with your model
from Friendships.models import Friendships, Users
from .serializers import ResponseSerializer, CommentSerializer, LikeSerializer  # replace with your serializer
from prompts.models import Prompt
from django.db.models import Q

@api_view(['POST'])
def store_response(request):
    data = request.data.copy()  # Make a copy of the QueryDict
    data['date'] = timezone.now()  
    serializer = ResponseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# @api_view(['GET'])
# def get_friends_responses(request):
#     user_id = request.GET.get('userid')
#     prompt_id = request.GET.get('promptid')

#     if not all([user_id, prompt_id]):
#         return Response({'error': 'Missing userid or promptid in query parameters'}, status=400)

#     prompt = Prompt.objects.filter(promptid=prompt_id).first()
#     if not prompt:
#         return Response({'error': 'Prompt does not exist'}, status=400)

#     friends = Friendships.objects.filter(user1id=user_id, status='accepted')
#     friends |= Friendships.objects.filter(user2id=user_id, status='accepted')

#     friends_responses = Responses.objects.filter(
#         userid__in=[friend.user2id for friend in friends],
#         promptid=prompt_id
#     )

#     serializer = ResponseSerializer(friends_responses, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def get_friends_responses(request):
    user_id = int(request.GET.get('userid'))
    prompt_id = request.GET.get('promptid')

    if not all([user_id, prompt_id]):
        return Response({'error': 'Missing userid or promptid in query parameters'}, status=400)

    prompt = Prompt.objects.filter(promptid=prompt_id).first()
    if not prompt:
        return Response({'error': 'Prompt does not exist'}, status=400)

    friendships = Friendships.objects.filter(Q(user1id=user_id) | Q(user2id=user_id), status='accepted')

    friend_ids = []
    for friendship in friendships:
        if friendship.user1id.userid == user_id:
            friend_ids.append(friendship.user2id.userid)
        else:
            friend_ids.append(friendship.user1id.userid)

    friends_responses = Responses.objects.filter(
        userid__in=friend_ids,
        promptid=prompt_id
    )

    serializer = ResponseSerializer(friends_responses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_response_details(request):
    responseid = request.GET.get('responseid')
    try:
        response = Responses.objects.get(responseid=responseid)
    except Responses.DoesNotExist:
        return Response({'error': 'Response does not exist'}, status=404)

    comments = Comments.objects.filter(responseid=responseid)
    comments_serializer = CommentSerializer(comments, many=True)

    likes = Likes.objects.filter(responseid=responseid)
    likes_serializer = LikeSerializer(likes, many=True)

    response_details = {
        'responseid': response.responseid,
        'userid': response.userid.userid,
        'promptid': response.promptid.promptid,
        'text': response.text,
        'date': response.date,
        'visibility': response.visibility,
        'comments_count': comments.count(),
        'comments': comments_serializer.data,
        'likes_count': likes.count(),
        'likes': likes_serializer.data,
    }

    return Response(response_details)

@api_view(['GET'])
def get_prompt_responses(request):
    promptid = request.GET.get('promptid')
    try:
        responses = Responses.objects.filter(promptid=promptid)
    except Responses.DoesNotExist:
        return Response({'error': 'Responses does not exist'}, status=404)
    
    serializer = ResponseSerializer(responses, many=True)
    
    return Response(serializer.data, status=200)