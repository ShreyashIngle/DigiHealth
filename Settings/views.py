from Genetic.decorators import login_required, role_required
from django.http import JsonResponse
from django.shortcuts import render
from Settings.models import Global, Api_Settings


# Create your views here.

@login_required
@role_required(allowed_roles=[1])
def global_settings(request):
    if request.method == 'POST':
        hospital = request.POST['hospital_name']
        visible = request.POST['visible']
        contact = request.POST['contact']
        email = request.POST['email']
        facebook = request.POST['facebook']
        address = request.POST['address']
        link1 = request.POST['link1']
        link2 = request.POST['link2']
        link3 = request.POST['link3']

        Global.objects.filter(pk=1).update(hospital=hospital, visible=visible, contact=contact, email=email,
                                           address=address, facebook=facebook, link1=link1, link2=link2, link3=link3)
        request.session['h_name'] = hospital
        request.session['v_name'] = visible
        request.session['link1'] = link1
        request.session['link2'] = link2
        request.session['link3'] = link3
        return JsonResponse({'update': 1})
    else:
        global_list = Global.objects.get(id=1)
        context = {'main_list': global_list}
        return render(request, 'Settings_template/global_settings.html', context=context)


@login_required
@role_required(allowed_roles=[1])
def api_settings(request):
    if request.method == 'POST':
        map_api = request.POST['map_api']
        title = request.POST['title']
        latitude = request.POST['latitude']
        longitude = request.POST['longitude']
        message = request.POST['message']
        calendar_api = request.POST['calendar_api']

        Api_Settings.objects.filter(pk=1).update(map_api=map_api, title=title, latitude=latitude, longitude=longitude,
                                                 message=message, calendar_api=calendar_api)
        return JsonResponse({'update': 1})
    else:
        api_list = Api_Settings.objects.get(pk=1)
        context = {'api_list': api_list}
        return render(request, 'Settings_template/api_settings.html', context=context)
