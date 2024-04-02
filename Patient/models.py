from django.db import models


# Create your models here.

class Category(models.Model):
    class Meta:
        db_table = 'category'

    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=60)

    def __str__(self):
        return self.category


class Patient(models.Model):
    class Meta:
        db_table = 'patient'

    def __str__(self):
        return self.name

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    gender = models.CharField(max_length=6)
    birthdate = models.DateField(null=True)
    age = models.IntegerField()
    marital_status = models.CharField(max_length=7)
    mobile_no = models.CharField(max_length=13)
    email = models.EmailField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    blood_group = models.CharField(max_length=3)
    blood_pressure = models.IntegerField(null=True)
    height = models.FloatField(null=True)
    weight = models.FloatField(null=True)
    address = models.TextField(null=True)
