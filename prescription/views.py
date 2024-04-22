from django.shortcuts import render
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Prescription
from Employee.models import Employee
from Patient.models import Patient
from Digihealth.decorators import login_required, role_required

@login_required
@role_required(allowed_roles=[1, 2])
def add_prescription(request):
    if request.method == 'POST':
        doctor_id = request.POST.get('doctor')
        patient_id = request.POST.get('patient')
        date = request.POST.get('date')
        medicine_name = request.POST.get('medicine_name')
        morning_dosage = request.POST.get('morning_dosage')
        afternoon_dosage = request.POST.get('afternoon_dosage')
        night_dosage = request.POST.get('night_dosage')
        remarks = request.POST.get('remarks')

        prescription = Prescription(
            doctor_id=doctor_id,
            patient_id=patient_id,
            date=date,
            medicine_name=medicine_name,
            morning_dosage=morning_dosage,
            afternoon_dosage=afternoon_dosage,
            night_dosage=night_dosage,
            remarks=remarks
        )

        prescription.save()

        return JsonResponse({'insert': 1})
    else:
        patient_list = Patient.objects.all()
        doctor_list = Employee.objects.filter(designation='Doctor')
        context = {'patient_list': patient_list, 'doctor_list': doctor_list}
        return render(request, 'Prescription_template/add_prescription.html', context=context)



@login_required
@role_required(allowed_roles=[1, 2])
def Prescription_list(request):
        patient_list = Patient.objects.all()
        doctor_list = Employee.objects.filter(designation='Doctor')
        prescription_all_list = Prescription.objects.all().order_by('-date')
        context = {'prescription_all_list': prescription_all_list,'patient_list': patient_list, 'doctor_list': doctor_list}
        return render(request, 'Prescription_template/Prescription_list.html', context)