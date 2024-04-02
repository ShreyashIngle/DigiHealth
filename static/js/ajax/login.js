$(document).ready(function () {
    $(document).on('submit', '#login', function (e) {
        e.preventDefault();
        login_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'login',
                    data: $('#login').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.success === 1){
                            window.location = '/dashboard';
                        }
                        else if(data.NotExist === 1) {
                            Swal.fire(
                                "Error",
                                "Invalid Credentials",
                                "error"
                            )
                        }
                    },
                });
            }
        })
    })
});