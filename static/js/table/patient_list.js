jQuery(document).ready(function () {
    var table = $('#patient').DataTable({

        searching: true,

        responsive: true,

        lengthMenu: [5, 10, 25, 50],

        pageLength: 5,

        language: {
            'lengthMenu': 'Display _MENU_',
        },

        ordering: false,

        columnDefs: [
            {
                "targets": [5, 9, 10, 11, 12, 13],
                "visible": false,
                "searchable": false
            },
        ],

        buttons: [
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13]
                },
                title: 'Patient List'
            },

            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13]
                },
                orientation: 'landscape',
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
                        alignment: 'center',
                    }
                    doc.defaultStyle.alignment = 'center';
                },
                title: 'Patient List'
            },

            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13]
                },
                title: 'Patient List'
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
});
