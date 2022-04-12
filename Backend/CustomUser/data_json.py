import json


def read_json(file_name):
    with open(file_name, 'r', encoding='utf-8') as file:
        data_list = json.load(file)
        return data_list


if __name__ == '__main__':
    read_json('jsons/users.json')
