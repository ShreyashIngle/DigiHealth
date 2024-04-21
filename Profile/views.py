from django.shortcuts import render

from Authentication.models import CustomUser
from Employee.models import Employee
from Digihealth.decorators import login_required
from Patient.models import Patient


# Create your views here.
@login_required
def personal_info(request):
    if request.user.role == 1 or request.user.role == 2 or request.user.role == 3:
        employee = Employee.objects.get(pk=request.user.aid)
        context = {'personal': employee}
        return render(request, "Profile_template/employee_personal_information.html", context=context)
    else:
        patient = Patient.objects.get(pk=request.user.aid)
        context = {'personal': patient}
        return render(request, "Profile_template/patient_personal_information.html", context=context)


@login_required
def acc_info(request):
    if request.user.role == 1 or request.user.role == 2 or request.user.role == 3:
        employee = Employee.objects.get(pk=request.user.aid)
        acc_details = CustomUser.objects.get(pk=request.user.id)
        context = {'personal': employee, 'account': acc_details}
        return render(request, "Profile_template/account_information.html", context=context)
    else:
        patient = Patient.objects.get(pk=request.user.aid)
        acc_details = CustomUser.objects.get(pk=request.user.id)
        context = {'personal': patient, 'account': acc_details}
        return render(request, "Profile_template/account_information.html", context=context)


@login_required
def change_password(request):
    if request.user.role == 1 or request.user.role == 2 or request.user.role == 3:
        employee = Employee.objects.get(pk=request.user.aid)
        acc_details = CustomUser.objects.get(pk=request.user.id)
        context = {'personal': employee, 'account': acc_details}
        return render(request, "Profile_template/change_password.html", context)

    else:
        patient = Patient.objects.get(pk=request.user.aid)
        acc_details = CustomUser.objects.get(pk=request.user.id)
        context = {'personal': patient, 'account': acc_details}
        return render(request, "Profile_template/change_password.html", context)
