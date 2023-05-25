var device_id = null;
var tblmlff_sec = $('#tblmlff_sec').DataTable({
    "lengthChange": false,
    order: [
        [1, 'desc']
    ],
    scrollX: true,
    "columnDefs": [
        { 'visible': false, 'targets': [0] },
        {
            targets: -1, 
            "defaultContent": '<button class="btnview btn btn-pure btn-primary icon md-view waves-effect waves-classic">Log</button>'
        },
    ]
});

// Select Object
$("#sel_device").select2();
axios.get(`${window.burl}/devtools/js/sel_device`).then(rr => {
    $("#sel_device").select2({
        data: rr.data.devices
    });
}).catch(err => {
    console.log(err);
});

$("#sel_device").on("change",function () {
    device_id = $('#sel_device').val();
});

// End Select Object