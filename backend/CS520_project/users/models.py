from django.db import models
from django.contrib.auth.models import User as Django_User

# Create your models here.
class Users(models.Model):
    userid = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    phone = models.CharField(max_length=15)
    django_user = models.OneToOneField(Django_User, on_delete=models.CASCADE, related_name="user")
    
    def __str__(self):
        return f"{self.django_user.username}"
