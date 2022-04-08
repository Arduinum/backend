from requests import post
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'For get token for user'

    def handle(self, *args, **options):
        response = post('http://127.0.0.1:8000/api-token-auth/', data={'username': 'Arduinum', 'password': '228'})
        print(response.status_code)
        print(response.json())
