import 'leaflet-svg-shape-markers';
import swal from 'sweetalert'
var osm = L.tileLayer(window.mapLayerOpenStreet, { minZoom: 5 }),
    map = new L.Map('sectionmap', {
        center: new L.LatLng(0.339951, 120.373368),
        zoom: 5, attributionControl: false,
        fullscreenControl: true,
    }),
    drawnItems = L.featureGroup(),
    _lSection = [], lSection, geoTmp = [];

var _tileLayer = L.tileLayer(window.mapLayerOpenStreet, {
    attribution: '',
});
_tileLayer.addTo(map);
L.Control.geocoder().addTo(map);
L.control.layers({
    'osm': osm.addTo(map),
    "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: 'google'
    })
}, {
    // 'drawlayer': drawnItems
}, {
    position: 'topright',
    collapsed: false
}).addTo(map);



// Add Draw
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



map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    // if (self.Polygon || self.Circle) {
    //     alert('You can only create 1 location per geofence');
    //     return null;
    // }
    if (layer._latlng && layer._mRadius) {
        window.circle = layer;
    } else if (layer._latlngs && layer._bounds) {
        geoTmp = layer._latlngs[0];
        if (geoTmp.length < 4) {
            toastr.error('Minimum 4 points required!', 'Error');
            return null;
        }
        self.Polygon = layer;
        self.Polygon.setStyle({
            color: '#16FF00',
            fillColor: '#16FF00',
            fillOpacity: 0.1
        });
    } else {
        // alert('Please make 1 Geofencing!')
        toastr.error('Please make 1 Geofencing!', 'Error');
        return null;
    }

    self.drawControlFull.remove();
    drawnItems.addLayer(self.Polygon);
    var __resDeleted = '', __resDeletedTmp = '';
    $.each(self.Polygon._latlngs, function (i, val) {
        $.each(val, function (ii, vv) {
            if (ii === 0) {
                __resDeletedTmp = `${vv.lng} ${vv.lat}`
            }
            __resDeleted += `${vv.lng} ${vv.lat}, `
        });
    })
    console.log(`${__resDeleted}${__resDeletedTmp}`)
    
    if (__resDeleted) {
        switch (_switchBtn) {
            case 2:
                __delete(`${__resDeleted}${__resDeletedTmp}`);
                break;
            case 3:
                // layer.addTo(map)
                swal({
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "Type section name",
                            type: "text",
                        },
                    },
                }).then((val) => {
                    if (val) {
                        __setSection_name(val,`${__resDeleted}${__resDeletedTmp}`)
                    }else{
                        __scanPoint(lat,lon);
                        map.addControl(drawControlFull);
                        map.removeLayer(self.Polygon);
                        __remNewMkr()
                    }
                });
                break;
            case 4:
                const _input = document.createElement('input');
                const _label = document.createElement('label');
                _input.type = 'checkbox';
                _input.id = 'ckflyover'
                _label.for = "ckflyover";
                _label.innerHTML = "&nbsp;Set Point for Flyover"

                const container = document.createElement("div");
                container.append(_input);
                // container.append(document.createElement("br"));
                container.append(_label);
                swal({
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    content: container,
                }).then((val) => {
                    if (val) {
                        console.log('A',val)
                    }else{
                        console.log('B',val)
                    }
                });
                // __setFlyOverLocation(`${__resDeleted}${__resDeletedTmp}`)
                break;
            default:
                break;
        }
    }else{
        toastr.error('Failed to read LatLng.')
    }
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

// eof

