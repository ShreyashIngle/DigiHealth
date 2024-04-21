import threading

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from Settings.models import Global


class ForgotPassword(threading.Thread):
    def __init__(self, user, full_name):
        self.user = user
        self.full_name = full_name
        threading.Thread.__init__(self)

    def run(self):
        site = Global.objects.get(pk=1)
        subject = "Password Reset Requested"
        c = {
            "email": self.user.email,
            'domain': '127.0.0.1:8000',
            'site_name': site.visible,
            'site_full_name': site.hospital,
            'site_email': site.email,
            'user_name': self.full_name,
            'site_address': site.address,
            'uid': urlsafe_base64_encode(force_bytes(self.user.pk)),
            'user': self.user,
            'token': default_token_generator.make_token(self.user),
            'protocol': 'http',
            'facebook': site.facebook,
            'contact': site.contact,
        }
        html_template = render_to_string('Email_templates/password_email_template.html', c)
        from_email = site.hospital + " " + "<" + site.email + ">"
        try:
            send_mail(subject, None, from_email, [self.user.email], html_message=html_template)
        except BadHeaderError:
            return JsonResponse({'failed': 1})
