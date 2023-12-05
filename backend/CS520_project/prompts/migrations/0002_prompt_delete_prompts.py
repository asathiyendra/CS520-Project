# Generated by Django 4.2.7 on 2023-12-05 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prompts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prompt',
            fields=[
                ('promptid', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('text', models.TextField()),
            ],
            options={
                'db_table': 'prompts',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Prompts',
        ),
    ]
