import datetime
import json

from django.shortcuts import render

from Appointment.models import Appointment
from Employee.models import Employee
from Genetic.decorators import login_required
from Patient.models import Patient
from Settings.models import Global, Api_Settings

current = datetime.date.today()


# Create your views here.
@login_required
def index(request):
    patient = Patient.objects.count()
    employee = Employee.objects.count()
    doctor = Employee.objects.filter(designation='Doctor').count()
    appointment = Appointment.objects.count()
    data = {}
    for month in range(1, 13):
        appointment_data = Appointment.objects.filter(appointment_date__month=month,
                                                      appointment_date__year=current.year, status='Confirmed').count()
        data.update({month: appointment_data})
    data = json.dumps(data)
    # global_list = Global.objects.get(id=1)
    # request.session['h_name'] = global_list.hospital
    # request.session['v_name'] = global_list.visible
    # request.session['link1'] = global_list.link1
    # request.session['link2'] = global_list.link2
    # request.session['link3'] = global_list.link3
    context = {'patient': patient, 'employee': employee, 'doctor': doctor, 'appointment': appointment,
               'data': data}
    return render(request, 'Dashboard_template/dashboard.html', context=context)
