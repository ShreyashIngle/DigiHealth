from django.http import JsonResponse
from django.shortcuts import render, redirect

from Appointment.models import Appointment
from Authentication.models import CustomUser
from Employee.models import Employee
from Digihealth.decorators import login_required, role_required


# Create your views here.
@login_required
@role_required(allowed_roles=[1])
def add_employee(request):
    if request.method == 'POST':
        name = request.POST['name']
        gender = request.POST['gender']
        birthdate = request.POST['birthdate']
        blood_group = request.POST['blood_group']
        marital_status = request.POST['marital_status']
        mobile_no = request.POST['mobile_no']
        email = request.POST['email']
        address = request.POST['address']
        username = request.POST['username']
        password = request.POST['retype_password']
        role = request.POST['role']
        designation = request.POST['designation']
        joining_date = request.POST['joining_date']
        qualification = request.POST['qualification']

        if not birthdate:
            birthdate = None

        if role == 'Admin':
            role = 1

        if role == 'Doctor':
            role = 2

        if role == 'Receptionist':
            role = 3

        check = CustomUser.objects.filter(username=username)
        if check:
            return JsonResponse({'exist': 1})

        add = Employee(name=name, gender=gender, birthdate=birthdate, blood_group=blood_group, mobile_no=mobile_no,
                       email=email,
                       marital_status=marital_status, address=address, role=role, designation=designation,
                       joining_date=joining_date, qualification=qualification)
        add.save()

        aid = add.id
        user = CustomUser.objects.create_user(username=username, password=password, email=email, role=role, aid=aid)
        user.save()
        return JsonResponse({'insert': 1})
    else:
        return render(request, 'Employee_template/add_employee.html')


@login_required
@role_required(allowed_roles=[1, 2, 3, 4])
def employee_list(request):
    if request.user.role == 1 or request.user.role == 2 or request.user.role == 3:
        admin = Employee.objects.filter(designation='Admin')
        doctor = Employee.objects.filter(designation='Doctor')
        receptionist = Employee.objects.filter(designation='Receptionist')
        context = {'admin': admin, 'doctor': doctor, 'receptionist': receptionist}
        return render(request, 'Employee_template/employee_list.html', context=context)
    else:
        doctor = Employee.objects.filter(designation='Doctor')
        context = {'doctor': doctor}
        return render(request, 'Employee_template/employee_list.html', context=context)

@login_required
@role_required(allowed_roles=[1])
def update_employee(request, employee_id):
    if request.method == 'POST':
        name = request.POST['update_name']
        gender = request.POST['update_gender']
        birthdate = request.POST['update_birthdate']
        blood_group = request.POST['update_blood_group']
        marital_status = request.POST['update_marital_status']
        mobile_no = request.POST['update_mobile_no']
        email = request.POST['update_email']
        address = request.POST['update_address']
        role = request.POST['update_role']
        designation = request.POST['update_designation']
        joining_date = request.POST['update_joining_date']
        qualification = request.POST['update_qualification']

        if not birthdate:
            birthdate = None

        if role == 'Admin':
            role = 1

        if role == 'Doctor':
            role = 2

        if role == 'Receptionist':
            role = 3

        try:
            emp = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            emp = None

        if role:
            CustomUser.objects.filter(aid=emp.id, role=emp.role).update(role=role)

        if email:
            CustomUser.objects.filter(aid=emp.id, role=emp.role).update(email=email)

        Employee.objects.filter(pk=employee_id).update(name=name, gender=gender, birthdate=birthdate,
                                                       blood_group=blood_group, mobile_no=mobile_no, email=email,
                                                       marital_status=marital_status, address=address,
                                                       role=role, designation=designation,
                                                       joining_date=joining_date, qualification=qualification)

        if int(employee_id) == request.user.aid:
            request.session['name'] = name
        return JsonResponse({'update': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
@role_required(allowed_roles=[1])
def get_employee_list(request, employee_id):
    data = Employee.objects.get(pk=employee_id)
    return render(request, 'Employee_template/update_employee.html',
                  context={'data': data})


@login_required
@role_required(allowed_roles=[1])
def delete_employee(request):
    if request.method == 'POST':
        employee_id = request.POST['employee_id']
        employee_role = request.POST['role']
        employee_role = int(employee_role)

        rem = Employee.objects.get(pk=employee_id)
        rem2 = CustomUser.objects.get(aid=employee_id, role=employee_role)
        if rem.id and rem2.id == 1:
            print('Admin cannot be deleted')
            return JsonResponse({'delete': 0})
        else:
            if employee_role == 2:
                Appointment.objects.filter(doctor_id=employee_id).update(time_slot=None)
            rem.delete()
            rem2.delete()
            return JsonResponse({'delete': 1})
    else:
        return redirect('/dashboard')
