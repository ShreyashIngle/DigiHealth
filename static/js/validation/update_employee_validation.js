let update_employee_form = document.getElementById('update_employee');
let update_employee_validation;
$(document).ready(function () {
    update_employee_validation = FormValidation.formValidation(update_employee_form, {
            fields: {
                update_name: {
                    validators: {
                        notEmpty: {
                            message: 'Employee name is required'
                        }
                    }
                },

                update_gender: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_mobile_no: {
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

                update_email: {
                    validators: {
                        notEmpty: {
                            message: 'Employee email is required'
                        },
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        }
                    }
                },

                update_role: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_designation: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_joining_date: {
                    validators: {
                        notEmpty: {
                            message: 'Joining date is required'
                        }
                    }
                },
            },

            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
            }
        }
    );
    $('[name="update_joining_date"]').on('changeDate', function () {
        update_employee_validation.revalidateField('update_joining_date');
    });
    update_employee_validation.validate();
});

