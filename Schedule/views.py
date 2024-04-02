from django.http import JsonResponse
from django.shortcuts import render, redirect

from Employee.models import Employee
from Genetic.decorators import login_required, role_required
from Schedule.models import Schedule


# Create your views here.
@login_required
@role_required(allowed_roles=[1, 3])
def add_schedule(request):
    if request.method == 'POST':
        doctor = request.POST['doctor']
        fees = request.POST['fees']
        week_day = request.POST.getlist('weekday')
        start_time = request.POST['start_time']
        end_time = request.POST['end_time']
        doctor = int(doctor)

        for element in week_day:
            try:
                exist = Schedule.objects.get(doctor_id=doctor, week_day=element)
            except Schedule.DoesNotExist:
                exist = None

            if exist:
                day = exist.week_day
                return JsonResponse({'exist': 1, 'day': day})

        for element in week_day:
            add = Schedule(doctor_id=doctor, fees=fees, start_time=start_time, end_time=end_time, week_day=element)
            add.save()
        return JsonResponse({'insert': 1})
    else:
        doctor_list = Employee.objects.filter(designation='Doctor')
        context = {'doctor_list': doctor_list}
        return render(request, 'Schedule_template/add_schedule.html', context=context)


@login_required
@role_required(allowed_roles=[1, 2, 3, 4])
def schedule_list(request):
    schedule_items = Schedule.objects.all()
    doctor_list = Employee.objects.filter(designation='Doctor')
    context = {'schedules': schedule_items, 'doctor_list': doctor_list}
    return render(request, 'Schedule_template/schedule_list.html', context=context)


@login_required
@role_required(allowed_roles=[1, 3])
def delete_schedule(request):
    if request.method == 'POST':
        schedule_id = request.POST['schedule_id']
        rem = Schedule.objects.get(pk=schedule_id)
        rem.delete()
        return JsonResponse({'delete': 1})
    else:
        return redirect('/dashboard')


@login_required
@role_required(allowed_roles=[1, 3])
def update_schedule(request):
    if request.method == 'POST':
        schedule_id = request.POST['schedule_id']
        doctor = request.POST['update_doctor']
        fees = request.POST['update_fees']
        week_day = request.POST['update_weekday']
        start_time = request.POST['update_start_time']
        end_time = request.POST['update_end_time']

        check = Schedule.objects.filter(doctor_id=doctor, week_day=week_day)
        if check:
            check1 = Schedule.objects.filter(doctor_id=doctor, fees=fees, week_day=week_day, start_time=start_time,
                                             end_time=end_time)
            if not check1:
                Schedule.objects.filter(pk=schedule_id).update(doctor=doctor, fees=fees, week_day=week_day,
                                                               start_time=start_time, end_time=end_time)
                return JsonResponse({'update': 1})
            return JsonResponse({'exist': 1})
        Schedule.objects.filter(pk=schedule_id).update(doctor=doctor, fees=fees, week_day=week_day,
                                                       start_time=start_time, end_time=end_time)
        return JsonResponse({'update': 1})
    else:
        return redirect('/dashboard')
