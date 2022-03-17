from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import LimitOffsetPagination
from .serializers import UserModelSerializer
from .models import User


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


class UserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = ArticleLimitOffsetPagination
