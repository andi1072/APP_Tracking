const url = window.burl;
// const iconUrl = "/assets/images/leaflet/yellow-car40px.png";

var map = L.map('dashboardmap', {
    minZoom: 2,
    attributionControl: false,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5), myFGMarker = new L.FeatureGroup();

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

$.get(url + "/dashboard/js", function (res) {
    // console.log(res.data.data)
    $.each(res.data.data, function (k, v) {
        var marker = _newMarker({ lat: v.fflat, lng: v.fflon }, {
                icon : L.icon({
                    iconUrl: `${url}/assets/images/leaflet/red-car-front.png`,
                    iconSize:     window.c_marker_front_cfg[0],
                    iconAnchor:   window.c_marker_front_cfg[1],
                    popupAnchor:  window.c_marker_front_cfg[2]
                })
                // icon : isDivIcon
            },

            v.ftasset_id,
            contentInfoWindow(v));
            myFGMarker.addLayer(marker);
            myFGMarker.addTo(map);
    });
    if ( res.data.data.length != 0) {
        map.fitBounds(myFGMarker.getBounds());
    }
});

// var markersCluster = L.markerClusterGroup();