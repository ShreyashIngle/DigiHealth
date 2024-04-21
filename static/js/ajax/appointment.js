$(document).ready(function () {
// Insert Appointment Data
    $(document).on('submit', '#appointment', function (e) {
        e.preventDefault();
        appointment_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'add',
                    data: $('#appointment').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            KTUtil.scrollTop();
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)
                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Appointment Already Exist",
                                "error"
                            )
                        }
                    }
                });
            }
        })
    });

// Load TimeSlot
    $('#appointment_datepicker, #doctor_list').change(function (e) {
        e.preventDefault();

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let doctor_id = $('select[name=doctor]').val();
        let appointment_date = $('input[name=appointment_date]').val();
        let date = new Date(appointment_date);
        let weekday = days[date.getDay()];
        let csrf = $('input[name=csrfmiddlewaretoken]').val();
        let time = $('#timeslot').selectpicker();

        if (doctor_id !== '' && weekday !== '') {
            time.selectpicker({title: "Exploring...."}).selectpicker('render');
            info = {
                doctor_id: doctor_id,
                weekday: weekday,
                csrfmiddlewaretoken: csrf
            }

            $.ajax({
                type: 'POST',
                url: 'loadtimeslot',
                data: info,
                dataType: 'json',
                success: function (data) {
                    time.find('option').remove();
                    appointment_create_validation.updateFieldStatus('time_slot', 'NotValidated');
                    time.selectpicker('refresh');
                    appointment_create_validation.updateFieldStatus('time_slot', 'NotValidated');
                    $('input[name=fees]').val(data['fees']);

                    let start_time = data['start_time'];
                    let end_time = data['end_time'];

                    if (start_time && end_time) {
                        start_time = new Date(new Date().toDateString() + ' ' + start_time);
                        end_time = new Date(new Date().toDateString() + ' ' + end_time);

                        start_time = start_time.toLocaleTimeString().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");
                        end_time = end_time.toLocaleTimeString().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");

                        setTimeout(function () {
                            time.selectpicker({title: "Nothing Selected"}).selectpicker('render');
                            time.append("<option>" + start_time + " - " + end_time + "</option>");
                            appointment_create_validation.updateFieldStatus('time_slot', 'NotValidated');
                            time.selectpicker('refresh');
                            appointment_create_validation.updateFieldStatus('time_slot', 'NotValidated');
                        }, 500)
                    } else {
                        setTimeout(function () {
                            time.selectpicker({title: "No Schedule Found"}).selectpicker('render');
                        }, 500)
                    }
                }
            })
        }
    });

// Confirm Appointment
    $(document).on('click', '#confirm_appointment', function (e) {
        e.preventDefault();
        let appointment_id = $(this).attr('data-id');
        let csrf = $("input[name=csrfmiddlewaretoken]").val();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm it!",
            cancelButtonText: "No, cancel!"
        }).then(function (result) {
            if (result.value) {
                info = {appointment_id: appointment_id, csrfmiddlewaretoken: csrf}
                $.ajax({
                    type: 'POST',
                    url: 'confirm',
                    data: info,
                    dataType: 'json',
                    success: function (data) {
                        if (data.confirm === 1) {
                            Swal.fire({
                                title: "Confirmed!",
                                text: "Your Appointment Has Been Confirmed.",
                                icon: "success",
                                confirmButtonText: "Ok",
                            }).then(function (result) {
                                if (result.value) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        }
                    }
                });
            }
        });
    });

