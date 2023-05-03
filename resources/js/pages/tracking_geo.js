const url = window.burl;
const device_id = $("input[name=_id]").val();
var tblgeolist = $('#tblgeolist').DataTable({
    "lengthChange": false,
    order: [
        [0, 'desc']
    ],
    scrollX: true,
});
{/* <th>Date</th>
<th>Geofence Name</th>
<th>Geofence Address</th>
<th>Declaration</th> */}
// created_at
// fngeo_declare
// fngeo_id
// fnstatus
// fntype
// ftaddress
// ftdevice_id
// ftgeo_name
// fddeclaration_exit
// ftduration
{/* <th>Entry Date Time</th>
<th>Exit Date Time</th>
<th>Geofence Name</th>
<th>Address</th>
<th>Status</th>
<th>Duration</th> */}

$.get(url + `/tracking/detail/js/geo/${device_id}`, function(res) {
    $.each(res.geoData.data, function(k, v) {
        var _dtexit = '-',_duration = '-';
        if (v.fddeclaration_exit) {
            _dtexit = window.dtHumanParse(v.fddeclaration_exit);
            _duration = v.ftduration;
        }
        tblgeolist.row.add([
            window.dtHumanParse(v.created_at),_dtexit, v.ftgeo_name ,v.ftaddress,v.fngeo_declare ? '<span class="badge badge-success">Entry</span>':'<span class="badge badge-danger">Exit</span>',_duration
        ]).draw(true);
    });
});