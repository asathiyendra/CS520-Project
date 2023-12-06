from django.db import models
from datetime import date
from prompts.models import Prompt
from Friendships.models import Users, Friendships


    
# class Users(models.Model):
#     userid = models.AutoField(primary_key=True, unique=True, default=0)
#     username = models.TextField()
#     email = models.TextField()
#     password = models.TextField()
    
#     def __str__(self):
#         return self.username
    
#     class Meta:
#         db_table = 'users'
    
class Responses(models.Model):
    responseid = models.AutoField(primary_key=True, unique=True)
    userid = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, db_column='userid')
    promptid = models.ForeignKey(Prompt, on_delete=models.CASCADE, null=True, db_column='promptid')
    text = models.TextField()
    visibility = models.TextField(default="private")
    date = models.DateField(auto_now_add=True)
    # likes = models.IntegerField()
    
    def __str__(self):
        return self.text
    
    class Meta:
        db_table = 'responses'

# class Friendships(models.Model):
#     friendshipid = models.AutoField(primary_key=True)
#     user1id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='friendships_initiated', db_column='user1id')
#     user2id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='friendships_received', db_column='user2id')
#     STATUS_CHOICES = [
#         ('accepted', 'Accepted'),
#         ('pending', 'Pending'),
#     ]
#     status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='pending', db_column='status')

#     class Meta:
#         db_table = 'friendships'


class Comments(models.Model):
    commentid = models.AutoField(primary_key=True, unique=True, db_column='commentid')
    userid = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='userid')
    responseid = models.ForeignKey(Responses, on_delete=models.CASCADE, db_column='responseid')
    text = models.TextField(db_column='text')
    date = models.DateField(db_column='date')
    
    def __str__(self):
        return self.text
    
    class Meta:
        db_table = 'comments'

class Likes(models.Model):
    likeid = models.AutoField(primary_key=True, unique=True, db_column='likeid')
    userid = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='userid')
    responseid = models.ForeignKey(Responses, on_delete=models.CASCADE, db_column='responseid')
    date = models.DateField(db_column='date')
    
    def __str__(self):
        return self.likeid
    
    class Meta:
        db_table = 'likes'
    