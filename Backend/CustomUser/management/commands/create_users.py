from django.core.management.base import BaseCommand
from CustomUser.models import User
from CustomUser.data_json import read_json


class Command(BaseCommand):
    help = 'For create superusers or users'

    def handle(self, *args, **options):
        data_list = read_json('CustomUser/jsons/users.json')

        for user in data_list:
            if user == data_list[0]:
                User.objects.create_superuser(
                    username=user['fields']['username'],
                    email=user['fields']['email'],
                    password='123',
                    first_name=user['fields']['first_name'],
                    last_name=user['fields']['last_name'],
                    birthday_year=user['fields']['birthday_year']
                )
            else:
                User.objects.create_user(
                    username=user['fields']['username'],
                    email=user['fields']['email'],
                    password='123',
                    first_name=user['fields']['first_name'],
                    last_name=user['fields']['last_name'],
                    birthday_year=user['fields']['birthday_year']
                )
