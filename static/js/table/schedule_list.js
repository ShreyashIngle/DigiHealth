$(document).ready(function () {
    var table = $("#schedule").DataTable({

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
                    columns: [0, 1, 2, 3, 4, 5]
                },
                customize: function (doc) {
                    doc.styles.title = {
                        fontSize: '35',
                        alignment: 'center'
                    },
                        doc.styles.tableHeader = {
                            fillColor: '#2D4154',
                            color: 'white',
                            fontSize: '12',
                            bold: 2,
                            alignment: 'center'
                        }
                    doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    doc.defaultStyle.alignment = 'center';
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
        ],
        columnDefs: [
            {
                "targets": [1],
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
});


