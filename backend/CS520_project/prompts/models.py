from django.db import models

from django.db import models

class Prompt(models.Model):
    promptid = models.AutoField(primary_key=True)
    date = models.DateField()
    text = models.TextField()

    class Meta:
        managed = False
        db_table = 'prompts'