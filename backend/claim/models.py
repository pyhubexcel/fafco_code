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

    FREEZE_DAMAGE = 1
    DIMPLE_LEAK_REV_ONLY = 2
    HEADER_LEAK = 3
    PANEL_LEAK = 4
    PANEL_SPLIT = 5
    PANEL_TOO_LONG = 6
    PANEL_TOO_SHORT = 7
    VRV_FAIL = 8

    PART_PROBLEM = [
        (FREEZE_DAMAGE, 'Freeze Damage'),
        (DIMPLE_LEAK_REV_ONLY, 'Dimple Leak - Rev Only'),
        (HEADER_LEAK, 'Header Leak'),
        (PANEL_LEAK, 'Panel Leak'),
        (PANEL_SPLIT, 'Panel Split'),
        (PANEL_TOO_LONG, 'Panel too long'),
        (PANEL_TOO_SHORT, 'Panel too short'),
        (VRV_FAIL, 'VRV Fail'),
    ]

    Repair = 1
    replace = 2
    CLAIM_ACTION = [
        (Repair, 'Repair'),
        (replace, 'replace'),
    ]

    registration = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dealer = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    date_entered = models.DateField(auto_now_add=True)
    service_date = models.DateField(auto_now=True)
    status = models.SmallIntegerField(choices=Claim_status,blank=True, null=True)
    status_code = models.SmallIntegerField()
    date_finalized = models.DateField(blank=True, null=True)
    csr_note = models.TextField(blank=True, null=True)
    user_note = models.TextField(blank=True, null=True)
    dealer_ref_number = models.CharField(max_length=255, blank=True, null=True)
    claim_action = models.PositiveSmallIntegerField(choices=CLAIM_ACTION, blank=True, null=True)
    part_problem = models.PositiveSmallIntegerField(choices=PART_PROBLEM,blank=True,null=True)

    def __str__(self) -> str:
        return self.registration.customer.username


class UploadClaimDocument(models.Model):
    document_note = models.CharField(max_length=255)
    document = models.FileField(upload_to ='documents/upload') 
    uploaded_at = models.DateTimeField(auto_now_add=True)
    rmaid = models.ForeignKey(
        Claim, on_delete=models.CASCADE,null=True,blank=True,
        related_name='rmaid'
    )
