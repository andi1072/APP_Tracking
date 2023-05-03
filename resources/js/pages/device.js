const url = window.burl;

$('#formDevice').submit(
    function (e) {
        e.preventDefault();
        saveDevice();
    }
);

var saveDevice = function () {
    var backurl = $("input[name=_backurl]").val(),did = $("input[name=txtdevice_id]").val();
    did = did.replace(" ","-");
    var fd = new FormData();
    fd.append('_id', $("input[name=_id]").val());
    fd.append('_token', $("input[name=_token]").val());
    fd.append('seltrackcategory', $("select[name=seltrackcategory]").val());
    fd.append('txtdevice_id', did);
    fd.append('txtdevicename', $("input[name=txtdevicename]").val());
    fd.append('txtassetid', $("input[name=txtassetid]").val());
    fd.append('txtassetname', $("input[name=txtassetname]").val());
    fd.append('txtassettype', $("input[name=txtassettype]").val());
    fd.append('txtcustomername', $("input[name=txtcustomername]").val());
    fd.append('txtassetdescription', $("textarea[name=txtassetdescription]").val());
    $.ajax({
        type: 'POST'
        , url: url + '/device/js/add'
        , data: fd
        , dataType: 'json'
        , contentType: false
        , cache: false
        , processData: false
        , beforeSend: function () {
            $('#formDevice').css("opacity", ".5");
        }
        , success: function (res) {
            $('#formDevice').css("opacity", "");
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
                            window.location.href = url + '/device/detail/' + did;
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