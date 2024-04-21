let appointment_form = document.getElementById('update_appointment');
let appointment_update_validation;
document.addEventListener('DOMContentLoaded', function (e) {
    appointment_update_validation = FormValidation.formValidation(appointment_form, {
            fields: {
                update_patient: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_doctor: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_appointment_date: {
                    validators: {
                        notEmpty: {
                            message: 'Appointment date is required'
                        },
                    }
                },

                update_time_slot: {
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
    );

    $('[name="update_appointment_date"]').on('changeDate', function () {
        // Revalidate the date field
        appointment_update_validation.revalidateField('update_appointment_date');
    });
});

