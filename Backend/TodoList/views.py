from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, \
    DestroyModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from .serializers import ProjectModelSerializer, ProjectModelSerializerBase, ToDoModelSerializer, \
    ToDoModelSerializerBase
from .models import Project, ToDo
from rest_framework_extensions.mixins import PaginateByMaxMixin
from .filters import ProjectFilter, ToDoDateFilter


# class ProjectViewSet(PaginateByMaxMixin, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
#                      DestroyModelMixin, GenericViewSet):
class ProjectViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
                     DestroyModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    # max_paginate_by = 10
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase

# class ToDoViewSet(PaginateByMaxMixin, ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
#                   DestroyModelMixin, GenericViewSet):
class ToDoViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
                  DestroyModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    # max_paginate_by = 20
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoDateFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoModelSerializer
        return ToDoModelSerializerBase

    def perform_destroy(self, instance):
        try:
            self.queryset.is_active = False
            self.queryset.save()
        except AttributeError:
            for i, _ in enumerate(self.queryset):
                self.queryset[i].is_active = False
                self.queryset[i].save()
