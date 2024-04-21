from django.http import JsonResponse
from django.shortcuts import render, redirect

from Authentication.models import CustomUser
from Digihealth.decorators import login_required, role_required
from Patient.models import Patient, Category


# Patient #
@login_required
@role_required(allowed_roles=[1, 3])
def add_patient(request):
    if request.method == 'POST':
        name = request.POST['name']
        gender = request.POST['gender']
        birthdate = request.POST['birthdate']
        age = request.POST['age']
        marital_status = request.POST['marital_status']
        mobile_no = request.POST['phone']
        email = request.POST['email']
        category = request.POST['category']
        blood_group = request.POST['blood_group']
        blood_pressure = request.POST['blood_pressure']
        height = request.POST['height']
        weight = request.POST['weight']
        address = request.POST['address']
        username = request.POST['username']
        password = request.POST['retype_password']
        category = int(category)

        if not birthdate:
            birthdate = None

        if not blood_pressure:
            blood_pressure = None

        if not height:
            height = None

        if not weight:
            weight = None

        if not address:
            address = None

        check_email = CustomUser.objects.filter(email=email)
        if check_email:
            return JsonResponse({'exist_email': 1})

        check_username = CustomUser.objects.filter(username=username)
        if check_username:
            return JsonResponse({'exist_username': 1})

        add = Patient(name=name, gender=gender, birthdate=birthdate, age=age, marital_status=marital_status,
                      mobile_no=mobile_no, email=email, category_id=category, blood_group=blood_group,
                      blood_pressure=blood_pressure, height=height, weight=weight, address=address)
        add.save()

        role = 4
        aid = add.id

        user = CustomUser.objects.create_user(username=username, password=password, email=email, role=role, aid=aid)
        user.save()
        return JsonResponse({'insert': 1})
    else:
        cat_list = Category.objects.all()
        context = {'category_list': cat_list}
        return render(request, 'Patient_template/add_patient.html', context)


@login_required
@role_required(allowed_roles=[1, 3])
def delete_patient(request):
    if request.method == 'POST':
        patient_id = request.POST['patient_id']
        rem = Patient.objects.get(pk=patient_id)
        rem2 = CustomUser.objects.get(aid=patient_id, role=4)
        if rem.id == 1:
            return JsonResponse({'delete': 0})
        else:
            rem.delete()
            rem2.delete()
        return JsonResponse({'delete': 1})
    else:
        return redirect('/dashboard')


@login_required
@role_required(allowed_roles=[1, 2, 3])
def patient_list(request):
    patient_all_list = Patient.objects.all()
    context = {'all_patient': patient_all_list}
    return render(request, 'Patient_template/patient_list.html', context)


@login_required
@role_required(allowed_roles=[1, 3])
def update_patient(request, patient_id):
    if request.method == 'POST':
        name = request.POST['update_name']
        gender = request.POST['update_gender']
        birthdate = request.POST['update_birthdate']
        age = request.POST['update_age']
        marital_status = request.POST['update_marital_status']
        mobile_no = request.POST['update_phone']
        email = request.POST['update_email']
        category = request.POST['update_category']
        blood_group = request.POST['update_blood_group']
        blood_pressure = request.POST['update_blood_pressure']
        height = request.POST['update_height']
        weight = request.POST['update_weight']
        address = request.POST['update_address']
        category = int(category)

        if not birthdate:
            birthdate = None

        if not blood_pressure:
            blood_pressure = None

        if not height:
            height = None

        if not weight:
            weight = None

        if not address:
            address = None
        try:
            emp = Patient.objects.get(pk=patient_id)
        except Patient.DoesNotExist:
            emp = None

        if email:
            CustomUser.objects.filter(aid=emp.id,  role=4).update(email=email)

        Patient.objects.filter(pk=patient_id).update(name=name, gender=gender, birthdate=birthdate, age=age,
                                                     marital_status=marital_status,
                                                     mobile_no=mobile_no, email=email, category_id=category,
                                                     blood_group=blood_group,
                                                     blood_pressure=blood_pressure, height=height,
                                                     weight=weight,
                                                     address=address)
        return JsonResponse({'update': 1})
    else:
        return render(request, 'Dashboard_template/dashboard.html')


@login_required
@role_required(allowed_roles=[1, 3])
def get_patient_list(request, patient_id):
    data = Patient.objects.get(pk=patient_id)

    category_list = Category.objects.all()
    return render(request, 'Patient_template/update_patient.html',
                  context={'data': data, 'category_list': category_list})


# Category #
@login_required
@role_required(allowed_roles=[1, 2, 3])
def category(request):
    if request.method == 'POST':
        category = request.POST['category']

        check = Category.objects.filter(category=category)
        if check:
            return JsonResponse({'exist': 1})

        add = Category(category=category)
        add.save()
        return JsonResponse({'insert': 1})
    else:
        list = Category.objects.all()
        context = {'category_list': list}
        return render(request, 'Patient_template/category.html', context)


@login_required
@role_required(allowed_roles=[1, 2, 3])
def delete_category(request):
    if request.method == 'POST':
        id = request.POST['category_id']

        cat = Category.objects.get(pk=id)
        cat.delete()

        return JsonResponse({'delete': 1})
    else:
        return redirect('/dashboard')


@login_required
@role_required(allowed_roles=[1])
def update_category(request):
    if request.method == 'POST':
        id = request.POST['id']
        category = request.POST['update_category']

        check = Category.objects.filter(category=category)
        if check:
            return JsonResponse({'exist': 1})

        Category.objects.filter(pk=id).update(category=category)

        return JsonResponse({'update': 1})
    else:
        return redirect('/dashboard')
