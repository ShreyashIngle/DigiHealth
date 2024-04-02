from Patient.models import Patient, Category
from Authentication.models import CustomUser


# Create your tests here.

class PatientCase():

    def categorycase(self):
        print('Creating Category....')
        Category.objects.create(category='General')
        Category.objects.create(category='Oncologist')
        Category.objects.create(category='Nephrology')
        Category.objects.create(category='Pulmonology')
        Category.objects.create(category='Hematology')
        Category.objects.create(category='Gynaecology')
        Category.objects.create(category='Cardiology')

    def patientcase(self):
        print('Creating Patient....')
        Patient.objects.create(name='Tyson Dietrich', gender='Male', birthdate='2001-07-07', age=21, marital_status='Married',
                        mobile_no='+918741256004', email='patient@genetic.com', category_id=1, blood_group='O+',
                        blood_pressure=88, height=153, weight=50, address='India')
        
        add = CustomUser.objects.create_user(username='patient', password='patient@123', email='patient@genetic.com', role=4,
                                                aid=1)
        add.save()

        Patient.objects.create(name='Mr. Julian Botsford', gender='Male', birthdate='2005-03-12', age=17, marital_status='Single',
                mobile_no='+918741256004', email='julian@gmail.com', category_id=5, blood_group='A+',
                blood_pressure=88, height=153, weight=50, address='7601 34th Ave S, Minneapolis, MN 55450, United States - 55450')
        
        add = CustomUser.objects.create_user(username='julian', password='julian@123', email='julian@gmail.com', role=4,
                                                aid=2)
        add.save()