import swal from 'sweetalert'
const url = window.burl;
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
},{
    'drawlayer': drawnItems
},{
    position: 'topright',
    collapsed: false
}).addTo(map);
// self.Polygon = null;
// self.Circle = null;

// Add Draw
self.resPolygon = {};
self.drawControlFull = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        },
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        },
        polyline: false,
        rectangle: false,
        marker: false,
        circle: false,
        // circle: {
        //     allowIntersection: false,
        //     showArea: true
        // },
        circlemarker: false
    }
});
self.drawControlEdit = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    poly: {
        allowIntersection: false
    },
    // edit: true
  },
  draw: false
});
map.addControl(drawControlFull);

// eof


map.on(L.Draw.Event.CREATED, function (event) {
    if (self.Polygon || self.Circle) {
        toastr.error("You can only create 1 location per geofence", 'Warning');
        return null;
    }
    var layer = event.layer;
    console.log(layer,layer._latlng, layer._mRadius)
    if (layer._latlng && layer._mRadius) {
        window.circle = layer;
    }else if (layer._latlngs && layer._bounds){
        geoTmp = layer._latlngs[0];
        if (geoTmp.length < 4) {
            toastr.error("Minimum 4 points required!", 'Warning');
            return null;
        }
        self.Polygon = layer;
        self.Polygon.setStyle({
            color: '#16FF00',
            fillColor: '#16FF00',
            fillOpacity : 0.1
        });
    }else {
        // alert('Please make 1 Geofencing!')
        // swal('Please make 1 Geofencing!', '', 'Warning');
        return null;
    }
    
    self.drawControlFull.remove();
    self.drawControlEdit.addTo(map);
    drawnItems.addLayer(layer);
    layerTmp = layer;
});

map.on(L.Draw.Event.EDITED, function (event) {
    var layers = event.layers;
    layers.eachLayer(function (layer) {
        if (layer._latlng && layer._mRadius) {
            console.log(layer._latlng,layer._mRadius)
        }else if (layer._latlngs && layer._bounds){
            geoTmp = layer._latlngs[0];
            if (geoTmp.length < 4) {
                // alert('Minimum 4 points required!');
                toastr.error("Minimum 4 points required!", 'Warning');
                // self.Polygon = layerTmp;
                self.Polygon.remove();
                self.Polygon = null;
                self.drawControlEdit.remove();
	            self.drawControlFull.addTo(map);
                drawnItems.clearLayers();
                return null;
            }
        }else {
            toastr.error("Please make 1 Geofencing!", 'Error');
        }
    });
});

map.on(L.Draw.Event.DELETED, function (event) {
    var layers = event.layers;
    layers.eachLayer(function (layer) {
        self.Circle = null;
        self.Polygon = null;
        geoTmp = [];
        self.drawControlEdit.remove();
	    self.drawControlFull.addTo(map);
    });
});

$('#formGeo').submit(
    function (e) {
        e.preventDefault();
        var backurl = $("input[name=_backurl]").val();
        var fd = new FormData();
        fd.append('_token', $("input[name=_token]").val());
        fd.append('id', $("input[name=_id]").val());
        // fd.append('txtName', $("input[name=txtName]").val());
        // fd.append('txtAddress', $("textarea[name=txtAddress]").val());
        fd.append('gate_id',$("#sel_toll_gate").val());
        fd.append('_isEdit', isEdit);
        console.log(isEdit);

        if ( typeof(self.Polygon) !== "undefined" && self.Polygon !== null ) {
            
            for (const [k, v] of Object.entries(_resPolygon)) {
                delete _resPolygon[k];
            }
            
            $.each(self.Polygon._latlngs, function(i, val) {
                $.each(val, function(ii, vv) {
                    _resPolygon[ii] = {lat: vv.lat, lng: vv.lng};
                });
            });
            console.log(JSON.stringify(_resPolygon))
            var _chkGateDec = $("select[name=gate_declare]").val();
            if (_chkGateDec <= 0) {
                toastr.error("Please select declaration!", 'Warning');
                return null;
            }
            fd.append('geo_type', parseInt(_chkGateDec));
            fd.append('polygon_point', JSON.stringify(_resPolygon));
        }else{
            toastr.error("Please make 1 Geofencing!", 'Warning');
            return null;
        }
        
        $.ajax({
            type: 'POST'
            , url: url + '/geomlff/js/add'
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
                    // sio.emit('trx_downlink', '{POLYGONLOADMLFF}');
                    swal({
                        title: "Success",
                        text: "Continue editing?",
                        type: "success",
                        buttons: ["No, take me back!", "Yes, continue editing!!"],
                    }).then((isConfirm) => {
                        if (isConfirm) {
                            window.location.href = url + '/geomlff/detail/' + geoid;
                        } else {
                            window.location.href = backurl;
                        }
                    })
    
                } else {
                    console.log(res)
                    toastr.error(res.msg, 'Error');
                }
            }
        });
    }
);

