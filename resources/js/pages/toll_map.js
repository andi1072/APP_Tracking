import 'leaflet-svg-shape-markers';
const url = window.burl;
const iconUrl = window.gateUrl;
const gateIcon = '/assets/images/leaflet/toll_gate.png';
var map = L.map('tollmap', {
    minZoom: 5,
    attributionControl: false,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5), myFGMarker = new L.FeatureGroup(), _lGate = [];

var _tileLayer = L.tileLayer(window.mapLayer, {
    attribution: '',
});
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
        mkr.bindPopup(popup, {
            'className': 'custom-popup'
        }).openPopup();
    }
    if (customToolTip) {
        var tooltip = L.tooltip()
        .setContent(customToolTip)
        mkr.bindTooltip(tooltip).openTooltip();
    }

    mkr.addTo(map)
    return mkr;
}

var contentInfoWindow = function(v) {
    return `<h3 class="h6 d-block text-uppercase font-weight-bold">${v.ftdevice_name}</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
    `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
    `Last Update</div><div class="col-7 pl-4">${window.dtHumanParse(v.created_at)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
    `Vehicle ID</div><div class="col-7 pl-4">${v.ftasset_id}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
    `Vehicle Name</div><div class="col-7 pl-4">${v.ftasset_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
    `</div>`;
}

// var isDivIcon = function() {
//     var mydivIcon = '<div class="leaflet-marker-icon leaflet-zoom-animated leaflet-interactive marker-active" title="proident" tabindex="0" style="margin-left: 0px; margin-top: 0px; width: 12px; height: 12px; transform: translate3d(62px, 325px, 0px); z-index: 1324; opacity: 1; outline: none;"><div class="in-map-markers">' +
//     '<div class="marker-icon">' +
//     '<img src="http://localhost/themeforest-dsDnTHD1-remark-responsive-bootstrap-4-admin-template/material/global/photos/placeholder.png' +
//     '</div></div></div>';
//     return new L.divIcon({
//         className: 'my-div-icon',
//         html: mydivIcon
//     });
// }

$.get(url + "/geomlff/gatepoint/js", function (res) {
    $.each(res.gatePoint, function (k, v) {
        // var marker = _newMarker({ lat: v.fflat, lng: v.fflon }, {
        //         icon : L.icon({
        //             iconUrl: iconUrl,
        //             iconSize:     [30, 30],
        //             iconAnchor:   [16, 25],
        //             popupAnchor:  [0, -15]
        //         })
        //         // icon : isDivIcon
        //     },

        //     v.ftname,
        //     null);
        //     myFGMarker.addLayer(marker);
        //     myFGMarker.addTo(map);
        _lGate.push({
            type: "Feature",
            properties: {
                created_at: v.created_at,
                fflat: v.fflat,
                fflon: v.fflon,
                fnpayment_type: v.fnpayment_type,
                ftdescription: v.ftdescription,
                ftname: v.ftname,
                ftsection: v.ftsection,
                id: v.id
            },
            geometry: { type: "Point", coordinates: [parseFloat(v.fflon), parseFloat(v.fflat)] },
        });
    });
    
    if ( res.gatePoint.length != 0) {
        pointing(map);
    }else{
        console.log('No Data')
    }
});

// var markersCluster = L.markerClusterGroup();

function pointing(map) {
    var bounds_group = new L.featureGroup([]);
    var jGate = {
        type: "FeatureCollection",
        name: "relay",
        features: _lGate
    };
    
    function style_Relay() {
        return {
            pane: 'pane_Gate',
            shape: 'circle',
            radius: 4.0,
            opacity: 1,
            color: '#CF0A0A',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: true,
            fillOpacity: 1,
            fillColor: '#FF0032',
            interactive: true,
        }
    }

    function pop_relay(feature, layer) {
        var v = feature.properties,payment_type = 'n/a';
        if (v.fnpayment_type === 1) {
            payment_type = 'Open';
        }else if (v.fnpayment_type === 2) {
            payment_type = 'Close';
        }
        layer.bindPopup(`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
        `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
        `GATE NAME</div><div class="col-7 pl-4">${v.ftname}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        `SECTION</div><div class="col-7 pl-4">${v.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
        `PAYMENT TYPE</div><div class="col-7 pl-4">${payment_type}</div></div>`, {maxHeight: 400});
        layer.bindTooltip(v.ftname);
    }

    map.createPane('pane_Gate');
    map.getPane('pane_Gate').style.zIndex = 402;
    map.getPane('pane_Gate').style['mix-blend-mode'] = 'normal';
    var lGate = new L.geoJson(jGate, {
        attribution: '',
        interactive: true,
        dataVar: 'jGate',
        layerName: 'lGate',
        pane: 'pane_Gate',
        onEachFeature: pop_relay,
        pointToLayer: function (feature, latlng) {
            
            // console.log(feature,latlng)
            return L.marker(latlng,{icon: L.icon({
                    iconUrl: gateIcon,
                    iconSize:     [30, 30],
                    iconAnchor:   [16, 25],
                    popupAnchor:  [0, -15]
                })
            });
            // return L.shapeMarker(latlng, style_Relay());
        },
    });
    bounds_group.addLayer(lGate);
    map.addLayer(lGate);
    map.fitBounds(bounds_group.getBounds());
}