$(document).ready(function () {
//Insert Patient Category
    $(document).on('submit', '#create_category', function (e) {
        e.preventDefault();
        category_create_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'category',
                    data: $('#create_category').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.insert === 1) {
                            sessionStorage.setItem("insert", "true");
                            window.location.reload();
                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Category Already Exist",
                                "error"
                            )
                        }
                    }
                });
            }
        })
    });

//Delete Patient Category
    $(document).on('click', '#delete_category', function () {
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
            if (result.value) {
                info = {category_id: id, csrfmiddlewaretoken: csrf}
                $.ajax({
                    url: 'delete_category',
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
                Swal.fire({
                    title: "Cancelled",
                    text: "Your Record is safe",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            }
        });
    });

//Update Patient Category
    $(document).on('click', '#category-edit', function (e) {
        e.preventDefault();
        let $this = $(this);
        let category_id = $this.parents("tr").find('td').eq(0).text();
        let category_name = $this.parents("tr").find('td').eq(1).text();
        $("input[name=id]").val(category_id);
        $("input[name=update_category]").val(category_name);

        category_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $('#category-modal').modal('show');
                return false;
            }
        })
    });

    $(document).on('submit', '#update_category', function (e) {
        e.preventDefault();
        category_update_validation.validate().then(function (status) {
            if (status === 'Valid') {
                $.ajax({
                    type: 'POST',
                    url: 'update_category',
                    data: $('#update_category').serialize(),
                    dataType: 'json',
                    success: function (data) {
                        if (data.update === 1) {
                            $('#category-modal').modal('hide');
                            sessionStorage.setItem("update", "true");
                            setTimeout(function (){
                                window.location.reload();
                            }, 500)
                        } else if (data.exist === 1) {
                            Swal.fire(
                                "Error",
                                "Category Already Exist",
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