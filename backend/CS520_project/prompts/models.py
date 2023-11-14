from django.db import models

class Prompts(models.Model):
    text = models.TextField()
    date = models.DateField()
    
    def __str__(self):
        return self.text