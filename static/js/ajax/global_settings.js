$(document).ready(function () {
//Insert Patient Data
    $(document).on('submit', '#global_settings', function (e) {
        e.preventDefault();
        global_settings_validation.validate().then(function (status) {
            console.log("Clicked");
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'settings',
                    data: $('#global_settings').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            sessionStorage.setItem("update", "true");
                            KTUtil.scrollTop(0,1000);

                            setTimeout(function () {
                                window.location.reload();
                            }, 500)
                        }
                    }
                });
            }
        })
    });

    if (sessionStorage.getItem("update")) {
        setTimeout(function () {
            $.notify("Information Updated SuccessFully");
            sessionStorage.clear();
        }, 800)
    }
    global_settings_validation.validate();
});