$(document).ready(function () {
    // Insert Prescription Data
    $(document).on('submit', '#prescription', function (e) {
        e.preventDefault();
        prescription_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'add', // Update the URL to match your backend endpoint
                    data: $('#prescription').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            KTUtil.scrollTop();
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)
                        }
                    }
                });
            }
        })
    });



    $(document).on('click', '#show_prescription_details', function (e) {
        e.preventDefault();
        let currentrow = $(this).closest('tr');
        let data;
    
        if ($('#prescription').DataTable().row(this).child.isShown()) {
            data = $('#prescription').DataTable().row(this).data();
        } else {
            data = $('#prescription').DataTable().row(currentrow).data();
        }
    
        $('#id').text(data[0]);
        $('#date').text(data[3]); 
        $('#doctor_name').text(data[1]); 
        $('#patient_name').text(data[2]);
        $('#medicine_name').text(data[4]); 
        $('#morning_dosage').text(data[5]); 
        $('#afternoon_dosage').text(data[6]); 
        $('#night_dosage').text(data[7]); 
        $('#remarks').text(data[8]);
    
        $('#prescription_view_modal').modal('show');
    
        return false;
    });

    if (sessionStorage.getItem("insert")) {
        setTimeout(function () {
            $.notify("Prescription added successfully");
            sessionStorage.clear();
        }, 800);
    }
});
