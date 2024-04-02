from django.db import models


# Create your models here.

class Employee(models.Model):
    class Meta:
        db_table = 'employee'

    def __str__(self):
        return self.name

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    blood_group = models.CharField(max_length=3)
    birthdate = models.DateField(null=True)
    mobile_no = models.CharField(max_length=13)
    email = models.EmailField(unique=True)
    marital_status = models.CharField(max_length=10)
    address = models.TextField()
    role = models.IntegerField()
    designation = models.CharField(max_length=20)
    joining_date = models.DateField()
    qualification = models.CharField(max_length=225)
