from django.shortcuts import render
from rest_framework import serializers
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from responses.models import Responses
from .models import Friendships, Users
from .serializers import UserSerializer
from .serializers import FriendshipsSerializer1, FriendshipsSerializer2
from responses.serializers import ResponseSerializer
from rest_framework.decorators import api_view
from django.db.models import Q


# Create your views here.
@api_view(["GET"])
def get_friends(request):
    userid = request.GET.get("userid")
    try:
        user = Users.objects.get(userid=userid)
    except Users.DoesNotExist:
        return Response({"error": "User does not exist"}, status=404)

    friendships = Friendships.objects.filter(Q(user1id=user) | Q(user2id=user))

    friends1 = []
    friends2 = []
    for friendship in friendships:
        if friendship.user1id == user:
            friends1.append(friendship)
        else:
            friends2.append(friendship)

    friends_serializer1 = FriendshipsSerializer1(friends1, many=True)
    friends_serializer2 = FriendshipsSerializer2(friends2, many=True)

    return Response(friends_serializer1.data + friends_serializer2.data)


"""
@api_view(['GET'])
def get_friends(request):
    userid = request.GET.get('userid')
    try:
        user = Users.objects.get(userid=userid)
    except Users.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)

    friendships = Friendships.objects.filter(Q(user1id=user) | Q(user2id=user), status='accepted')

    friends = []
    for friendship in friendships:
        if friendship.user1id == user:
            friends.append(friendship.user2id)
        else:
            friends.append(friendship.user1id)

    friends_serializer = UserSerializer(friends, many=True)

    return Response(friends_serializer.data)
"""


@api_view(["DELETE"])
def delete_friend(request):
    userid = request.data.get("userid")
    friendid = request.data.get("friendid")
    try:
        friendship = Friendships.objects.get(
            Q(user1id=userid, user2id=friendid) | Q(user1id=friendid, user2id=userid),
            status="accepted",
        )
    except Friendships.DoesNotExist:
        return Response({"error": "Friendship does not exist"}, status=404)

    friendship.delete()

    return Response({"message": "Friendship deleted successfully"})


@api_view(["GET"])
def get_friend_details(request):
    friendid = request.GET.get("friendid")
    try:
        friend = Users.objects.get(userid=friendid)
    except Users.DoesNotExist:
        return Response({"error": "User does not exist"}, status=404)

    responses = Responses.objects.filter(userid=friendid)
    responses_serializer = ResponseSerializer(responses, many=True)

    friend_details = {
        "username": friend.username,
        "email": friend.email,
        "responses": responses_serializer.data,
    }

    return Response(friend_details)


@api_view(["POST"])
def add_friend(request):
    userid = request.data.get("userid")
    username_or_email = request.data.get("username_or_email")
    print(f"userid is {userid} username or email is {username_or_email}")

    try:
        user = Users.objects.get(userid=userid)
        friend = Users.objects.get(
            Q(username=username_or_email) | Q(email=username_or_email)
        )
    except Users.DoesNotExist:
        return Response({"error": "User does not exist"}, status=404)

    if Friendships.objects.filter(
        Q(user1id=user, user2id=friend) | Q(user1id=friend, user2id=user)
    ).exists():
        return Response({"error": "Friendship already exists"}, status=400)

    friendship = Friendships(user1id=user, user2id=friend)
    friendship.save()

    return Response({"message": "Friendship created successfully"})


@api_view(["POST"])
def accept_friend(request):
    userid = request.data.get("userid")
    friendid = request.data.get("friendid")
    try:
        friendship = Friendships.objects.get(
            Q(user1id=userid, user2id=friendid) | Q(user1id=friendid, user2id=userid),
            status="pending",
        )
    except Friendships.DoesNotExist:
        return Response({"error": "Friendship does not exist"}, status=404)

    friendship.status = "accepted"
    friendship.save()

    return Response({"message": "Friendship accepted successfully"})
