import unittest
import datetime
from Settings.models import Global
from Employee.tests import EmployeeCase
from Authentication.models import CustomUser
from dotenv import load_dotenv
from pathlib import Path
import os
from Patient.tests import PatientCase
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))


# Create your tests here.
# Execute Test.py file in windows : manage.py test Genetic.tests.MainTestCase.MainCase
# Execute Test.py file in linux   : ./manage.py test Genetic.tests.MainTestCase.MainCase

class MainTestCase(unittest.TestCase):
    def MainCase(self):
        Global.objects.create(hospital="Genetic Hospital", visible="Genetic", contact="+919534587463",
                              email="contact@genetic.com",
                              address="Enter your address..", facebook="https://facebook.com",
                              link1="https://aboutus.com",
                              link2="https://teams.com", link3="https://contactus.com")
        EmployeeCase.admincase(self)
        EmployeeCase.doctorcase(self)
        EmployeeCase.receptionistcase(self)
        PatientCase.categorycase(self)
        PatientCase.patientcase(self)