from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render

from Appointment.models import Appointment
from Appointment.tasks import AppointmentCreate, AppointmentConfirm, AppointmentClosed
from Employee.models import Employee
from Genetic.decorators import login_required, role_required
from Patient.models import Patient
from Schedule.models import Schedule


# Create your views here.
@login_required
@role_required(allowed_roles=[1, 3])
def add_appointment(request):
    if request.method == 'POST':
        patient = request.POST['patient']
        doctor = request.POST['doctor']
        appointment_date = request.POST['appointment_date']
        time_slot = request.POST['time_slot']
        fees = request.POST['fees']

        check = Appointment.objects.filter(patient_id=patient, doctor_id=doctor, appointment_date=appointment_date)
        if check:
            return JsonResponse({'exist': 1})
        add = Appointment(patient_id=patient, doctor_id=doctor, appointment_date=appointment_date, time_slot=time_slot,
                          fees=fees, status='Pending')
        add.save()
        app_id = add.id
        AppointmentCreate(patient, doctor, app_id, appointment_date, time_slot).start()
        return JsonResponse({'insert': 1})
    else:
        patient_list = Patient.objects.all()
        doctor_list = Employee.objects.filter(designation='Doctor')
        context = {'patient_list': patient_list, 'doctor_list': doctor_list}
        return render(request, 'Appointment_template/add_appointment.html', context=context)


@login_required
@role_required(allowed_roles=[1, 2, 3, 4])
def appointment_list(request):
    if request.user.role == 1 or request.user.role == 3:
        patient_list = Patient.objects.all()
        doctor_list = Employee.objects.filter(designation='Doctor')
        appointment = Appointment.objects.filter(Q(status='Confirmed') | Q(status='Closed')).order_by(
            '-id')
        return render(request, 'Appointment_template/appointment_list.html',
                      context={'appointment_list': appointment, 'patient_list': patient_list,
                               'doctor_list': doctor_list})

    elif request.user.role == 2:
        appointment = Appointment.objects.filter(Q(status='Confirmed') | Q(status='Closed'),
                                                 doctor_id=request.user.aid).order_by('-appointment_date')
        return render(request, 'Appointment_template/appointment_list.html',
                      context={'appointment_list': appointment})

    elif request.user.role == 4:
        appointment = Appointment.objects.filter(Q(status='Confirmed') | Q(status='Closed'),
                                                 patient_id=request.user.aid).order_by('-appointment_date')
        return render(request, 'Appointment_template/appointment_list.html',
                      context={'appointment_list': appointment})


@login_required
@role_required(allowed_roles=[1, 3])
def pending_appointment_list(request):
    appointment = Appointment.objects.filter(status='Pending').order_by('-appointment_date')
    return render(request, 'Appointment_template/pending_list.html', context={'appointment_list': appointment})


@login_required
@role_required(allowed_roles=[1, 3])
def confirm_appointment(request):
    if request.method == 'POST':
        id = request.POST['appointment_id']
        Appointment.objects.filter(pk=id).update(status='Confirmed')
        data = Appointment.objects.get(pk=id)
        patient = data.patient_id
        doctor = data.doctor_id
        app_id = id
        apppointmet_date = data.appointment_date
        time_slot = data.time_slot
        AppointmentConfirm(patient, doctor, app_id, apppointmet_date, time_slot).start()
        return JsonResponse({'confirm': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
@role_required(allowed_roles=[1, 3])
def close_appointment(request):
    if request.method == 'POST':
        id = request.POST['appointment_id']
        Appointment.objects.filter(pk=id).update(status='Closed')
        data = Appointment.objects.get(pk=id)
        patient = data.patient_id
        doctor = data.doctor_id
        app_id = id
        apppointmet_date = data.appointment_date
        time_slot = data.time_slot
        AppointmentClosed(patient, doctor, app_id, apppointmet_date, time_slot).start()
        return JsonResponse({'close': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
@role_required(allowed_roles=[1, 3])
def delete_appointment(request):
    if request.method == 'POST':
        id = request.POST['appointment_id']
        rem = Appointment.objects.filter(pk=id)
        rem.delete()
        return JsonResponse({'delete': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
def loadtimeslot(request):
    if request.method == 'POST':
        doctor_id = request.POST['doctor_id']
        week_day = request.POST['weekday']
        doctor_id = int(doctor_id)

        try:
            data = Schedule.objects.get(doctor_id=doctor_id, week_day=week_day)
        except Schedule.DoesNotExist:
            data = None

        timeslot = {}
        if data is not None:
            start_time = data.start_time
            end_time = data.end_time
            fees = data.fees

            timeslot = {
                'start_time': start_time,
                'end_time': end_time,
                'fees': fees
            }
        return JsonResponse(timeslot)
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
@role_required(allowed_roles=[1, 3])
def update_appointment(request):
    if request.method == 'POST':
        id = request.POST['appointment_id']
        patient = request.POST['update_patient']
        doctor = request.POST['update_doctor']
        appointment_date = request.POST['update_appointment_date']
        time_slot = request.POST['update_time_slot']
        fees = request.POST['update_fees']
        status = request.POST['update_status']

        check = Appointment.objects.filter(patient_id=patient, doctor_id=doctor, appointment_date=appointment_date)
        if check:
            check1 = Appointment.objects.filter(pk=id, patient_id=patient, doctor_id=doctor,
                                                appointment_date=appointment_date, time_slot=time_slot,
                                                fees=fees, status=status)
            if not check1:
                Appointment.objects.filter(pk=id).update(patient_id=patient, doctor_id=doctor,
                                                         appointment_date=appointment_date, time_slot=time_slot,
                                                         fees=fees, status=status)
                return JsonResponse({'update': 1})
            if check1:
                return JsonResponse({'update': 1})
            return JsonResponse({'exist': 1})
        Appointment.objects.filter(pk=id).update(patient_id=patient, doctor_id=doctor,
                                                 appointment_date=appointment_date, time_slot=time_slot,
                                                 fees=fees, status=status)
        return JsonResponse({'update': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')
