from Dashboard import views
from django.urls import path
from . import views

app_name = 'Profile'

urlpatterns = [
    path('personal-info', views.personal_info, name='personal-info'),
    path('account-info', views.acc_info, name='account-info'),
    path('change-password', views.change_password, name='change-password')
]
