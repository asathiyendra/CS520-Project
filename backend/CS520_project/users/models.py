from django.db import models
from django.contrib.auth.models import User as Django_User

# Create your models here.
class Users(models.Model):
    userid = models.AutoField(primary_key=True, unique=True)
    username = models.TextField()
    email = models.TextField()
    password = models.TextField()
    
    def authenticate(self, entered_password):
        return (self.password == entered_password)
    
    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'users'