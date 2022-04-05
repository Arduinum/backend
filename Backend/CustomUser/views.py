from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import permissions
from .serializers import UserModelSerializer
from .models import User


# class ArticleLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 100


class UserViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # pagination_class = ArticleLimitOffsetPagination
