# Generated by Django 4.2.7 on 2023-12-06 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_users_groups_users_is_superuser_users_last_login_and_more"),
    ]

    operations = [
        migrations.RemoveField(model_name="users", name="groups",),
        migrations.RemoveField(model_name="users", name="is_superuser",),
        migrations.RemoveField(model_name="users", name="last_login",),
        migrations.RemoveField(model_name="users", name="user_permissions",),
        migrations.AlterField(
            model_name="users", name="email", field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="users", name="password", field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="users", name="username", field=models.TextField(),
        ),
    ]
