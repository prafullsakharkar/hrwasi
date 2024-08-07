from django.contrib.auth.models import Group, Permission
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import User
from .serializers import (
    GroupSerializer,
    UserSerializer,
    UserListSerializer,
    PermissionSerializer,
)


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (DjangoFilterBackend,)

    filterset_fields = {
        "id": ["in", "exact"],
        "username": ["in", "exact"],
        "email": ["in", "exact"],
        "is_active": ["in", "exact"],
    }

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .prefetch_related(
                "user_permissions",
                "groups",
                "groups__permissions",
            )
            # .filter(is_active=True)
        )

    @action(detail=True, methods=["post"])
    def change_password(self, request, pk=None):
        instance = self.get_object()
        if password := request.data.get("password"):
            instance.set_password(password)
            instance.save()
            message = f"{instance.full_name} password has been changed"
        else:
            message = "Unable to change password"
        return Response({"detail": message})

    @action(detail=True, methods=["patch"])
    def add_groups(self, request, pk=None):
        """
        add a list of all the groups that the given user belongs to.
        """

        if not isinstance(request.data, list):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        for each in request.data:
            entities = instance.groups.filter(pk=each)
            if not entities.exists():
                instance.groups.add(each)
        instance.save()

        message = f"{instance.full_name} added in groups {request.data}"
        print(message)

        return Response(UserListSerializer(instance).data)

    @action(detail=True, methods=["patch"])
    def remove_groups(self, request, pk=None):
        """
        add a list of all the groups that the given user belongs to.
        """

        if not isinstance(request.data, list):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        for each in request.data:
            entities = instance.groups.filter(pk=each)
            if entities.exists():
                instance.groups.remove(each)
        instance.save()

        message = f"{instance.full_name} removed from groups {request.data}"
        print(message)

        return Response(UserListSerializer(instance).data)

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(UserView, self).get_serializer(*args, **kwargs)

    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        return Response(UserListSerializer(self.get_object()).data)

    def list(self, request, *args, **kwargs):
        self.serializer_class = UserListSerializer
        return super().list(request, *args, **kwargs)


class GroupView(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        return super().get_queryset().prefetch_related("permissions")

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super(GroupView, self).get_serializer(*args, **kwargs)


class PermissionView(ModelViewSet):
    queryset = Permission.objects.all().select_related("content_type")
    serializer_class = PermissionSerializer