function pointing_section(map) {
    var jSection = {
        type: "FeatureCollection",
        name: "section",
        features: _lSection
    }, __tmpColor = {};

    function style_Section(feature) {
        let __fillColor = '#16FF00', v = feature.properties
        
        if (v.ftsection_name) {
            // console.log('AA',__tmpColor,__tmpColor[v.ftsection_name])
            if (!__tmpColor[v.ftsection_name]) {
                __tmpColor[v.ftsection_name] = window.randomHexColor()
            }
            __fillColor = __tmpColor[v.ftsection_name]
        }
        
        return {
            pane: 'pane_Section',
            shape: 'circle',
            radius: 4,
            opacity: 1,
            color: __fillColor,
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: __fillColor,
            // fillWeight: 0.1,
            interactive: true,
        }
    }

    function pop_Section(feature, layer) {
        let v = feature.properties;
        let _strView = `<ul style="list-style-type: none; margin: 0; padding: 0;">
        <li style="font-weight: bold;">Name: ${v.ftsection_name}</li>
        <li style="font-weight: bold;">Type: ${v.fbfly_over ? 'Flyover' : 'Street'}</li>
        <li style="font-weight: bold;">Elevation: ${v.ffelevation ? v.ffelevation : 'n/a'} Meter</li>`
        if (v.ftsection_name) {
            layer.bindTooltip(_strView).openTooltip();
        }
    }

    map.createPane('pane_Section');
    map.getPane('pane_Section').style.zIndex = 402;
    map.getPane('pane_Section').style['mix-blend-mode'] = 'normal';
    lSection = new L.geoJson(jSection, {
        attribution: '',
        interactive: true,
        dataVar: 'jSection',
        layerName: 'lSection',
        pane: 'pane_Section',
        onEachFeature: pop_Section,
        pointToLayer: function (feature, latlng) {
            return L.shapeMarker(latlng, style_Section(feature));
        },
    });
    map.addLayer(lSection);
}

var _switchBtn = 0;

$("input[name='ckScanPoints']").change(function () {
    _switchBtn = 0;
    map.removeLayer(drawnItems)
    map.removeControl(drawControlFull)
    __remNewMkr()
    __scanPoint(lat,lon);
});

$("input[name='ckAddPoints']").change(function () {
    _switchBtn = 1;
    map.removeLayer(drawnItems)
    map.removeControl(drawControlFull)
    __remNewMkr()
    __scanPoint(lat,lon);
});

$("input[name='ckDelPoints']").change(function () {
    _switchBtn = 2;
    // drawnItems.addTo(map)
    map.addControl(drawControlFull);
    __remNewMkr()
    __scanPoint(lat,lon);
});

$("input[name='ckAddTollSection']").change(function () {
    _switchBtn = 3;
    map.addControl(drawControlFull);
    __remNewMkr()
    __scanPoint(lat,lon);
});

$("input[name='ckFlyOverLocation']").change(function () {
    _switchBtn = 4;
    map.addControl(drawControlFull);
    __remNewMkr()
    __scanPoint(lat,lon);
});

function __save(__latlng) {
    var fd = new FormData();
    fd.append('_token', $("input[name=_token]").val());
    fd.append('latlng', __latlng);
    $.ajax({
        type: 'POST'
        , url: `${window.burl}/tollroute/js/add`
        , data: fd
        , dataType: 'json'
        , contentType: false
        , cache: false
        , processData: false
        , beforeSend: function () {
            // $('#formSection').css("opacity", ".5");
        }
        , success: function (res) {
            // $('#formSection').css("opacity", "");
            var r = res.msg;
            if (r.code === 200) {
                toastr.success('Saved.', 'Success');
            } else {
                toastr.error(res.msg.obj, 'Error');
            }

        }
    });
}

var lat = 0, lon = 0, _nMkrArr = [];

function __remNewMkr() {
    $.each(_nMkrArr,function (k, v) {
        map.removeLayer(_nMkrArr[k])
    });
    _nMkrArr = [];
}

