from django.contrib.auth.models import AbstractUser
from django.db import models
from PIL import Image
from .selectors import get_file_path


class User(AbstractUser):
    avatar = models.ImageField(
        default="defaults/profile_pic.jpg", upload_to=get_file_path
    )
    role = models.CharField(max_length=30, default="user")
    email = models.CharField(
        max_length=250,
        unique=True,
        help_text="Required. 250 characters or fewer. Letters, digits and @/./_ only.",
        error_messages={
            "unique": "Email already exists.",
        },
    )

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.full_name}"

    def save(self, *args, **kwargs):
        if not self.id:
            last_user = User.objects.last()
            self.username = "ID%0004d" % int((last_user.id if last_user else 0) + 1)

            if not self.first_name:
                email = self.email.split("@")[0]
                self.first_name = email.split(".")[0].title()
            if not self.last_name:
                email = self.email.split("@")[0]
                self.last_name = (
                    email.split(".")[1].title() if len(email.split(".")) > 1 else ""
                )

        super().save(*args, **kwargs)

        img = Image.open(self.avatar.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.avatar.path)
