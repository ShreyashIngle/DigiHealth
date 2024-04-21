import threading

from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse
from django.template.loader import render_to_string

from Employee.models import Employee
from Patient.models import Patient
from Settings.models import Global


class AppointmentCreate(threading.Thread):
    def __init__(self, patient, doctor, add, appointment_date, time_slot):
        self.patient = patient
        self.doctor = doctor
        self.app_id = add
        self.appointment_date = appointment_date
        self.time_slot = time_slot
        threading.Thread.__init__(self)

    def run(self):
        site = Global.objects.get(pk=1)
        patient_data = Patient.objects.get(pk=self.patient)
        doctor_data = Employee.objects.get(pk=self.doctor)
        subject = "Appointment Requested: #" + str(self.app_id)
        c = {
            'user_name': patient_data.name,
            'doctor': doctor_data.name,
            'date': self.appointment_date,
            'time': self.time_slot,
            'protocol': 'http',
            'domain': '127.0.0.1:8000',
            'site_email': site.email,
            'site_full_name': site.hospital,
            'site_name': site.visible,
            'site_address': site.address,
            'facebook': site.facebook,
            'contact': site.contact,
        }
        html_template = render_to_string('Email_templates/appointment_added.html', c)
        from_email = site.hospital + " " + "<" + site.email + ">"
        try:
            send_mail(subject, None, from_email, [patient_data.email], html_message=html_template)
        except BadHeaderError:
            return JsonResponse({'failed': 1})


class AppointmentConfirm(threading.Thread):
    def __init__(self, patient, doctor, app_id, appointment_date, time_slot):
        self.patient = patient
        self.doctor = doctor
        self.app_id = app_id
        self.appointment_date = appointment_date
        self.time_slot = time_slot
        threading.Thread.__init__(self)

    def run(self):
        site = Global.objects.get(pk=1)
        patient_data = Patient.objects.get(pk=self.patient)
        doctor_data = Employee.objects.get(pk=self.doctor)
        subject = "Appointment Confirmed: #" + str(self.app_id)
        c = {
            'user_name': patient_data.name,
            'doctor': doctor_data.name,
            'date': self.appointment_date,
            'time': self.time_slot,
            'protocol': 'http',
            'domain': '127.0.0.1:8000',
            'site_email': site.email,
            'site_full_name': site.hospital,
            'site_name': site.visible,
            'site_address': site.address,
            'facebook': site.facebook,
            'contact': site.contact,
        }
        html_template = render_to_string('Email_templates/appointment_confirmed.html', c)
        from_email = site.hospital + " " + "<" + site.email + ">"
        try:
            send_mail(subject, None, from_email, [patient_data.email], html_message=html_template)
        except BadHeaderError:
            return JsonResponse({'failed': 1})


class AppointmentClosed(threading.Thread):
    def __init__(self, patient, doctor, app_id, appointment_date, time_slot):
        self.patient = patient
        self.doctor = doctor
        self.app_id = app_id
        self.appointment_date = appointment_date
        self.time_slot = time_slot
        threading.Thread.__init__(self)

    def run(self):
        site = Global.objects.get(pk=1)
        patient_data = Patient.objects.get(pk=self.patient)
        doctor_data = Employee.objects.get(pk=self.doctor)
        subject = "Appointment Closed: #" + str(self.app_id)
        c = {
            'user_name': patient_data.name,
            'doctor': doctor_data.name,
            'date': self.appointment_date,
            'time': self.time_slot,
            'protocol': 'http',
            'domain': '127.0.0.1:8000',
            'site_email': site.email,
            'site_full_name': site.hospital,
            'site_name': site.visible,
            'site_address': site.address,
            'facebook': site.facebook,
            'contact': site.contact,
        }
        html_template = render_to_string('Email_templates/appointment_closed.html', c)
        from_email = site.hospital + " " + "<" + site.email + ">"
        try:
            send_mail(subject, None, from_email, [patient_data.email], html_message=html_template)
        except BadHeaderError:
            return JsonResponse({'failed': 1})
