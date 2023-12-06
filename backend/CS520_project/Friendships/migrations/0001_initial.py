# Generated by Django 4.2.7 on 2023-12-06 17:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Users",
            fields=[
                (
                    "userid",
                    models.AutoField(
                        default=0, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("username", models.TextField()),
                ("email", models.TextField()),
                ("password", models.TextField()),
            ],
            options={"db_table": "users",},
        ),
        migrations.CreateModel(
            name="Friendships",
            fields=[
                ("friendshipid", models.AutoField(primary_key=True, serialize=False)),
                (
                    "status",
                    models.CharField(
                        choices=[("accepted", "Accepted"), ("pending", "Pending")],
                        db_column="status",
                        default="pending",
                        max_length=8,
                    ),
                ),
                (
                    "user1id",
                    models.ForeignKey(
                        db_column="user1id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="friendships_initiated",
                        to="Friendships.users",
                    ),
                ),
                (
                    "user2id",
                    models.ForeignKey(
                        db_column="user2id",
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="friendships_received",
                        to="Friendships.users",
                    ),
                ),
            ],
            options={"db_table": "friendships",},
        ),
    ]
