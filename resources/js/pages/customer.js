const url = window.burl;

$('#formCustomer').submit(
    function (e) {
        e.preventDefault();
        var backurl = $("input[name=_backurl]").val(), _id = $("input[name=_id]").val(),_isEdit = $("input[name=_isEdit]").val();
        var fd = new FormData();
        fd.append('_id', _id);
        fd.append('_token', $("input[name=_token]").val());
        fd.append('selstatus', $("select[name=selstatus]").val());
        fd.append('txtemail', $("input[name=txtemail]").val());
        fd.append('txtfirstname', $("input[name=txtfirstname]").val());
        fd.append('txtlastname', $("input[name=txtlastname]").val());
        fd.append('txttelephone', $("input[name=txttelephone]").val());
        fd.append('txtaddress', $("textarea[name=txtaddress]").val());
        fd.append('txtpassword', $("input[name=txtpassword]").val());
        fd.append('_isEdit', _isEdit);
        $.ajax({
            type: 'POST'
            , url: url + '/customer/js/addedit'
            , data: fd
            , dataType: 'json'
            , contentType: false
            , cache: false
            , processData: false
            , beforeSend: function () {
                $('#formCustomer').css("opacity", ".5");
            }
            , success: function (res) {
                console.log(res)
                $('#formCustomer').css("opacity", "");
                var r = res.msg;
                if (r.code === 200) {
                    // toastr.success(res.msg.obj, 'Success');
                    swal({
                        title: "Success",
                        text: "Continue editing?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Yes, continue editing!",
                        cancelButtonText: "No, take me back!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                window.location.href = url + '/customer/d/' + _id;
                            } else {
                                // swal("Cancelled", "Your imaginary file is safe :)", "error");
                                window.location.href = backurl;
                            }
                        });

                } else {
                    toastr.error(res.msg.obj, 'Error');
                }
            }
        });
    }
);