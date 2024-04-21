let employee_form = document.getElementById('employee');
let employee_create_validation;
document.addEventListener('DOMContentLoaded', function () {
    employee_create_validation = FormValidation.formValidation(employee_form, {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Employee name is required'
                        }
                    }
                },

                gender: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                mobile_no: {
                    validators: {
                        notEmpty: {
                            message: 'Indian phone number is required'
                        },
                        mobile_no: {
                            country: 'IN',
                            message: 'The value is not a valid Indian phone number'
                        },
                        regexp: {
                            regexp: /^(\+)?(91)?[6789]\d{9}$/,
                            message: 'The value can only consist phone number'
                        }
                    }
                },

                email: {
                    validators: {
                        notEmpty: {
                            message: 'Employee email is required'
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        }
                    }
                },

                username: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter a username'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },

                password: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter a password'
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: 'The username must be more than 6 and less than 12 characters long'
                        }
                    }
                },

                retype_password: {
                    validators: {
                        notEmpty: {
                            message: 'Please enter a password again'
                        },
                        identical: {
                            compare: function () {
                                return employee_form.querySelector('[name="password"]').value;
                            },
                            message: "Password doesn't match"
                        }
                    }
                },

                role: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                designation: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                joining_date: {
                    validators: {
                        notEmpty: {
                            message: 'Joining date is required'
                        }
                    }
                },
            },

            plugins: { //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
            }
        }
    )
    $('[name="joining_date"]').on('changeDate', function () {
        employee_create_validation.revalidateField('joining_date');
    });
})
