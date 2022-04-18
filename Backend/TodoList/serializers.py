from rest_framework.serializers import ModelSerializer
from TodoList.models import Project, ToDo
from CustomUser.models import User
from CustomUser.serializers import UserModelSerializer


# for output data (dict)
class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


# for save data (id)
class ProjectModelSerializerBase(ModelSerializer):
    users = User

    class Meta:
        model = Project
        fields = '__all__'


# for output data (dict)
class ToDoModelSerializer(ModelSerializer):
    user = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'


# for save data (id)
class ToDoModelSerializerBase(ModelSerializer):
    user = User

    class Meta:
        model = ToDo
        fields = '__all__'
