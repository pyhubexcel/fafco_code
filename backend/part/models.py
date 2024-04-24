from django.db import models
from user.models import Customer, Profile
from claim.models import Claim


class Part(models.Model):

    Repair = 1
    replace = 2
    CLAIM_ACTION = [
        (Repair, 'Repair'),
        (replace, 'replace'),
    ]

    rmaid = models.ForeignKey(Claim, on_delete=models.CASCADE,
                              related_name='Claim')
    registration = models.ForeignKey(Profile, on_delete=models.CASCADE)
    part_number = models.CharField(max_length=6)
    part_description = models.CharField(max_length=255)
    product_line = models.CharField(max_length=255)
    installing_dealer = models.ForeignKey(Customer, on_delete=models.SET_NULL,
                                          related_name='installing_dealer',
                                          null=True)
    date_installed = models.DateField(auto_now_add=True)
    barcode = models.CharField(max_length=15)
    active = models.BooleanField(default=True)
    problem_code = models.CharField(max_length=255, blank=True, null=True)
    claim_action = models.PositiveSmallIntegerField(choices=CLAIM_ACTION)

    def __str__(self) -> str:
        return self.registration.customer.username
