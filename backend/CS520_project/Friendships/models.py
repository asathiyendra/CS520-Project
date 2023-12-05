from django.db import models
from datetime import date
from prompts.models import Prompt
# from users.models import Users


# Create your models here.


class Users(models.Model):
    userid = models.AutoField(primary_key=True, unique=True, default=0)
    username = models.TextField()
    email = models.TextField()
    password = models.TextField()
    
    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'users'

class Friendships(models.Model):
    friendshipid = models.AutoField(primary_key=True)
    user1id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='friendships_initiated', db_column='user1id')
    user2id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='friendships_received', db_column='user2id')
    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('pending', 'Pending'),
    ]
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending', db_column='status')

    class Meta:
        db_table = 'friendships'
