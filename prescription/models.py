# models.py
from django.db import models
from Patient.models import Patient
from Employee.models import Employee

class Prescription(models.Model):

    class Meta:
        db_table = 'prescriction'

    id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Employee, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    medicine_name = models.CharField(max_length=100)
    morning_dosage = models.CharField(max_length=100)
    afternoon_dosage = models.CharField(max_length=100)
    night_dosage = models.CharField(max_length=100)
    remarks = models.TextField()
