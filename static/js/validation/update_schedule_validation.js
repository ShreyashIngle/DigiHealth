let update_schedule_form = document.getElementById('update_schedule');
let schedule_update_validation;

$(document).ready(function () {
    schedule_update_validation = FormValidation.formValidation(update_schedule_form,
        {
            fields: {
                update_doctor: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_fees: {
                    validators: {
                        notEmpty: {
                            message: 'Consultation Fees is required'
                        }
                    }
                },

                update_weekday: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_start_time: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },

                update_end_time: {
                    validators: {
                        notEmpty: {
                            message: 'Please select an option'
                        }
                    }
                },
            },

            plugins: { //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
            }
        }
    );
})
