let arrows;
let date = new Date();
let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
jQuery(document).ready(function () {
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    $('#patient_birthdate, #employee_birthdate').datepicker({
        rtl: KTUtil.isRTL(),
        orientation: "bottom left",
        todayHighlight: true,
        templates: arrows,
        autoclose: true,
        clearBtn: true,
        startView: 3,
        maxViewMode: 3,
        format: "yyyy-mm-dd",
    });

    $('#employee_joining_date').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: "linked",
        clearBtn: true,
        todayHighlight: true,
        autoclose: true,
        orientation: 'top left',
        templates: arrows,
        format: "yyyy-mm-dd",
    });

    $('#appointment_datepicker, #update_appointment_datepicker').datepicker({
        rtl: KTUtil.isRTL(),
        todayHighlight: true,
        autoclose: true,
        orientation: 'top right',
        templates: arrows,
        format: "yyyy-mm-dd",
    });
});