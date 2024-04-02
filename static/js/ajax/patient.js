$(document).ready(function () {
//Insert Patient Data
    $(document).on('submit', '#patient', function (e) {
        e.preventDefault();
        patient_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'add',
                    data: $("#patient").serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            KTUtil.scrollTop();
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)

                        } else if (data.exist_email === 1) {
                            Swal.fire(
                                "Error",
                                "Email already exist",
                                "error"
                            )
                        } else if (data.exist_username === 1) {
                            Swal.fire(
                                "Error",
                                "Username not available",
                                "error"
                            )
                        }
                    },
                });
            }
        })
    });

// Delete Patient Data
    $(".table").on('click', '#patient_delete', function () {

        let id = $(this).attr("data-info");
        let csrf = $("input[name=csrfmiddlewaretoken]").val();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!"
        }).then(function (result) {
            let info;
            if (result.value) {
                info = {patient_id: id, csrfmiddlewaretoken: csrf}
                $.ajax({
                    url: 'delete',
                    type: 'POST',
                    data: info,
                    dataType: 'json',
                    success: function (data) {
                        if (data.delete === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your information has been deleted.",
                                icon: "success",
                                confirmButtonText: "Ok",
                            }).then(function (result) {
                                if (result.value) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        } else if (data.delete === 0) {
                            Swal.fire(
                                "Cancelled",
                                "Your Record is safe",
                                "error"
                            )
                        }
                    }
                });
            } else if (result.dismiss === "cancel") {
                Swal.fire(
                    "Cancelled",
                    "Your Record is safe",
                    "error"
                )
            }
        });
    });

// Show All Patient Details
    $(document).on('click', '#show_patient_details', function (e) {
        e.preventDefault();
        let currentrow = $(this).closest('tr');
        let data;

        if ($('#patient').DataTable().row(this).child.isShown()) {
            data = $('#patient').DataTable().row(this).data();
        } else {
            data = $('#patient').DataTable().row(currentrow).data();
        }

        $('#id').text(data[0]);
        $('#name').text(data[1]);
        $('#gender').text(data[2]);
        $('#birthdate').text(data[3]);
        $('#age').text(data[4]);
        $('#marital_status').text(data[5]);
        $('#mobile_no').text(data[6]);
        $('#email').text(data[7]);
        $('#cat').text(data[8]);
        $('#blood_group').text(data[9]);
        $('#blood_pressure').text(data[10]);
        $('#height').text(data[11]);
        $('#weight').text(data[12]);
        $('#address').text(data[13]);

        $('#patient_view_modal').modal('show');

        return false;
    });

// Update Patient Data
    $(document).on('click', '#patient_update_button', function () {
        let patient_id = $(this).attr("data-id");
        window.location = "edit/" + patient_id;
    });

    $(document).on('submit', '#update_patient', function (e) {
        e.preventDefault();
        let patient_id = $('input[name=id]').val();
        patient_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'update/' + patient_id,
                    data: $("#update_patient").serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            sessionStorage.setItem("update", "true");
                            KTUtil.scrollTop(0, 100);
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)

                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Username Not Available",
                                "error"
                            )
                        }
                    },
                });
            }
        })
    });

    if (sessionStorage.getItem("insert")) {
        setTimeout(function () {
            $.notify("Information Saved SuccessFully");
            sessionStorage.clear();
        }, 800)
    }

    if (sessionStorage.getItem("update")) {
        setTimeout(function () {
            $.notify("Information Updated SuccessFully");
            sessionStorage.clear();
            setTimeout(function () {
                window.location.href = '/patient/view';
            }, 1500)
        }, 800)
    }
});
