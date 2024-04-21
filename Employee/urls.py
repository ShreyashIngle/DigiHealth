from django.urls import path
from Employee import views

app_name = 'Employee'

urlpatterns = [
    path('add', views.add_employee, name='add'),
    path('view', views.employee_list, name='view'),
    path('edit/<employee_id>', views.get_employee_list, name='edit'),
    path('edit/update/<employee_id>', views.update_employee, name='update'),
    path('delete', views.delete_employee, name='delete'),
]