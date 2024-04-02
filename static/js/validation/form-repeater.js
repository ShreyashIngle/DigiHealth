$(document).ready(function () {
    $('#kt_repeater_3').repeater({
        show: function () {
            $(this).slideDown();
        },

        hide: function (deleteElement) {
            if (confirm('Are you sure you want to delete this element?')) {
                $(this).slideUp(deleteElement);
            }
        }
    });
});