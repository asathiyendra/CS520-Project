from django.db import models

class Responses(models.Model):
    text = models.TextField()
    date = models.DateField()
    likes = models.IntegerField()
    
    def __str__(self):
        return self.text

class Comments(models.Model):
    text = models.TextField()
    date = models.DateField()
    response = models.ForeignKey(Responses, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.text
    