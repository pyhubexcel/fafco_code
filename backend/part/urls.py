from django.urls import path

from .views import PartAPI, PartListAPI, PartcsvListView, PartupdatedeleteAPI, PartupdateAPI

urlpatterns = [
    path('part/', PartAPI.as_view(), name='part'),
    path(
        'part-detail/<int:profile_id>',
        PartListAPI.as_view(),
        name='part_detail'
        ),

    path(
        'part-details/<int:profile_id>/<int:part_id>',
        PartupdatedeleteAPI.as_view(),
        name='part_detail'
        ),
    path(
        'part-details/<int:part_id>',
        PartupdateAPI.as_view(),
        name='part-update'
    ),
    path('partcsv/', PartcsvListView.as_view(), name='partcsv-list'),
]
