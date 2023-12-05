"""
URL configuration for CS520_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from prompts.views import PromptViewSet
from responses.views import store_response, get_friends_responses, get_response_details
from Friendships.views import get_friends, add_friend, delete_friend, get_friend_details



router = DefaultRouter()
router.register(r'prompts', PromptViewSet, basename='prompt')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('store_response/', store_response),
    path('friendsResponses/', get_friends_responses, name='get_friends_responses'),
    path('getResponseDetails/', get_response_details, name='get_response_details'),

    #################### FRIENDSHIPS ####################
    path('friendships/', get_friends, name='get_friends'),
    path('friendships/add/', add_friend, name='add_friend'),
    path('friendships/delete/', delete_friend, name='delete_friend'),
    path('friendships/details/', get_friend_details, name='get_friend_details'),

    path('', include(router.urls)),
]