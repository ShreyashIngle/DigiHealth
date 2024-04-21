$(document).ready(function () {
//Insert Patient Data
    $(document).on('submit', '#api_settings', function (e) {
        e.preventDefault();
        api_settings_validation.validate().then(function (status) {
            console.log("Clicked");
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'api',
                    data: $('#api_settings').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            sessionStorage.setItem("update", "true");
                            KTUtil.scrollTop(0, 1000);

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
        }, 800)
    }
    api_settings_validation.validate();
});