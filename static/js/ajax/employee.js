$(document).ready(function () {
// Insert Patient Data
    $(document).on('submit', '#employee', function (e) {
        e.preventDefault();
        employee_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'add',
                    data: $("#employee").serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            KTUtil.scrollTop(0, 10);
                            setTimeout(function () {
                                location.reload();
                            }, 500)

                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Username Not Available",
                                "error"
                            )
                        }
                    }
                });
            }
        })
    });

// Delete Patient Data
    $(document).on('click', '#admin_delete, #doctor_delete, #receptionist_delete', function () {

        let id = $(this).attr("data-eid");
        let role = $(this).attr("data-role");
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
                info = {employee_id: id, role: role, csrfmiddlewaretoken: csrf}
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
                            Swal.fire({
                                title: "Error",
                                text: "Admin cannot be deleted",
                                icon: "error",
                                confirmButtonText: "Ok",
                            })
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

// Update Patient Data
    $(document).on('click', '#admin_update_button, #doctor_update_button, #receptionist_update_button', function (e) {
        let employee_id = $(this).attr("data-id");
        window.location.href = "edit/" + employee_id;
    });

    $(document).on('submit', '#update_employee', function (e) {
        e.preventDefault();
        let employee_id = $('input[name=employee_id]').val()
        update_employee_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'update/' + employee_id,
                    data: $("#update_employee").serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            sessionStorage.setItem("update", "true");
                            KTUtil.scrollTop(0, 50);
                            setTimeout(function () {
                                location.reload();
                            }, 500)

                        }
                    }
                });
            }
        })
    });

// Show All Patient Details
    $(document).on('click', '#show_admin_details', function (e) {
        e.preventDefault();
        let currentrow = $(this).closest('tr');
        let data;

        if ($('#admin').DataTable().row(this).child.isShown()) {
            data = $('#admin').DataTable().row(this).data();
        } else {
            data = $('#admin').DataTable().row($(this).parents("tr")).data();
        }

        $('#eid').text(data[0]);
        $('#name').text(data[1]);
        $('#gender').text(data[2]);
        $('#birthdate').text(data[3]);
        $('#email').text(data[4]);
        $('#mobile_no').text(data[5]);
        $('#designation').text(data[6]);
        $('#designation2').text(data[6]);
        $('#role').text(data[7]);
        $('#blood_group').text(data[8]);
        $('#marital_status').text(data[9]);
        $('#address').text(data[10]);
        $('#joining_date').text(data[11]);
        $('#qualification').text(data[12]);

        $('#employee_view_modal').modal('show');

        return false;
    });

    $(document).on('click', '#show_doctor_details', function (e) {
        e.preventDefault();

        let data;
        if ($('#doctor').DataTable().row(this).child.isShown()) {
            data = $('#doctor').DataTable().row(this).data();
        } else {
            data = $('#doctor').DataTable().row($(this).parents("tr")).data();
        }

        $('#eid').text(data[0]);
        $('#name').text(data[1]);
        $('#gender').text(data[2]);
        $('#birthdate').text(data[3]);
        $('#email').text(data[4]);
        $('#mobile_no').text(data[5]);
        $('#designation').text(data[6]);
        $('#designation2').text(data[6]);
        $('#role').text(data[7]);
        $('#blood_group').text(data[8]);
        $('#marital_status').text(data[9]);
        $('#address').text(data[10]);
        $('#joining_date').text(data[11]);
        $('#qualification').text(data[12]);

        $('#employee_view_modal').modal('show');

        return false;
    });

    $(document).on('click', '#show_receptionist_details', function (e) {
        e.preventDefault();

        let data;
        if ($('#receptionist').DataTable().row(this).child.isShown()) {
            data = $('#receptionist').DataTable().row(this).data();
        } else {
            data = $('#receptionist').DataTable().row($(this).parents("tr")).data();
        }

        $('#eid').text(data[0]);
        $('#name').text(data[1]);
        $('#gender').text(data[2]);
        $('#birthdate').text(data[3]);
        $('#email').text(data[4]);
        $('#mobile_no').text(data[5]);
        $('#designation').text(data[6]);
        $('#designation2').text(data[6]);
        $('#role').text(data[7]);
        $('#blood_group').text(data[8]);
        $('#marital_status').text(data[9]);
        $('#address').text(data[10]);
        $('#joining_date').text(data[11]);
        $('#qualification').text(data[12]);

        $('#employee_view_modal').modal('show');

        return false;
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
                window.location.href = '/employee/view';
            }, 1500)
        }, 800)
    }
});
