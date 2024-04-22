# urls.py

from django.urls import path
from .views import add_prescription,Prescription_list
app_name = 'Prescription'

urlpatterns = [
    path('add/', add_prescription, name='add'),
    path('view/', Prescription_list, name='view')
]
