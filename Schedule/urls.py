from django.urls import path
from Schedule import views

app_name = 'Schedule'

urlpatterns = [
    path('add', views.add_schedule, name='add'),
    path('view', views.schedule_list, name='view'),
    path('delete', views.delete_schedule, name='delete'),
    path('update', views.update_schedule, name='update')
]
