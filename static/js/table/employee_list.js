let admin_table, doctor_table, receptionist_table;
jQuery(document).ready(function () {
// Admin Table
    admin_table = $("#admin").DataTable({

        searching: true,

        responsive: true,

        bDeferRender: true,


        lengthMenu: [5, 10, 25, 50],

        pageLength: 5,

        language: {
            'lengthMenu': 'Display _MENU_',
        },

        ordering: false,

        buttons: [
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                title: 'Admin List',
            },

            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                title: 'Admin List',
                customize: function (doc) {
                    doc.styles.title = {
                        fontSize: '35',
                        alignment: 'center',
                    }
                    doc.styles.tableHeader = {
                        fillColor: '#2D4154',
                        color: 'white',
                        fontSize: '12',
                        bold: 2,
                        alignment: 'center'
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                }
            },

            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                title: 'Admin List',
            },
        ],

        columnDefs: [
            {
                "targets": [8, 9, 10, 11, 12],
                "visible": false,
                "searchable": false
            },
        ],
    });

// Doctor Table
    doctor_table = $("#doctor").DataTable({

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
                columns: [0, 2, 3, 4, 5, 6, 7]
            },
            title: 'Doctor List',
        },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                },
                title: 'Doctor List',
                customize: function (doc) {
                    doc.styles.title = {
                        fontSize: '35',
                        alignment: 'center',
                    }
                    doc.styles.tableHeader = {
                        fillColor: '#2D4154',
                        color: 'white',
                        fontSize: '12',
                        bold: 2,
                        alignment: 'center'
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                }
            },

            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                },
                title: 'Doctor List',
            },
        ],
        columnDefs: [
            {
                "targets": [8, 9, 10, 11, 12],
                "visible": false,
                "searchable": false
            },
        ],
    });

// Receptionist Table
    receptionist_table = $("#receptionist").DataTable({

        searching: true,

        responsive: true,

        lengthMenu: [5, 10, 25, 50],

        pageLength: 5,

        language: {
            'lengthMenu': 'Display _MENU_',
        },

        ordering: false,

        buttons: [
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                },
                title: 'Receptionist List',
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                },
                title: 'Receptionist List',
                customize: function (doc) {
                    doc.styles.title = {
                        fontSize: '35',
                        alignment: 'center',
                    }
                    doc.styles.tableHeader = {
                        fillColor: '#2D4154',
                        color: 'white',
                        fontSize: '12',
                        bold: 2,
                        alignment: 'center'
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                    doc.styles.table = {
                        widths: 'auto',
                    }
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 2, 3, 4, 5, 6, 7]
                },
                title: 'Receptionist List',
            },
        ],

        columnDefs: [
            {
                "targets": [8, 9, 10, 11, 12],
                "visible": false,
                "searchable": false
            },
        ],
    });

});
