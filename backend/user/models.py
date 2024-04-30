from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager
from phonenumber_field.modelfields import PhoneNumberField


class Customer(AbstractUser):
    Dealer = 1
    Homeowner = 2

    CUSTOMER_TYPES = [
        (Dealer, 'Dealer'),
        (Homeowner, 'Homeowner'),
    ]
    name = models.CharField(max_length=25, null=False, blank=False)
    email = models.EmailField(('email_address'), unique=True, max_length=200)
    phone = PhoneNumberField(null=False, blank=False)
    customer_type = models.PositiveSmallIntegerField(choices=CUSTOMER_TYPES)
    fbid = models.CharField(max_length=255, blank=True, null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return self.username


class Profile(models.Model):
    name = models.CharField(max_length=64)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,
                                 related_name="customer_profile")
    address = models.CharField(max_length=255, unique=True)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=255, default='USA')
    created_at = models.DateField(auto_now_add=True)
    current_dealer = models.ForeignKey(Customer, on_delete=models.SET_NULL,
                                       related_name='current_dealer',
                                       null=True)
    owner_phone = models.CharField(max_length=20, blank=True, null=True)
    owner_email = models.EmailField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    medallion = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.customer.username
