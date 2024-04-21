$(document).ready(function () {
// Insert Schedule
    $(document).on('submit', '#schedule', function (e) {
        e.preventDefault();
        schedule_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'add',
                    data: $('#schedule').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            KTUtil.scrollTop(0, 1000);
                            setTimeout(function () {
                                window.location.reload();
                            }, 500)
                        }
                        if (data.exist === 1) {
                            Swal.fire(
                                'Error',
                                 data.day + ' Schedule Already Exist',
                                'error'
                            )
                        }
                    }
                })
            }
        })
    });

// Delete Schedule
    $(document).on('click', '#schedule_delete_button', function () {

        let id = $(this).attr("data-id");
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
                info = {schedule_id: id, csrfmiddlewaretoken: csrf}
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

// Update Schedule
    $(document).on('click', '#schedule_update_button', function (e) {
        e.preventDefault();
        let currentrow = $(this).closest('tr');
        let data;

        if ($('#schedule').DataTable().row(this).child.isShown()) {
            data = $('#schedule').DataTable().row(this).data();
        } else {
            data = $('#schedule').DataTable().row(currentrow).data();
        }
        let schedule_id = data[0]
        let doctor_id = data[1]
        let fees = data[3]
        let weekday = data[4]
        let start_time = data[5]
        let end_time = data[6]

        start_time = convertTime12to24(start_time)
        end_time = convertTime12to24(end_time)

        $('input[name=schedule_id]').val(schedule_id);
        $('#doctor_list').selectpicker('val', doctor_id).selectpicker('render');
        $('input[name=update_fees]').val(fees);
        $('#weekday').selectpicker('val', weekday).selectpicker('render');
        $('#update_start_timepicker').timepicker('setTime', start_time);
        $('#update_end_timepicker').timepicker('setTime', end_time);


        schedule_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $('#update_schedule_modal').modal('show');
                return false;
            }
        })

    });

    $(document).on('submit', '#update_schedule', function (e) {
        e.preventDefault();
        schedule_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'update',
                    data: $('#update_schedule').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            $('#category-modal').modal('hide');
                            sessionStorage.setItem("update", "true");
                            location.reload();
                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Schedule Already Exist",
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
    const convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        hours = hours.toString();
        minutes = minutes.toString();

        return `${hours}:${minutes}`;
    }
})