from django.urls import path
from Authentication import views
from django.contrib.auth import views as auth_view
from .forms import *
from django.urls import reverse_lazy

app_name = 'Authentication'

urlpatterns = [
    path('', views.loginpage, name='loginpage'),
    path('login', views.handlelogin, name='login'),
    path('logout', views.handlelogout, name='logout'),
    path('change_password', views.change_password, name='change_password'),
    path('password_reset', views.password_reset, name='password_reset'),
    path('password_reset/done',
         auth_view.PasswordResetDoneView.as_view(template_name='Authentication_template/password_reset_done.html'),
         name='password_reset_done'),

    path('reset/<uidb64>/<token>',
         auth_view.PasswordResetConfirmView.as_view(template_name='Authentication_template/password_reset_form.html',
                                                    form_class=SetPasswordForm,
                                                    success_url=reverse_lazy('Authentication:password_reset_complete')),
         name='password_reset_confirm'),

    path('password_reset/complete', auth_view.PasswordResetCompleteView.as_view(
        template_name='Authentication_template/password_reset_complete.html'),
         name='password_reset_complete')
]
