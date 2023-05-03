// import '../ts/mkrmove.js';
const url = window.burl;
// const iconUrl = '/assets/images/leaflet/marker-reddot.png';
// const iconTop = "/assets/images/leaflet/yellow-car-top.png";
import DriftMarker from "leaflet-drift-marker";
import "leaflet-rotatedmarker";

import 'leaflet-svg-shape-markers';

var tbllogsdet = $('#tbllogsdet').DataTable({
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'copy',
            // messageTop: function () {
            //     return rowTblLogsData[1] + ' to ' + rowTblLogsData[2];
            // }
        },
        {
            extend: 'pdf',
            // messageTop: function () {
            //     return rowTblLogsData[1] + ' to ' + rowTblLogsData[2];
            // }
        },
        {
            extend: 'print',
            // messageTop: function () {
            //     return rowTblLogsData[1] + ' to ' + rowTblLogsData[2];
            // }
        },
        {
            extend: 'excel',
            // messageTop: function () {
            //     return rowTblLogsData[1] + ' to ' + rowTblLogsData[2];
            // }
        },
    ],
    scrollX: true,
    order: [[0, 'desc']],
    // "columnDefs": [
    //     {
    //         target: 0,
    //         visible: false,
    //         searchable: false,
    //     },
    // ],
});
$("#tbllogsdet").width("100%");

// /tracking/detail/js/map?did=860371050882459&from=2023-02-10%2016:50:04&to=2023-02-22%2005:52:21
// https://github.com/ewoken/Leaflet.MovingMarker
var device_id,_dtfrom,_dtto,
map = L.map('trackingmap', {
    minZoom: 5,
    fullscreenControl: true,
    attributionControl: false,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5);

var _tileLayer = L.tileLayer(window.mapLayer);
_tileLayer.addTo(map);
var lRelay,layer_line_relay, _lRelay = [],_lRelayLine = [];
$('#formMapTrack').submit(function (e) {
    e.preventDefault();
    device_id = $("input[name=device_id]").val();
    _dtfrom = $("input[name=txtdtfrom]").val();
    _dtto = $("input[name=txtdtto]").val();
    _lRelay = [];
    _lRelayLine = [];
    if (lRelay) {
        map.removeLayer(lRelay);
        map.removeLayer(layer_line_relay);
    }
    if (runObj) {
        clearInterval(runObj);
    }
    
    tbllogsdet.clear().draw();
    $.get(url + `/tracking/detail/js/map?did=${device_id}&from=${_dtfrom}&to=${_dtto}&humanTz=${window.dtHumanName()}`, function (res) {
        $.each(res.relay.data, function (k, v) {
            _lRelay.push({
                type: "Feature",
                properties: {
                    created_at: v.created_at,
                    ffaccuracy_cep: v.ffaccuracy_cep,
                    ffaltitude: v.ffaltitude,
                    ffbattery: v.ffbattery,
                    ffdirection: v.ffdirection,
                    fflat: v.fflat,
                    fflon: v.fflon,
                    ffspeed: v.ffspeed
                },
                geometry: { type: "Point", coordinates: [parseFloat(v.fflon), parseFloat(v.fflat)] },
            });
            _lRelayLine.push([parseFloat(v.fflon),parseFloat(v.fflat)]);
            // tbllogsdet.row.add([
            //     window.dtHumanParse(v.created_at), v.fflat , v.fflon, v.ffaccuracy_cep, v.ffdirection,v.ffspeed,v.ffaltitude
            // ]).draw(true);
            // tbllogsdet.row.add([
            //     window.dtHumanParse(v.created_at)
            // ]).draw(true);
        });
        if ( res.relay.data.length != 0) {
            pointing();
            pointLines();
            startReplay();
        }else{
            toastr.info('Vehicle tracking not found.', 'Information');
        }
    });
});

// Relay Point
function pointing() {
    var bounds_group = new L.featureGroup([]);
    var jRelay = {
        type: "FeatureCollection",
        name: "relay",
        // features: [
        //     {
        //         type: "Feature",
        //         properties: {},
        //         geometry: { type: "Point", coordinates: [110.534438333162598, -7.357956666866642] },
        //     },{
        //         type: "Feature",
        //         properties: {},
        //         geometry: { type: "Point", coordinates: [104.753213333728411, -3.060893333360582] },
        //     },{
        //         type: "Feature",
        //         properties: {},
        //         geometry: { type: "Point", coordinates: [104.722128333755677, -3.105534999840302] },
        //     },
        // ],
        features: _lRelay
    };
    
    function style_Relay() {
        return {
            pane: 'pane_Relay',
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
        // console.log(feature)
        var v = feature.properties;
        var strsignal = 'n/a';
        if (between(parseInt(v.fnsignal), 0, 10)) {
            strsignal = 'Poor'
        }else if(between(parseInt(v.fnsignal), 11, 20)) {
            strsignal = 'Good';
        }else if(between(parseInt(v.fnsignal), 21, 31)) {
            strsignal = 'Excelent';
        }
        var pContent = '<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>' +
                    '<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">' +
                    'DATE TIME</div><div class="col-7 pl-4">'+ window.dtHumanParse(v.created_at) +'</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'ALT (Meters)</div><div class="col-7 pl-4">'+ parseFloat(parseFloat(v.ffaltitude) / 3.2808).toFixed(2) +'</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'SPEED</div><div class="col-7 pl-4">'+ v.ffspeed +'Km/h</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'ACCURACY (CEP)</div><div class="col-7 pl-4">'+ v.ffaccuracy_cep +'</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'SIGNAL</div><div class="col-7 pl-4">'+ v.fnsignal +' ('+ strsignal +')</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'DIRECTION</div><div class="col-7 pl-4">'+ v.ffdirection +'</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'COORDINATE</div><div class="col-7 pl-4">'+ v.fflat.toString() + ', ' + v.fflon.toString() +'</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">'+
                    'SATTELITE</div><div class="col-7 pl-4">'+ v.fnsattelite +'</div></div>';
        layer.bindPopup(pContent, {maxHeight: 400});
        layer.bindTooltip(window.dtHumanParse(v.created_at)).openTooltip();
    }

    map.createPane('pane_Relay');
    map.getPane('pane_Relay').style.zIndex = 402;
    map.getPane('pane_Relay').style['mix-blend-mode'] = 'normal';
    lRelay = new L.geoJson(jRelay, {
        attribution: '',
        interactive: true,
        dataVar: 'jRelay',
        layerName: 'lRelay',
        pane: 'pane_Relay',
        onEachFeature: pop_relay,
        pointToLayer: function (feature, latlng) {
            
            // console.log(feature,latlng)
            return L.shapeMarker(latlng, style_Relay());
        },
    });
    bounds_group.addLayer(lRelay);
    map.addLayer(lRelay);
    map.fitBounds(bounds_group.getBounds());
}
// End Of Point

// Line Relay
function pointLines() {
    var json_line_relay = {
        type: "FeatureCollection",
        name: "line_relay",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    // coordinates: [
                    //     // [95.93761208246148,5.032048889303608], [115.87471017100374,2.6864445684724796], [132.36354910146684,-12.596604806821166]
                    // ],
                    coordinates: _lRelayLine,
                },
            },
        ]
    }

    function style_line_relay (feature) {
        return {
            pane: 'pane_line_relay',
            opacity: 1,
            color: '#FF0032',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 1.0,
            fillOpacity: 0,
            interactive: true,
        }
    }

    map.createPane('pane_line_relay');
    map.getPane('pane_line_relay').style.zIndex = 401;
    map.getPane('pane_line_relay').style['mix-blend-mode'] = 'normal';
    layer_line_relay = new L.geoJson(json_line_relay, {
        attribution: '',
        interactive: true,
        dataVar: 'json_line_relay',
        layerName: 'layer_line_relay',
        pane: 'pane_line_relay',
        style: style_line_relay,
    });
    // console.log(layer_line_relay)
    // bounds_group.addLayer(layer_line_relay);
    map.addLayer(layer_line_relay);
}
// End Of Line

