import unittest
import datetime
from Employee.models import Employee
from Authentication.models import CustomUser
from dotenv import load_dotenv
from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Create your tests here.


class EmployeeCase():
    def admincase(self):
        current_date = datetime.date.today()
        print('Creating Admin Account....')

        Employee.objects.create(name='John Doe', gender='Male', blood_group='A+', birthdate='2002-05-02',
                                mobile_no="+918160521030", email=str(os.getenv('EMAIL')), marital_status='Single',
                                address='Golden Height,Andheri(West)', role=1, designation='Admin',
                                joining_date=current_date)

        add = CustomUser.objects.create_user(username=str(os.getenv('PROJECT_USERNAME')), password=str(os.getenv('PASSWORD')), email=str(os.getenv('EMAIL')), role=1,
                                             aid=1)
        add.save()

        Employee.objects.create(name='Shreyash Ingle', gender='Male', blood_group='B+', birthdate='2005-03-31',
                                mobile_no="+917445600845", email='admin@digihealth.com', marital_status='Single',
                                address='Pune', role=1, designation='Admin',
                                joining_date=current_date)

        add = CustomUser.objects.create_user(username='admin', password='admin@123', email='admin@digihealth.com', role=1,
                                             aid=2)
        add.save()

    def doctorcase(self):
        current_date = datetime.date.today()
        print('Creating Doctor Account....')

        Employee.objects.create(name='Camille Roob', gender='Female', blood_group='AB+', birthdate='2002-05-02',
                                mobile_no="+917458365415", email='doctor@genetic.com', marital_status='Single',
                                address='131 Avenue A, North Dakota, New York - 10009', role=2, designation='Doctor',
                                joining_date=current_date)

        add = CustomUser.objects.create_user(username='doctor', password='doctor@123', email='doctor@genetic.com', role=2,
                                             aid=3)
        add.save()

    def receptionistcase(self):
        current_date = datetime.date.today()
        print('Creating Receptionist Account....')

        Employee.objects.create(name='Jovanny Quigley', gender='Male', blood_group='A-', birthdate='2002-05-02',
                                mobile_no="+918160521030", email='receptionist@genetic.com', marital_status='Single',
                                address='488 S Mills Rd, Ventura, California - 93003', role=3, designation='Receptionist',
                                joining_date=current_date)

        add = CustomUser.objects.create_user(username='receptionist', password='recept@123', email='receptionist@genetic.com', role=3,
                                             aid=4)
        add.save()
