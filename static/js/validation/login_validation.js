let signin_validation;
jQuery(document).ready(function () {
    signin_validation = FormValidation.formValidation(
        KTUtil.getById('kt_login_signin_form'),
        {
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: 'Username is required'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Password is required'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap()
            }
        }
    );

    $('#kt_login_signin_submit').on('click', function (e) {
        e.preventDefault();

        signin_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'login',
                    data: $('#kt_login_signin_form').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.success === 1) {
                            window.location = '/dashboard';
                        } else if (data.NotExist === 1) {
                            Swal.fire(
                                "Error",
                                "Invalid Credentials",
                                "error"
                            )
                        }
                    },
                });
            }
        });
    });
});
