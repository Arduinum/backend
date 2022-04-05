from rest_framework import status
from rest_framework.test import APITestCase
from CustomUser.models import User
from .models import Project, ToDo
from mixer.backend.django import mixer


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser(username='Android', email='android228@gmail.com', password='12345')

    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_2(self):
        self.client.login(username='Android', password='12345')
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = Project.objects.create(name_project='Project3')
        todo = ToDo.objects.create(text='For global test!', user=self.admin, project_id=project.id)
        self.client.login(username='Android', password='12345')
        response = self.client.put(f'/api/todos/{todo.id}/', {
            'text': 'For global mega giga test!',
            'user': self.admin.id,
            'project': project.id
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'For global mega giga test!')

    def test_edit_admin_2(self):
        project = mixer.blend(Project)
        todo = mixer.blend(ToDo, user=self.admin, project_id=project.id)
        self.client.login(username='Android', password='12345')
        response = self.client.put(f'/api/todos/{todo.id}/', {
            'text': 'For global mega giga test!',
            'user': self.admin.id,
            'project': project.id
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'For global mega giga test!')
