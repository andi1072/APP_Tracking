// import '../ts/mkrmove.js';
import '../ts/mkrmove2.js';
// const url = window.burl;
// const iconUrl = "/assets/images/leaflet/yellow-car40px.png";
// const shadowUrl = window.shadowUrl;
var _deviceid = $("input[name=_deviceid]").val(), _curLat = $("input[name=_lat]").val(), _curLon = $("input[name=_lon]").val(), sio = window.sio;

var map = L.map('statusmap', {
    minZoom: 5,
    fullscreenControl: true,
    attributionControl: false,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5), markers = {}, myFGMarker = new L.FeatureGroup(),_lines = [], polylines;

var _tileLayer = L.tileLayer(window.mapLayer);
_tileLayer.addTo(map);

function _newMarker(latLng,customIcon = null,customToolTip = null, customPopUp = null) {
    var mkr;
    if (customIcon) {
        mkr = L.marker(
            latLng,
            customIcon //// { icon: greenIcon }
        );
    }else{
        mkr = L.marker(latLng);
    }
    if (customPopUp) {
        var popup = L.popup().setContent(customPopUp);
        mkr.bindPopup(popup).openPopup();
    }
    if (customToolTip) {
        var tooltip = L.tooltip()
        .setContent(customToolTip)
        mkr.bindTooltip(tooltip).openTooltip();
    }

    mkr.addTo(map)
    return mkr;
}

var myIcon = L.icon({
    iconUrl: window.c_marker_front,
    // shadowUrl: shadowUrl,
    iconSize:     [28, 28],
    iconAnchor:   [15, 25],
    popupAnchor:  [0, -25]
})

var marker = _newMarker(
    // { lat: -6.1966477248620455, lng: 106.67314981137596 }, {
        {lat: _curLat, lng: _curLon}, {
        icon : myIcon,
        rotation: 180
    }, null,null
);

var myFGMarker = new L.FeatureGroup();
myFGMarker.addLayer(marker);
myFGMarker.addTo(map);
map.fitBounds(myFGMarker.getBounds());

var myMovingMarker = L.Marker.movingMarker([[_curLat, _curLon],[-5.6151482949696865, 105.6381531816838]],
    [20000]).addTo(map);

myMovingMarker.options.icon = myIcon;

myMovingMarker.start();

sio.on('trx_obu_data_fe', function (data) {
    var r = JSON.parse(data);
    console.log(r)
    console.log('a',r.id,_deviceid)
    if (r.id === _deviceid) {
        console.log('b',r.id,_deviceid)
        const iconOptions = {
            iconSize  : [30, 30],
            iconAnchor: [30 / 2, 30 + 3],
            className : 'mymarker',
            //A runner emoji, medium skin tone, Zero-Width-Joiner, female:
            html: '🚘' // or: '&#x1f3c3;&#x1f3fd;&#x200d;&#x2640;'
        }
        // var animatedMarker = L.animatedMarker([{lat: -6.7360431878553175, lng: 105.57018591739421}, {lat: -6.203715693998919, lng: 106.91753579041517}],{
        // var animatedMarker = L.animatedMarker([{lat: _curLat, lng: _curLon}, {lat: r.lat, lng: r.lon}],{
        //     autoStart: false,
        //     distance: 100,  // meters
        //     interval: 1000, //milisec
        //     // icon : L.icon({
        //     //     iconUrl: url + "/assets/images/leaflet/yellow-car40px.png",
        //     //     iconSize:     [30, 30],
        //     //     iconAnchor:   [15, 33],
        //     //     popupAnchor:  [0, -15]
        //     // })
        //     icon: L.divIcon(iconOptions)
            
        // });
        // map.addLayer(animatedMarker);
        // console.log(animatedMarker)
        _curLat = r.lat;
        _curLon = r.lon;
    }
})