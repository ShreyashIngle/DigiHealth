// Class definition

var KTBootstrapDaterangepicker = function () {

    // Private functions
    var demos = function () {
        // // minimum setup
        // $('#kt_daterangepicker_1, #kt_daterangepicker_1_modal').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary'
        // });

        // // input group and left alignment setup
        // $('#kt_daterangepicker_2').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary'
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_2 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        // });

        //  $('#kt_daterangepicker_2_modal').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary'
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_2 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        // });

        // // left alignment setup
        // $('#kt_daterangepicker_3').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary'
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_3 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        // });

        // $('#kt_daterangepicker_3_modal').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary'
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_3 .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
        // });


        // // date & time
        // $('#kt_daterangepicker_4').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary',

        //     timePicker: true,
        //     timePickerIncrement: 30,
        //     locale: {
        //         format: 'MM/DD/YYYY h:mm A'
        //     }
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_4 .form-control').val( start.format('MM/DD/YYYY h:mm A') + ' / ' + end.format('MM/DD/YYYY h:mm A'));
        // });

        // // date picker
        // $('#kt_daterangepicker_5').daterangepicker({
        //     buttonClasses: ' btn',
        //     applyClass: 'btn-primary',
        //     cancelClass: 'btn-secondary',

        //     singleDatePicker: true,
        //     showDropdowns: true,
        //     locale: {
        //         format: 'MM/DD/YYYY'
        //     }
        // }, function(start, end, label) {
        //     $('#kt_daterangepicker_5 .form-control').val( start.format('MM/DD/YYYY') + ' / ' + end.format('MM/DD/YYYY'));
        // });

        // predefined ranges
        var start = new Date();
        var end = new Date();

        $('#filter_appointement_date').daterangepicker({
            buttonClasses: ' btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary',
            opens: 'left',
            
            startDate: start,
            endDate: end,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            locale: {
                format: 'YYYY/MM/DD',
            },
        }, function(start, end) {
            $('#filter_appointement_date .form-control').val(start+ ' - ' + end);
        });
    }

    // var validationDemos = function() {
    //     // input group and left alignment setup
    //     $('#kt_daterangepicker_1_validate').daterangepicker({
    //         buttonClasses: ' btn',
    //         applyClass: 'btn-primary',
    //         cancelClass: 'btn-secondary'
    //     }, function(start, end, label) {
    //         $('#kt_daterangepicker_1_validate .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
    //     });

    //     // input group and left alignment setup
    //     $('#kt_daterangepicker_2_validate').daterangepicker({
    //         buttonClasses: ' btn',
    //         applyClass: 'btn-primary',
    //         cancelClass: 'btn-secondary'
    //     }, function(start, end, label) {
    //         $('#kt_daterangepicker_3_validate .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
    //     });

    //     // input group and left alignment setup
    //     $('#kt_daterangepicker_3_validate').daterangepicker({
    //         buttonClasses: ' btn',
    //         applyClass: 'btn-primary',
    //         cancelClass: 'btn-secondary'
    //     }, function(start, end, label) {
    //         $('#kt_daterangepicker_3_validate .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
    //     });
    // }

    return {
        // public functions
        init: function() {
            demos();
            // validationDemos();
        }
    };
}();

jQuery(document).ready(function() {
    KTBootstrapDaterangepicker.init();
});
