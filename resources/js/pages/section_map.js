import 'leaflet-svg-shape-markers';
// var map = L.map('sectionmap', {
//     minZoom: 5,
//     attributionControl: false,
//     fullscreenControl: true,
// }).setView([
//     0.33995192349439596, 120.3733680354565
// ], 5), myFGMarker = new L.FeatureGroup(), _lGate = [], _lSection = [], lSection;

var osm = L.tileLayer(window.mapLayerOpenStreet, { minZoom: 5 }),
    map = new L.Map('sectionmap', {
        center: new L.LatLng(0.339951, 120.373368),
        zoom: 5, attributionControl: false,
        fullscreenControl: true,
    }),
    drawnItems = L.featureGroup(),
    _lSection = [], lSection, geoTmp = [], _scanedPoint = [];

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
    'drawlayer': drawnItems
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
    if (self.Polygon || self.Circle) {
        alert('You can only create 1 location per geofence');
        return null;
    }
    var layer = event.layer;
    if (layer._latlng && layer._mRadius) {
        window.circle = layer;
    } else if (layer._latlngs && layer._bounds) {
        geoTmp = layer._latlngs[0];
        if (geoTmp.length < 4) {
            alert('Minimum 4 points required!');
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
        swal('Please make 1 Geofencing!', '', 'Warning');
        return null;
    }

    self.drawControlFull.remove();
    // self.drawControlEdit.addTo(map);
    drawnItems.addLayer(layer);
    // layerTmp = layer;

    var __resDeleted = '', __resDeletedTmp = '';
    $.each(self.Polygon._latlngs, function (i, val) {
        $.each(val, function (ii, vv) {
            // __isJkt[ii] = [vv.lng,vv.lat];
            if (ii === 0) {
                __resDeletedTmp = `${vv.lng} ${vv.lat}`
            }
            __resDeleted += `${vv.lng} ${vv.lat}, `
        });
    })
    console.log(`${__resDeleted}${__resDeletedTmp}`)
    __delete(`${__resDeleted}${__resDeletedTmp}`);
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
    };

    function style_Section() {
        return {
            pane: 'pane_Section',
            shape: 'circle',
            radius: 4,
            opacity: 1,
            color: '#F6FA70',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: false,
            fillOpacity: 1,
            fillColor: '#F6FA70',
            interactive: false,
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
        // onEachFeature: pop_Section,
        pointToLayer: function (feature, latlng) {
            // return window._newMarker(latlng, {
            //     icon : L.icon({
            //         iconUrl: window.gateUrl,
            //         iconSize:     [30, 30],
            //         iconAnchor:   [8, 25],
            //         popupAnchor:  [0, -20]
            //     })
            // })
            return L.shapeMarker(latlng, style_Section());
        },
    });
    map.addLayer(lSection);
}

var _switchBtn = 0;

$("input[name='ckScanPoints']").change(function () {
    _switchBtn = 0;
    map.removeLayer(drawnItems)
    map.removeControl(drawControlFull)
});

$("input[name='ckAddPoints']").change(function () {
    _switchBtn = 1;
    map.removeLayer(drawnItems)
    map.removeControl(drawControlFull)
});

$("input[name='ckDelPoints']").change(function () {
    _switchBtn = 2;
    drawnItems.addTo(map)
    map.addControl(drawControlFull);
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

var lat = 0, lon = 0;

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
            var r = res.msg;
            if (r.code === 200) {
                toastr.success('Point deleted.', 'Success');
                __scanPoint(lat,lon);
                // self.Polygon.remove()
                map.addControl(drawControlFull);
            } else {
                toastr.error(res.msg.obj, 'Error');
            }

        }
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
            var _nMkr = window._newMarker(latlng, {
                icon: L.icon({
                    iconUrl: '/assets/images/leaflet/marker-reddot.png',
                    iconSize: [8, 16],
                    iconAnchor: [5, 14],
                }),
                interactive: false
            });
            _nMkr.addTo(map);
            // newMkrCollection.push(_nMkr);
            __save(JSON.stringify(_nMkr._latlng))
            break;
        case 2:

            break;
        default:
            console.log("No Action");
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
                properties: {},
                geometry: { type: "Point", coordinates: [parseFloat(v.fflon), parseFloat(v.fflat)] },
            });
            // _scanedPoint.push([parseFloat(v.fflon), parseFloat(v.fflat)])
        })

        if (res.data.length != 0) {
            pointing_section(map);
        }
    });
}