const url = window.burl;
const geoid = $("input[name=_id]").val();

var layerTmp = null, geoTmp = [], osmUrl = window.mapLayer,
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
        alert('You can only create 1 location per geofence');
        return null;
    }
    var layer = event.layer;
    if (layer._latlng && layer._mRadius) {
        window.circle = layer;
    }else if (layer._latlngs && layer._bounds){
        geoTmp = layer._latlngs[0];
        if (geoTmp.length < 4) {
            alert('Minimum 4 points required!');
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
        swal('Please make 1 Geofencing!', '', 'Warning');
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
// var thisLayer = [];
// map.on(L.Draw.Event.DRAWVERTEX, function (e) {
//     for (thisLayer in e.target._layers) {
//         if (e.target._layers.hasOwnProperty(thisLayer)) {
//             if (e.target._layers[thisLayer].hasOwnProperty("edited")) {
//                 console.log("we think we found the polygon?");
//                 console.log(e.target._layers[thisLayer]);

//                 // the updated Polygon array points are here:
//                 newPolyLatLngArray = e.target._layers[thisLayer].editing.latlngs[0];
//                 console.log(newPolyLatLngArray)
//             }
//         }
//     };
// });

// if (layer instanceof L.Rectangle) {
//     console.log('im an instance of L rectangle');
// }

// if (layer instanceof L.Polygon) {
//     console.log('im an instance of L polygon');
// }

// if (layer instanceof L.Polyline) {
//     console.log('im an instance of L polyline');
// }


$('#formGeo').submit(
    function (e) {
        e.preventDefault();
        var backurl = $("input[name=_backurl]").val();
        var fd = new FormData();
        fd.append('_token', $("input[name=_token]").val());
        fd.append('id', $("input[name=_id]").val());
        fd.append('txtName', $("input[name=txtName]").val());
        fd.append('txtAddress', $("textarea[name=txtAddress]").val());
        fd.append('_isEdit', isEdit);

        if ( typeof(self.Polygon) !== "undefined" && self.Polygon !== null ) {
            
            for (const [k, v] of Object.entries(_resPolygon)) {
                delete _resPolygon[k];
            }
            
            $.each(self.Polygon._latlngs, function(i, val) {
                $.each(val, function(ii, vv) {
                    _resPolygon[ii] = {lat: vv.lat, lng: vv.lng};
                });
            })
            console.log(JSON.stringify(_resPolygon))

            fd.append('geo_type', 1);
            fd.append('polygon_point', JSON.stringify(_resPolygon));
        }else{
            toastr.error("Please make 1 Geofencing!", 'Warning');
            return null;
        }
        
        $.ajax({
            type: 'POST'
            , url: url + '/geo/js/add'
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
                    sio.emit('trx_downlink', '{POLYGONLOAD}');
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
                                window.location.href = url + '/geo/detail/' + geoid;
                            } else {
                                window.location.href = backurl;
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

$.get(url + `/geo/js/detail/${geoid}/point`, function(res) {
    var _tmpPoint = [];
    $.each(res.dataPoint, function(k,v) {
        isEdit = 1;
        _tmpPoint.push([v.fflat, v.fflon])
    });
    if (res.dataPoint.length !== 0) {
        var polygonData = L.polygon(_tmpPoint);
        self.Polygon = polygonData;
        drawnItems.addLayer(polygonData);
        map.fitBounds(drawnItems.getBounds());
        self.drawControlFull.remove();
        self.drawControlEdit.addTo(map);
    }
});