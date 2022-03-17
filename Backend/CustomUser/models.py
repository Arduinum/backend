from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    birthday_year = models.PositiveIntegerField(
        verbose_name='birthday_year',
        blank=True,
        null=True
    )
    email = models.EmailField(
        verbose_name='email_address',
        max_length=255,
        unique=True,
        blank=True
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        db_table = 'Users'
