let change_password_validation;
$(document).ready(function () {
    change_password_validation = FormValidation.formValidation(
        KTUtil.getById('change_password_form'),
        {
            fields: {
                old_password: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter current password'
                        }
                    }
                },

                new_password: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter new password'
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: 'The password must be more than 6 and less than 12 characters long'
                        }
                    }
                },

                retype_new_password: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter new password again'
                        },
                        identical: {
                            compare: function () {
                                return KTUtil.getById('change_password_form').querySelector('[name="new_password"]').value;
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

    $('#change_password_form').on('submit', function (e) {
        e.preventDefault();

        change_password_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: '/change_password',
                    data: $('#change_password_form').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.success === 1) {
                            Swal.fire({
                                title: "Password changed successfully",
                                text: "You will be logout automatically after 5 second",
                                icon: "success",
                                timer: 5000,
                                onOpen: function () {
                                    Swal.showLoading()
                                }
                            }).then(function (result) {
                                if (result.dismiss === "timer") {
                                    window.location.href = '/logout';
                                } else {
                                    window.location.href = '/logout';
                                }
                            })
                        } else if (data.failed === 1) {
                            Swal.fire(
                                "Error",
                                "Please enter correct password",
                                "error"
                            )
                        }
                    }
                })
            }
        })
    })
})
