import swal from 'sweetalert'
var _customer_id = '';
$('#formDevice').submit(
    function (e) {
        e.preventDefault();
        saveDevice();
    }
);

var saveDevice = function () {
    var backurl = $("input[name=_backurl]").val(),did = $("input[name=txtdevice_id]").val();
    did = did.replace(" ","-");
    if (_customer_id === '') {
        toastr.warning("Customer required.", 'Warning');
        return null;
    }
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
    fd.append('selcustomer_id', _customer_id);
    $.ajax({
        type: 'POST'
        , url: window.burl + '/device/js/add'
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
                    buttons: ["No, take me back!", "Yes, continue editing!!"],
                }).then((isConfirm) => {
                    if (isConfirm) {
                        window.location.href = window.burl + '/device/detail/' + did;
                    } else {
                        window.location.href = backurl;
                    }
                });

            } else {
                toastr.error(res.msg.obj, 'Error');
            }
        }
    });
}

$("#sel_user").select2();
axios.get(`${window.burl}/info/js/user_select`).then(rr => {
    $("#sel_user").select2({
        data: rr.data.dataUser
    });
}).catch(err => {
    console.log(err);
});

$("#sel_user").on("change",function () {
    _customer_id = $('#sel_user').val();
});