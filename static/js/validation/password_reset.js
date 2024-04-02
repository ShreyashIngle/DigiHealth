let forgot_password_validation;
jQuery(document).ready(function () {
    forgot_password_validation = FormValidation.formValidation(
        KTUtil.getById('kt_login_forgot_form'),
        {
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Email address is required'
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
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

    $('#kt_login_forgot_submit').on('click', function (e) {
        e.preventDefault();
        forgot_password_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $('#kt_login_forgot_form').submit();
            }
        });
    });

    // Handle cancel button
    $('#kt_login_forgot_cancel').on('click', function (e) {
        e.preventDefault();
        window.location.href = '/'
    });
})