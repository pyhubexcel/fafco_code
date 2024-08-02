from django.db import models
from user.models import Customer, Profile
from part.models import Part
from user.models import Profile
# from MultiFileField.field import MultiFileField
import json


class Claim(models.Model):

    Draft = 0
    Submitted = 1
    Pending = 3
    Credited = 6
    Denied = 7
    Voided = 99

    Claim_status = [
        (Draft, 'Draft'),
        (Submitted, 'Submitted'),
        (Pending, 'Pending'),
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
    repair_date = models.DateField(null=True, blank=True)
    parts = models.ManyToManyField(Part, related_name='multiple_claims', blank=True,null=True)
    part_id= models.ForeignKey(Part, on_delete=models.CASCADE,blank=True,null=True)
    status = models.SmallIntegerField(choices=Claim_status,blank=True, null=True)
    add_comment = models.TextField(blank=True, null=True)
    claim_action = models.PositiveSmallIntegerField(choices=CLAIM_ACTION, blank=True, null=True)
    part_problem = models.PositiveSmallIntegerField(choices=PART_PROBLEM,blank=True,null=True)
    # documents = models.FileField(upload_to='documents/', blank=True, null=True)
    documents = models.JSONField(default=list, blank=True)

    def __str__(self) -> str:
        return self.registration.customer.username




class UploadClaimDocument(models.Model):
    document_note = models.CharField(max_length=255)
    document = models.FileField(upload_to ='documents/upload') 
    uploaded_at = models.DateTimeField(auto_now_add=True)
    regid = models.ForeignKey(
        Profile, on_delete=models.CASCADE,null=True,blank=True,
        related_name='profile'
    )
