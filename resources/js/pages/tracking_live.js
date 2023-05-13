import DriftMarker from "leaflet-drift-marker";
import "leaflet-rotatedmarker";
// const url = window.burl;
// const iconUrl = "/assets/images/leaflet/yellow-car40px.png";
// const iconTop = "/assets/images/leaflet/yellow-car-top.png";
// const sio = window.sio;
const sio = io("http://110.5.105.26:41257");
var _curLat = $("input[name=_lat]").val(), _curLon = $("input[name=_lon]").val(),
_device_id = $("input[name=_id]").val(),
myIcon = function (iUrl) {
    return L.icon({
        iconUrl: iUrl,
        iconSize:     window.c_marker_front_cfg[0],
        iconAnchor:   window.c_marker_front_cfg[1],
        // popupAnchor:  [0, -25]
    })
};

var map = L.map('livemap', {
    minZoom: 5,
    fullscreenControl: true,
    attributionControl: false,
}).setView([
    0.33995192349439596, 120.3733680354565
], 7), _lines = [];

var _tileLayer = L.tileLayer(window.mapLayer);
_tileLayer.addTo(map);

var mk = new DriftMarker([_curLat, _curLon], {
    draggable: false,
    // title: "Resource location",
    // alt: "Resource Location",
    riseOnHover: true,
    icon : myIcon(window.c_marker_front)
  }).addTo(map);

var fgMkr = new L.FeatureGroup();
fgMkr.addLayer(mk);
fgMkr.addTo(map);
map.fitBounds(fgMkr.getBounds());

var flagStop = true;

setInterval(function () {
    if (flagStop) {
        mk.setIcon(myIcon(window.c_marker_front));
        mk.setRotationAngle(0);
        // mk.setRotationOrigin("center center");
    }
}, 15000)

sio.on('trx_device_data_rcv', function (data) {
    var v = JSON.parse(data);
    console.log(v,v.id,_device_id)
    if (v.id === _device_id) {
        // createPolyLine(map,{ lat:v.lat, lng:v.lon});
        
        var polylines = new L.Polyline([{lat: _curLat, lng: _curLon}, { lat:v.lat, lng:v.lon}], {
            color: 'red',
            weight: 5,
            opacity: 0.5,
            smoothFactor: 1
        });
        polylines.addTo(map);
        console.log(polylines)
        _curLat = v.lat;
        _curLon = v.lon;
        mk.slideTo([v.lat, v.lon], {
            duration: 2000,
            keepAtCenter: false,
        });

        var _movIcon = L.icon({
            iconUrl: window.c_marker_top,
            iconSize:     window.c_marker_top_cfg[0],
            // iconAnchor:   window.c_marker_top_cfg[1],    
        });
        
        mk.setIcon(_movIcon);
        mk.setRotationAngle(v.direction);
        mk.setRotationOrigin("center center");
        setTimeout(function () {
            flagStop = true;
        }, 300000);
    }
});