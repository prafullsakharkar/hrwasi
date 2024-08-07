from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer, CharField, ListField

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = "__all__"
        # fields = ("id", "email", "first_name", "last_name", "password")


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        # fields = "__all__"
        exclude = ("user_permissions",)
        extra_kwargs = {"password": {"write_only": True}}


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"
        # exclude = ("permissions",)


class PermissionSerializer(ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"
        depth = 1


class UserListSerializer(ModelSerializer):
    groups = GroupSerializer(many=True)
    full_name = CharField(read_only=True)

    class Meta:
        model = User
        # fields = "__all__"
        exclude = ("user_permissions", "password")
