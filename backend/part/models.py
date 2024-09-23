from django.db import models
from user.models import Customer, Profile

class Part(models.Model):
    
    repair_date = models.DateField(null=True, blank=True)
    registration = models.ForeignKey(Profile, on_delete=models.CASCADE,blank=True,null=True)
    part_number = models.CharField(max_length=6)
    part_description = models.CharField(max_length=255)
    product_line = models.CharField(max_length=255)
    installing_dealer = models.ForeignKey(Customer, on_delete=models.SET_NULL,
                                          related_name='installing_dealer',
                                          blank=True, null=True)
    date_installed = models.DateField(auto_now_add=True,blank=True, null=True)
    barcode = models.CharField(max_length=16,blank=True, null=True)
    active = models.BooleanField(default=True)
    problem_code = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self) -> str:
        return self.registration.customer.username


class Partcsv(models.Model):
    part_number = models.CharField(max_length=50, unique=True)
    part_description = models.CharField(max_length=255)
    product_line = models.CharField(max_length=255)
    barcode = models.CharField(max_length=15,blank=True, null=True)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.part_number

