let appointment_form = document.getElementById('appointment');
let appointment_create_validation;
document.addEventListener('DOMContentLoaded', function (e) {
    appointment_create_validation = FormValidation.formValidation(appointment_form, {
            fields: {
                patient: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                doctor: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                appointment_date: {
                    validators: {
                        notEmpty: {
                            message: 'Appointment date is required'
                        },
                    }
                },

                time_slot: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },
            },

            plugins: { //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap()
            }
        }
    )

    $('[name="appointment_date"]').on('changeDate', function () {
        // Revalidate the date field
        appointment_create_validation.revalidateField('appointment_date');
    });
});

