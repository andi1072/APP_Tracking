const geoid = $("input[name=_id]").val();

var layerTmp = null, geoTmp = [], osmUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    osm = L.tileLayer(osmUrl, { minZoom: 5 }),
    map = new L.Map('objmap', {
        center: new L.LatLng(0.339951, 120.373368),
        zoom: 5, attributionControl: false,
        fullscreenControl: true,
    }),drawnItems = L.featureGroup().addTo(map), _resPolygon = {}, isEdit = 0, sio = window.sio;
L.Control.geocoder().addTo(map);

L.control.layers({
    'osm': osm.addTo(map),
    "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: 'google'
    })
}).addTo(map);
// self.Polygon = null;
// self.Circle = null;
var _tmpMarker = null;
map.on('click',function(e){
    var lat = e.latlng.lat,
    lon = e.latlng.lng;
    if (_tmpMarker) {
        map.removeLayer(_tmpMarker);
    }
    _tmpMarker = window._newMarker({lat: lat,lng: lon}, {
        icon : L.icon({
            iconUrl: window.gateUrl,
            iconSize:     [30, 30],
            iconAnchor:   [8, 25],
            popupAnchor:  [0, -20]
        })
    }).addTo(map);
    console.log(_tmpMarker._latlng.lat)
})

$('#formGeo').submit(
    function (e) {
        e.preventDefault();
        var _section = $("input[name=sel_toll_section]").val(),
        _gatename = $("input[name=txtgatename]").val();

        if (!_section) {
            toastr.error("Toll Section REQUIRED!", 'Error');
            return null;
        }else if(!_tmpMarker) {
            toastr.error("Please click on map!", 'Error');
            return null;
        }else if(!_gatename) {
            toastr.error("Gate Name REQUIRED!", 'Error');
            return null;
        }

        var fd = new FormData();
        fd.append('_token', $("input[name=_token]").val());
        fd.append('txtsection', _section);
        fd.append('txtgatename', _gatename);
        fd.append('lat', _tmpMarker._latlng.lat);
        fd.append('lon', _tmpMarker._latlng.lng);
        fd.append('_isEdit', isEdit);
        
        $.ajax({
            type: 'POST'
            , url: window.burl + '/gate/add/js'
            , data: fd
            , dataType: 'json'
            , contentType: false
            , cache: false
            , processData: false
            , beforeSend: function () {
                $('#formGeo').css("opacity", ".5");
            }
            , success: function (res) {
                $('#formGeo').css("opacity", "");
                var r = res.msg;
                if (r.code === 200) {
                    swal({
                        title: "Success",
                        text: "Continue add Declaration?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Yes!",
                        cancelButtonText: "No, keep in here!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },function (isConfirm) {
                        if (isConfirm) {
                            window.location.href = window.burl + '/geomlff/add';
                        } else {
                            // window.location.href = window.burl + '/geomlff/list';
                            window.location.reload();
                        }
                    });
                    
                } else {
                    console.log(res)
                    toastr.error(res.msg, 'Error');
                }
            }
        });
    }
);

$("#sel_toll_section").select2();
axios.get(window.burl + `/geomlff/gatepoint/section/js`).then(rr => {
    $("#sel_toll_section").select2({
        data: rr.data.sectionName
    });
}).catch(err => {
    console.log(err);
});

var _gatePosition;
$("#sel_toll_section").on("change",function () {
    if (_gatePosition) {
        map.removeLayer(_gatePosition);
    }
});