function between(x, min, max) {
    return x >= min && x <= max;
}
var mk,stepIcon = 0,runObj;
function startReplay() {
    // console.log(_lRelay)
    stepIcon = 0;
    var startRelay = _lRelay[0];
    if (mk) {
        map.removeLayer(mk);
    }
    mk = new DriftMarker([startRelay.geometry.coordinates[1], startRelay.geometry.coordinates[0]], {
        draggable: false,
        // title: "Resource location",
        // alt: "Resource Location",
        riseOnHover: true,
        icon : L.icon({
            iconUrl: window.c_marker_top,
            iconSize:     window.c_marker_top_cfg[0],
            iconAnchor:   window.c_marker_top_cfg[1],
            tooltipAnchor: [0, -15]
        }),
    }).addTo(map);

    runObj = setInterval(function () {
        var resRelay = _lRelay[stepIcon];
        // console.log("Run",stepIcon,resRelay)
        mk.slideTo([resRelay.geometry.coordinates[1], resRelay.geometry.coordinates[0]], {
            duration: 1000,
            keepAtCenter: false,
        });
        mk.setIcon(L.icon({
            iconUrl: window.c_marker_top,
            iconSize:     window.c_marker_top_cfg[0],
            iconAnchor:   window.c_marker_top_cfg[1],
            tooltipAnchor: [16, 0]
        }));
        mk.setRotationAngle(resRelay.properties['ffdirection']);
        mk.setRotationOrigin("center center");
        
        // mk.bindPopup(`Speed: ${resRelay.properties['ffspeed']}Km/h`,{
        //     maxHeight: 400,
        //     maxWidth: 100
        // });
        mk.bindTooltip(`Speed: ${resRelay.properties['ffspeed']} Km/h`, {
            position: 'bottom'
        });
        mk.openTooltip();
        stepIcon++;
        if (stepIcon === _lRelay.length) {
            clearInterval(runObj);
            startReplay();
        }
    }, 1000);
}
// Load Datatable

//End Load Datatable