function __delete(__latlng) {
    var fd = new FormData();
    fd.append('_token', $("input[name=_token]").val());
    fd.append('latlng', __latlng);
    $.ajax({
        type: 'POST'
        , url: `${window.burl}/tollroute/js/delete`
        , data: fd
        , dataType: 'json'
        , contentType: false
        , cache: false
        , processData: false
        , beforeSend: function () {
            $('#formSection').css("opacity", ".5");
        }
        , success: function (res) {
            $('#formSection').css("opacity", "");
            // console.log('res',res)
            var r = res.msg;
            if (r.code === 200) {
                toastr.success('Point deleted.', 'Success');
                __scanPoint(lat,lon);
                // self.Polygon.remove()
                map.addControl(drawControlFull);
                map.removeLayer(self.Polygon);
                __remNewMkr()
            } else {
                toastr.error(res.msg.obj, 'Error');
            }

        }
    });
}

function __setSection_name(val,__latlng) {
    var fd = new FormData();
    fd.append('_token', $("input[name=_token]").val());
    fd.append('section_name',val)
    fd.append('latlng', __latlng);
    $.ajax({
        type: 'POST'
        , url: `${window.burl}/tollroute/js/set_section`
        , data: fd
        , dataType: 'json'
        , contentType: false
        , cache: false
        , processData: false
        , beforeSend: function () {
            $('#formSection').css("opacity", ".5");
        }
        , success: function (res) {
            console.log('res',res)
            toastr.success('', 'Success');
            __scanPoint(lat,lon);
            map.addControl(drawControlFull);
            map.removeLayer(self.Polygon);
            __remNewMkr()
        }, error: function(err) {
            console.log(err)
            let _err = JSON.parse(err.responseText)
            toastr.error(_err.error, 'Error');
        }, complete: function() {
            $('#formSection').css("opacity", "");
        },
    });
}

function __setFlyOverLocation(__latlng) {
    var fd = new FormData();
    fd.append('_token', $("input[name=_token]").val());
    fd.append('latlng', __latlng);
    $.ajax({
        type: 'POST'
        , url: `${window.burl}/tollroute/js/set_section_elevation`
        , data: fd
        , dataType: 'json'
        , contentType: false
        , cache: false
        , processData: false
        , beforeSend: function () {
            $('#formSection').css("opacity", ".5");
        }
        , success: function (res) {
            console.log('res',res)
            toastr.success('', 'Success');
            __scanPoint(lat,lon);
            map.addControl(drawControlFull);
            map.removeLayer(self.Polygon);
            __remNewMkr()
        }, error: function(err) {
            console.log(err)
            let _err = JSON.parse(err.responseText)
            toastr.error(_err.error, 'Error');
        }, complete: function() {
            $('#formSection').css("opacity", "");
        },
    });
}

L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');

map.on('click', function (e) {
    // L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
    lat = e.latlng.lat;
    lon = e.latlng.lng;
    var latlng = { lat: e.latlng.lat, lng: e.latlng.lng };
    switch (_switchBtn) {
        case 0:
            __scanPoint(lat,lon);
            break;
        case 1:
            if (_nMkr) {
                map.removeLayer(_nMkr)
            }
            var _nMkr = window._newMarker(latlng, {
                icon: L.icon({
                    iconUrl: '/assets/images/leaflet/marker-reddot.png',
                    iconSize: [8, 16],
                    iconAnchor: [5, 12],
                }),
                interactive: false
            });
            _nMkr.addTo(map);
            _nMkrArr.push(_nMkr)
            // newMkrCollection.push(_nMkr);
            __save(JSON.stringify(_nMkr._latlng))
            break;
        default:
            // console.log("No Action");
            break
    }
})

function __scanPoint(lat,lon) {
    if (lSection) {
        map.removeLayer(lSection)
    }
    _lSection = [];
    $.get(`${window.burl}/devtools/js/tollsectionpoint?latlng=${lat},${lon}`, function (res) {
        $.each(res.data, function (k, v) {
            _lSection.push({
                type: "Feature",
                properties: {
                    ftsection_name: v.ftsection_name,
                    ffelevation: v.ffelevation,
                    fbfly_over: v.fbfly_over
                },
                geometry: { type: "Point", coordinates: [parseFloat(v.fflon), parseFloat(v.fflat)] },
            });
        })

        if (res.data.length != 0) {
            pointing_section(map);
        }
    });
}