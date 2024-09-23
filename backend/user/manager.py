from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def create_user(
        self, username, password, customer_type, **other_fields
    ):

        if not username:
            raise ValueError(_("Username is missing"))

        user = self.model(username=username, customer_type=customer_type, **other_fields)
        user.set_password(password)
        user.is_active = True
        user.save()
        return user

    def create_superuser(
        self, username, password, **other_fields
    ):
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        return self.create_user(
            username, password, customer_type=1, **other_fields)
