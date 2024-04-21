const patient_form = document.getElementById('patient');
let patient_create_validation;

$(document).ready(function () {
    patient_create_validation = FormValidation.formValidation(patient_form, {
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Patient name is required'
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

            age: {
                validators: {
                    notEmpty: {
                        message: 'Patient age is required'
                    }
                }
            },

            marital_status: {
                validators: {
                    notEmpty: {
                        message: 'Please select an option'
                    }
                }
            },

            phone: {
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

            category: {
                validators: {
                    notEmpty: {
                        message: 'Patient category is required'
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
                },

            },

            password: {
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

            retype_password: {
                validators: {
                    notEmpty: {
                        message: 'Please enter a password again'
                    },
                    identical: {
                        compare: function () {
                            return patient_form.querySelector('[name="password"]').value;
                        },
                        message: "Password doesn't match"
                    }
                },
            },
        },
        plugins: { //Learn more: https://formvalidation.io/guide/plugins
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap(),
        }
    })
});