$("#sel_toll_section").select2();
$("#sel_toll_gate").select2();
axios.get(url + `/geomlff/gatepoint/section/js`).then(rr => {
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
    _loadTollGate($("#sel_toll_section").val());
});

function _loadTollGate(tollsec_name) {
    axios.get(url + `/geomlff/gatepoint/section/js/${tollsec_name}`).then(rr => {
        $("#sel_toll_gate").select2({
            data: rr.data.gatePoint
        });
    }).catch(err => {
        console.log(err);
    });
}

$("#sel_toll_gate").on("change",function () {
    if (_gatePosition) {
        map.removeLayer(_gatePosition);
    }
    _markerGate($("#sel_toll_gate").val());
});

function _markerGate(gate_id) {
    axios.get(url + `/geomlff/gatepoint/section/det/js/${gate_id}`).then(rr => {
        console.log(rr)
        var v = rr.data.gatePoint,payment_type = 'n/a';
        
        if (v.fnpayment_type === 1) {
            payment_type = 'Open';
        }else if (v.fnpayment_type === 2) {
            payment_type = 'Close';
        }
        _gatePosition = window._newMarker({ lat: v.fflat, lng: v.fflon }, {
            icon : L.icon({
                iconUrl: window.gateUrl,
                iconSize:     [30, 30],
                iconAnchor:   [8, 25],
                popupAnchor:  [0, -20]
            })
        },
        null,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
        `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
        `GATE NAME</div><div class="col-7 pl-4">${v.ftname}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        `SECTION</div><div class="col-7 pl-4">${v.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
        `PAYMENT TYPE</div><div class="col-7 pl-4">${payment_type}</div></div>`);
        _gatePosition.addTo(map);
        var myFGMarker = new L.FeatureGroup();
        myFGMarker.addLayer(_gatePosition);
        myFGMarker.addTo(map);
        map.fitBounds(myFGMarker.getBounds());
    });
}

$.get(url + `/geomlff/js/detail/${geoid}/point`, function(res) {
    var v = res.dataHead;
    if (res.dataHead) {
        _markerGate(v.uuid_x_gate_point_id);
    }
    var _tmpPoint = [];
    $.each(res.dataPoint, function(k,v) {
        isEdit = 1;
        _tmpPoint.push([v.fflat, v.fflon]);
    });
    if (res.dataPoint.length !== 0) {
        var polygonData = L.polygon(_tmpPoint);
        self.Polygon = polygonData;
        drawnItems.addLayer(polygonData);
        map.fitBounds(drawnItems.getBounds());
        self.drawControlFull.remove();
        self.drawControlEdit.addTo(map);
        if (isEdit === 1) {
            _loadTollGate(v.ftsection);
            $('input[name=sel_toll_gate]').val(v.uuid_x_gate_point_id)
            // $("#sel_toll_gate").select2({
            //     data: [{'id': v.uuid_x_gate_point_id, 'text': v.ftname}]
            // });
        }
    }
});

// map.on('click', function(e) {        
//     var popLocation= e.latlng;
//     var popup = L.popup()
//     .setLatLng(popLocation)
//     .setContent('<p>Hello world!<br />This is a nice popup.</p>');
//     map.on('contextmenu',function(){
//         popup.openOn(map);
//     });
//     var mkr = new L.marker(e.latlng, {draggable:'true'});
//     mkr.on('dragend', function(event){
//         var marker = event.target;
//         var position = marker.getLatLng();
//         marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
//         map.panTo(new L.LatLng(position.lat, position.lng))
//     });
//     map.addLayer(mkr);
// });