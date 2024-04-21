const create_form = document.getElementById('create_category');
const update_form = document.getElementById('update_category');
let category_create_validation;
let category_update_validation;
$(document).ready(function () {
    category_create_validation = FormValidation.formValidation(create_form,
        {
            fields: {
                category: {
                    validators: {
                        notEmpty: {
                            message: 'Category name is required'
                        }
                    }
                }
            },

            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap()
            }
        }
    );

    category_update_validation = FormValidation.formValidation(update_form,
        {
            fields: {
                update_category: {
                    validators: {
                        notEmpty: {
                            message: 'Category name is required'
                        }
                    }
                }
            },

            plugins: { //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
            }
        }
    );
});


