jQuery(document).ready(function () {
    $('#start_timepicker, #end_timepicker, #update_start_timepicker, #update_end_timepicker').timepicker({
        minuteStep: 1,
        defaultTime: '',
        showMeridian: false,
        disableMousewheel: true,
        showInputs: true,
    });
});