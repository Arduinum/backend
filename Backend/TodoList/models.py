from django.db import models
from CustomUser.models import User


class Project(models.Model):
    name_project = models.CharField(max_length=64)
    users = models.ManyToManyField(User)
    link = models.URLField(unique=True)

    class Meta:
        db_table = 'project'
        ordering = ['id']


class ToDo(models.Model):
    text = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'todo'
        ordering = ['id']
