# Generated by Django 4.1.2 on 2023-12-06 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_merge_0003_alter_users_table_0005_alter_users_table"),
    ]

    operations = [
        migrations.AlterField(
            model_name="users",
            name="userid",
            field=models.AutoField(primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterModelTable(name="users", table="users",),
    ]
