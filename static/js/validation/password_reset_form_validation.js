let signin_validation;
$(document).ready(function () {
    signin_validation = FormValidation.formValidation(
        KTUtil.getById('kt_login_password_reset_form'),
        {
            fields: {
                new_password1: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter a password'
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: 'The password must be more than 6 and less than 12 characters long'
                        }
                    }
                },

                new_password2: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter a password again'
                        },
                        identical: {
                            compare: function () {
                                return KTUtil.getById('kt_login_password_reset_form').querySelector('[name="new_password1"]').value;
                            },
                            message: "Password doesn't match"
                        }
                    },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap()
            }
        }
    );

    $('#password_reset').on('click', function (e) {
        e.preventDefault();

        signin_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $('#kt_login_password_reset_form').submit();
            }
        })
    })

})
