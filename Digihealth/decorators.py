from django.shortcuts import redirect, render


def role_required(allowed_roles=[]):
    def decorator(func):
        def wrap(request, *args, **kwargs):
            if request.user.role in allowed_roles:
                return func(request, *args, **kwargs)
            else:
                return render(request, 'ErrorPages/401.html')

        return wrap

    return decorator


def login_required(func):
    def wrap(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        else:
            return redirect('/')
    return wrap
