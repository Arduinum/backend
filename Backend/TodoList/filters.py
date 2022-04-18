from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name_project = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name_project']


class ToDoDateFilter(filters.FilterSet):
    project = filters.NumberFilter()
    create = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'create']
