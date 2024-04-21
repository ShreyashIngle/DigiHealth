const api_settings_form = document.getElementById('api_settings');
let api_settings_validation;
document.addEventListener('DOMContentLoaded', function () {
    api_settings_validation = FormValidation.formValidation(api_settings_form, {
        fields: {
            map_api: {
                validators: {
                    notEmpty: {
                        message: 'Api is required'
                    }
                }
            },

            title: {
                validators: {
                    notEmpty: {
                        message: 'Title is required'
                    }
                }
            },

            latitude: {
                validators: {
                    notEmpty: {
                        message: 'Latitude is required'
                    },
                    numeric: {
                        message: 'The value is not an numeric',
                        decimalSeparator: '.'
                    }
                }
            },

            longitude: {
                validators: {
                    notEmpty: {
                        message: 'Longitude is required'
                    },
                    numeric: {
                        message: 'The value is not an numeric',
                        decimalSeparator: '.'
                    }
                }
            },

            message: {
                validators: {
                    notEmpty: {
                        message: 'Message is required'
                    },
                }
            },

            calendar_api: {
                validators: {
                    notEmpty: {
                        message: 'Api is required'
                    }
                }
            },

        },
        plugins: { //Learn more: https://formvalidation.io/guide/plugins
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap(),
        }
    });
    api_settings_validation.validate();
});