from django.db import models
from user.models import Customer, Profile


class Claim(models.Model):

    Received = 0
    Submitted = 1
    Processed = 3
    Credited = 6
    Denied = 7
    Voided = 99

    Claim_status = [
        (Received, 'Received'),
        (Submitted, 'Submitted'),
        (Processed, 'Processed'),
        (Credited, 'Credited'),
        (Denied, 'Denied'),
        (Voided, 'Voided')
    ]

    registration = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dealer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date_entered = models.DateField(auto_now_add=True)
    service_date = models.DateField(auto_now=True)
    status = models.SmallIntegerField(choices=Claim_status)
    status_code = models.SmallIntegerField()
    date_finalized = models.DateField(blank=True, null=True)
    csr_note = models.TextField(blank=True, null=True)
    user_note = models.TextField(blank=True, null=True)
    dealer_ref_number = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return self.registration.customer.username
