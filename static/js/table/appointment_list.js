let table;

$(document).ready(function () {
    table = $("#appointment").DataTable({

        searching: true,

        responsive: true,

        lengthMenu: [5, 10, 25, 50],

        pageLength: 5,

        language: {
            'lengthMenu': 'Display _MENU_',
        },

        ordering: false,

        buttons: [{
            extend: 'print',
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6]
            }
        },

            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                },
                customize: function (doc) {
                    doc.styles.title = {
                        fontSize: '35',
                        alignment: 'center'
                    }
                    doc.styles.tableHeader = {
                        fillColor: '#2D4154',
                        color: 'white',
                        fontSize: '12',
                        bold: 2,
                        alignment: 'center'
                    },
                        doc.defaultStyle.alignment = 'center';
                }
            },

            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },
        ],

        columnDefs: [
            {
                "targets": 4,
                "visible": false,
                "searchable": false
            },
        ],
    });
    $('#export_print').on('click', function (e) {
        e.preventDefault();
        table.button(0).trigger();
    });

    $('#export_pdf').on('click', function (e) {
        e.preventDefault();
        table.button(1).trigger();
    });

    $('#export_excel').on('click', function (e) {
        e.preventDefault();
        table.button(2).trigger();
    });

    $(document).on('submit', '#filter_app', function (e) {
        e.preventDefault();
        table.draw();
    });
    $(document).on('click', '#reset_table', function () {
        location.reload();
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            let start_date = $('#filter_appointement_date').data('daterangepicker').startDate;
            let end_date = $('#filter_appointement_date').data('daterangepicker').endDate;

            start_date = start_date.format('YYYY-MM-DD');
            end_date = end_date.format('YYYY-MM-DD');

            let position = data[3];
            if (start_date <= position && position <= end_date) {
                return true;
            }
            if (start_date > end_date) {
                return false;
            }
            return false;

        }
    );
});


