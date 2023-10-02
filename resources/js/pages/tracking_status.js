// import { OpenStreetMapProvider } from 'leaflet-geosearch';
const url = window.burl;
// const iconUrl = "/assets/images/leaflet/yellow-car40px.png";
const shadowUrl = window.shadowUrl;
var _curLat = $("input[name=_lat]").val(), _curLon = $("input[name=_lon]").val();

var _dateTime = $("#datetime").text();
var _ignitionTime = $("#ignitiondate").text();
$("#datetime").text(window.dtHumanParse(_dateTime));
$("#ignitiondate").text(window.dtHumanParse(_ignitionTime));
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

var marker = _newMarker(
    // { lat: -6.1966477248620455, lng: 106.67314981137596 }, {
        {lat: _curLat, lng: _curLon}, {
        icon : L.icon({
            iconUrl: window.c_marker_front,
            // shadowUrl: shadowUrl,
            iconSize:     window.c_marker_front_cfg[0],
            iconAnchor:   window.c_marker_front_cfg[1],
            popupAnchor:  [0, -25]
        })
    }, null,null
);

var myFGMarker = new L.FeatureGroup();
myFGMarker.addLayer(marker);
myFGMarker.addTo(map);
map.fitBounds(myFGMarker.getBounds());

// const provider = new OpenStreetMapProvider()
// const results = await provider.search({ query: `${_curLat},${_curLon}` })
// $('#locationAddr').text(results[0].label)