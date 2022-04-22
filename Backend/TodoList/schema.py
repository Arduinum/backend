import graphene
from graphene_django import DjangoObjectType
from CustomUser.models import User
from .models import ToDo, Project


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'birthday_year', 'email', 'is_superuser', 'is_staff')


class Query(graphene.ObjectType):
    all_project = graphene.List(ProjectType)

    def resolve_all_project(root, info):
        return Project.objects.all()

    project_by_id = graphene.Field(ProjectType, pk=graphene.Int(required=True))

    def resolve_project_by_id(root, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    project_by_name = graphene.List(ProjectType, name_project=graphene.String(required=False))

    def resolve_project_by_name(root, info, name_project=None):
        project = Project.objects.all()
        if name_project:
            project = Project.objects.filter(name_project=name_project)
        return project

    all_todos = graphene.List(ToDoType)

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()


class TodoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        text = graphene.String(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, id, text):
        todo = ToDo.objects.get(pk=id)
        todo.text = text
        todo.save()
        return cls(todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

# задание 1:
# запрос
# {
#   projectById(pk:1){
#     nameProject
#     users {
#       id
#       username
#     }
#     todoSet {
#       text
#       id
#     }
#   }
# }
# ответ
# {
#   "data": {
#     "projectById": {
#       "nameProject": "Project1",
#       "users": [
#         {
#           "id": "1",
#           "username": "Arduinum"
#         }
#       ],
#       "todoSet": [
#         {
#           "text": "For test",
#           "id": "1"
#         }
#       ]
#     }
#   }
# }

# запрос на изменение данных
# mutation {
#   updateTodo(id: 1, text: "mega test!") {
#     todo {
#       id
#       text
#     }
#   }
# }
# ответ
# {
#   "data": {
#     "updateTodo": {
#       "todo": {
#         "id": "1",
#         "text": "mega test!"
#       }
#     }
#   }
# }
