from requests import get
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'For get versions api for user'

    def handle(self, *args, **options):
        response = get('http://127.0.0.1:8000/api/users/', auth=('Arduinum', '228'))
        print('version=1.0')
        print(response.json())

        response = get('http://127.0.0.1:8000/api/users/', auth=('Arduinum', '228'),
                       headers={'Accept': 'application/json; version=2.0'})
        print('version=2.0')
        print(response.json())