// Close Appointment
    $(document).on('click', '#close_appointment', function (e) {
        e.preventDefault();
        let appointment_id = $(this).attr('data-id');
        let csrf = $("input[name=csrfmiddlewaretoken]").val();
        Swal.fire({
            title: "Are you sure?",
            text: "You want to close this appointment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, close it!",
            cancelButtonText: "No, cancel!"
        }).then(function (result) {
            if (result.value) {
                info = {appointment_id: appointment_id, csrfmiddlewaretoken: csrf}
                $.ajax({
                    type: 'POST',
                    url: 'close',
                    data: info,
                    dataType: 'json',
                    success: function (data) {
                        if (data.close === 1) {
                            Swal.fire({
                                title: "Closed!",
                                text: "Your Appointment Has Been Closed.",
                                icon: "success",
                                confirmButtonText: "Ok",
                            }).then(function (result) {
                                if (result.value) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        }
                    }
                });
            }
        });
    });

// Delete Appointment
    $(document).on('click', '#delete_appointment', function (e) {
        e.preventDefault();
        let appointment_id = $(this).attr('data-id');
        let csrf = $("input[name=csrfmiddlewaretoken]").val();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(function (result) {
            if (result.value) {
                info = {appointment_id: appointment_id, csrfmiddlewaretoken: csrf}
                $.ajax({
                    type: 'POST',
                    url: 'delete',
                    data: info,
                    dataType: 'json',
                    success: function (data) {
                        if (data.delete === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Appointment Has Been Deleted.",
                                icon: "success",
                                confirmButtonText: "Ok",
                            }).then(function (result) {
                                if (result.value) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        }
                    }
                });
            }
        });
    });

//Load TimeSlot For Appointment Update
    $('#update_appointment_datepicker, #update_doctor_list').change(function (e) {
        e.preventDefault();

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let doctor_id = $('select[name=update_doctor]').val();
        let appointment_date = $('input[name=update_appointment_date]').val();
        let date = new Date(appointment_date);
        let weekday = days[date.getDay()];
        let csrf = $('input[name=csrfmiddlewaretoken]').val();
        let time = $('#update_timeslot').selectpicker();

        if (doctor_id !== '' && weekday !== '') {
            info = {
                doctor_id: doctor_id,
                weekday: weekday,
                csrfmiddlewaretoken: csrf
            }

            $.ajax({
                type: 'POST',
                url: 'loadtimeslot',
                data: info,
                dataType: 'json',
                success: function (data) {
                    time.find('option').remove();
                    appointment_update_validation.updateFieldStatus('update_time_slot', 'NotValidated');
                    time.selectpicker('refresh');
                    appointment_update_validation.updateFieldStatus('update_time_slot', 'NotValidated');

                    let start_time = data['start_time'];
                    let end_time = data['end_time'];

                    if (start_time && end_time) {
                        start_time = new Date(new Date().toDateString() + ' ' + start_time);
                        end_time = new Date(new Date().toDateString() + ' ' + end_time);

                        start_time = start_time.toLocaleTimeString().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");
                        end_time = end_time.toLocaleTimeString().replace(/([\d]+:[\d]+):[\d]+(\s\w+)/g, "$1$2");


                        time.selectpicker({title: "Nothing Selected"}).selectpicker('render');
                        time.append('<option value="' + start_time + " - " + end_time + '">' + start_time + " - " + end_time + '</option>');
                        // time.append("<option>" + start_time + " - " + end_time + "</option>");
                        appointment_update_validation.updateFieldStatus('update_time_slot', 'NotValidated');
                        time.selectpicker('refresh');
                        appointment_update_validation.updateFieldStatus('update_time_slot', 'NotValidated');

                    } else {

                        time.selectpicker({title: "No Schedule Found"}).selectpicker('render');

                    }
                }
            })
        }
    });


//Update Appointment Data
    $(document).on('click', '#appointment_update_button', function (e) {
        e.preventDefault();
        let currentrow = $(this).closest('tr');
        let data;

        if ($('#appointment').DataTable().row(this).child.isShown()) {
            data = $('#appointment').DataTable().row(this).data();
        } else {
            data = $('#appointment').DataTable().row(currentrow).data();
        }
        let appointment_id = data[0]
        let doctor_id = $(this).attr("data-did");
        let patient_id = $(this).attr("data-pid");
        let appointment_date = data[3]
        let fees = data[4]
        let timeslot = data[5]
        let status = $(this).attr("data-status");

        $('input[name=appointment_id]').val(appointment_id);
        $('#patient').selectpicker('val', patient_id).selectpicker('render');
        $('#update_doctor_list').selectpicker('val', doctor_id).selectpicker('render');
        $('#update_appointment_datepicker').datepicker('setDate', appointment_date);
        $('input[name=update_fees]').val(fees);
        $('#status').selectpicker('val', status).selectpicker('render');

        appointment_update_validation.validate().then(function (status) {
            if (status === 'Invalid') {
                $('#update_pending_appointment_modal').modal('show');
                setTimeout(function () {
                    console.log("Got it");
                    $('#update_timeslot').selectpicker('val', timeslot).selectpicker('render');
                }, 200)
                return false;
            }
        })
    });

    $(document).on('submit', '#update_appointment', function (e) {
        e.preventDefault();
        appointment_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'update',
                    data: $('#update_appointment').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            $('#update_pending_appointment_modal').modal('hide');
                            sessionStorage.setItem("update", "true");
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)
                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Appointment Already Exist",
                                "error"
                            )
                        }
                    }
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
        }, 800)
    }
});
