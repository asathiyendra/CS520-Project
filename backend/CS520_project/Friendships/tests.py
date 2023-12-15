# Create your tests here.

from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Users, Friendships

@override_settings(DATABASES={
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "cs520project",
        "USER": "postgres",
        "PASSWORD": "cs520project",
        "HOST": "cs520project.c0oywlnhl76y.us-east-2.rds.amazonaws.com",
        "PORT": "5432",
    }
})

class FriendshipsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = Users.objects.create(userid='1', username='user1', email='user1@example.com')
        self.user2 = Users.objects.create(userid='2', username='user2', email='user2@example.com')

    def test_get_friends(self):
        Friendships.objects.create(user1id=self.user1, user2id=self.user2)
        response = self.client.get(reverse('get_friends'), {'userid': '1'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_add_friend(self):
        response = self.client.post(reverse('add_friend'), {'userid': '1', 'username_or_email': 'user2'})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(Friendships.objects.filter(user1id=self.user1, user2id=self.user2).exists())

    def test_delete_friend(self):
        Friendships.objects.create(user1id=self.user1, user2id=self.user2)
        response = self.client.post(reverse('delete_friend'), {'userid': '1', 'username_or_email': 'user2'})
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Friendships.objects.filter(user1id=self.user1, user2id=self.user2).exists())
