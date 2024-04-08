from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.shortcuts import render, redirect, reverse

from Authentication.models import CustomUser
from Authentication.tasks import ForgotPassword
from Employee.models import Employee
from Digihealth.decorators import login_required
from Patient.models import Patient
from Settings.models import Global


# Create your views here.

def loginpage(request):
    if request.user.is_authenticated:
        return redirect(reverse('Dashboard:dashboard'))
    else:
        global_list = Global.objects.get(pk=1)
        request.session['h_name'] = "DigiHealth "
        request.session['v_name'] = "DigiHealth"
        request.session['link1'] = global_list.link1
        request.session['link2'] = global_list.link2
        request.session['link3'] = global_list.link3
        return render(request, 'Authentication_template/login.html')


def handlelogin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)

            if request.user.role == 1 or request.user.role == 2 or request.user.role == 3:
                data = Employee.objects.get(pk=request.user.aid, role=request.user.role)
                request.session['name'] = data.name
                if request.user.role == 1:
                    request.session['role'] = 'Admin'
                if request.user.role == 2:
                    request.session['role'] = 'Doctor'
                if request.user.role == 3:
                    request.session['role'] = 'Receptionist'
            else:
                data = Patient.objects.get(pk=request.user.aid)
                request.session['name'] = data.name
                request.session['role'] = 'Patient'

            return JsonResponse({'success': 1})

        else:
            return JsonResponse({'NotExist': 1})
    else:
        data = Global.objects.get(pk=1)
        context = {'data': data}
        return render(request, 'Authentication_template/login.html', context=context)


def handlelogout(request):
    logout(request)
    return redirect(reverse('Authentication:loginpage'))


def password_reset(request):
    if request.method == "POST":
        email = request.POST['email']

        user_email = CustomUser.objects.filter(email=email)

        try:
            name = Patient.objects.get(email=email)
            full_name = name.name
        except Patient.DoesNotExist:
            try:
                name = Employee.objects.get(email=email)
                full_name = name.name
            except Employee.DoesNotExist:
                full_name = None

        if user_email.exists():
            for user in user_email:
                ForgotPassword(user, full_name).start()
        return redirect(reverse('Authentication:password_reset_done'))
    else:
        return render(request, 'Authentication_template/password_reset.html')


@login_required
def change_password(request):
    if request.method == 'POST':
        old_password = request.POST['old_password']
        retype_new_password = request.POST['retype_new_password']

        user = CustomUser.objects.get(pk=request.user.id)
        check = check_password(old_password, user.password)
        if check:
            user.set_password(retype_new_password)
            user.save()
            return JsonResponse({'success': 1})
        else:
            return JsonResponse({'failed': 1})
    else:
        return redirect('/profile/change-password')


def handle_not_found(request, exception):
    return render(request, 'ErrorPages/404.html')


def handle_server_error(request):
    return render(request, 'ErrorPages/401.html')
