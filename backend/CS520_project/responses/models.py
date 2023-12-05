from django.db import models
from datetime import date
from prompts.models import Prompt

    
class Users(models.Model):
    userid = models.AutoField(primary_key=True, unique=True, default=0)
    username = models.TextField()
    email = models.TextField()
    password = models.TextField()
    
    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'users'
    
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

class Comments(models.Model):
    text = models.TextField()
    date = models.DateField()
    response = models.ForeignKey(Responses, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.text
    