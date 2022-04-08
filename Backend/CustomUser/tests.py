from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from .models import User
from .views import UserViewSet


class TestRandom(APISimpleTestCase):
    def test_pi(self):
        from math import pi
        self.assertEqual(pi, 3.141592653589793)


class TestUserViewSet(TestCase):
    def setUp(self) -> None:
        User.objects.create(first_name='Arduino', last_name='Uno')
        self.admin = User.objects.create_superuser(username='Android', email='android228@gmail.com', password='12345')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_2(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        # admin = User.objects.create_superuser(username='Android', email='android228@gmail.com', password='12345')
        force_authenticate(request, self.admin)
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_3(self):
        self.client = APIClient()
        # self.client.login(username='Android', password='12345')
        self.client.force_login(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        self.client = APIClient()
        # admin = User.objects.create_superuser(username='Android', email='android228@gmail.com', password='12345')
        self.client.force_login(self.admin)
        response = self.client.get(f'/api/users/{self.admin.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_quest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Bot', 'email': 'bot228@gmail.com', 'password': '12345'},
                               format='json')
        view = UserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Bot2', 'email': 'bot2228@gmail.com', 'password': '12345'},
                               format='json')
        # admin = User.objects.create_superuser('admin-arduinum', 'admin-ard@gmail.com', '12345')
        force_authenticate(request, self.admin)
        view = UserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestUserViewSet2(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser(username='Android', email='android228@gmail.com', password='12345')

    def test_versioning_v1(self):
        self.client.login(username='Android', password='12345')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_versioning_v2(self):
        self.client.login(username='Android', password='12345')
        response = self.client.get('/api/users/', headers={'Accept': 'application/json; version=2.0'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
