const global_form = document.getElementById('global_settings');
let global_settings_validation;
document.addEventListener('DOMContentLoaded', function () {
    global_settings_validation = FormValidation.formValidation(global_form, {
        fields: {

            hospital_name: {
                validators: {
                    notEmpty: {
                        message: 'Hospital name is required'
                    }
                }
            },

            visible: {
                validators: {
                    notEmpty: {
                        message: 'Visible name is required'
                    },
                    stringLength: {
                        max: 10,
                        message: 'The full name must be less than 10 characters'
                    },
                }
            },

            contact: {
                validators: {
                    notEmpty: {
                        message: 'Indian phone number is required'
                    },
                    regexp: {
                        regexp: /^(\+)?(91)?[6789]\d{9}$/,
                        message: 'The value can only consist phone number'
                    },
                }
            },

            email: {
                validators: {
                    notEmpty: {
                        message: 'Patient email is required'
                    },
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    }
                }
            },

            address: {
                validators: {
                    notEmpty: {
                        message: 'Address is required'
                    }
                }
            },

        },
        plugins: { //Learn more: https://formvalidation.io/guide/plugins
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap(),
        }
    })
});