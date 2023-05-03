import DriftMarker from "leaflet-drift-marker";
import "leaflet-rotatedmarker";
import 'leaflet-svg-shape-markers';

const gateIcon = '/assets/images/leaflet/toll_gate.png';
var map = L.map('devicesmap', {
    minZoom: 5,
    attributionControl: false,
    fullscreenControl: true,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5), _lGate = [],layer_polyGates,_lPolyGate = [];

var _tileLayer = L.tileLayer(window.mapLayer, {
    attribution: '',
});
_tileLayer.addTo(map);


$.get(window.burl + "/devtools/js/gate/zone", function (res) {
    $.each(res.data, function (k, v) {
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
        _lPolyGate.push({
            "type": "Feature",
            "properties": {
                fntype: v.fntype
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [v.polygon]
            }
        })
    });
    
    if ( res.data.length != 0) {
        pointing_gate(map);
        polyGates(map)
    }else{
        console.log('No Data')
    }
});

//Geo Json
function pointing_gate(map) {
    var bounds_group = new L.featureGroup([]);
    var jGate = {
        type: "FeatureCollection",
        name: "gate",
        features: _lGate
    };
    
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

function polyGates(map) {
    var json_polyGates = {
        type: "FeatureCollection",
        name: "polyGates",
        features: _lPolyGate
    }

    function style_polyGates (feature) {
        if (feature.properties.fntype === 1) {
            return {
                pane: 'pane_polyGates',
                opacity: 1,
                color: '#00FFCA',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1,
                fillOpacity: 1,
                interactive: true,
            }
        }else{
            return {
                pane: 'pane_polyGates',
                opacity: 1,
                color: '#ED2B2A',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                weight: 1,
                fillOpacity: 1,
                interactive: true,
            }
        }
    }

    map.createPane('pane_polyGates');
    map.getPane('pane_polyGates').style.zIndex = 401;
    map.getPane('pane_polyGates').style['mix-blend-mode'] = 'normal';
    layer_polyGates = new L.geoJson(json_polyGates, {
        attribution: '',
        interactive: true,
        dataVar: 'json_polyGates',
        layerName: 'layer_polyGates',
        pane: 'pane_polyGates',
        style: style_polyGates,
        pointToLayer: function(v, latlng) {
            // console.log(v);
            return window._newMarker(latlng, {
                icon : L.icon({
                    iconUrl: window.gateUrl,
                    iconSize:     [30, 30],
                    iconAnchor:   [8, 25],
                    popupAnchor:  [0, -20]
                })
            },v.properties.gate_name,
            `<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
            `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
            `GATE NAME</div><div class="col-7 pl-4">${v.properties.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            `SECTION</div><div class="col-7 pl-4">${v.properties.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
            `DECLARE</div><div class="col-7 pl-4">${v.properties.ftdeclaration_type}</div></div>`)
        },
    });
    map.addLayer(layer_polyGates);
}

// Relay Point
var lRelay,_lRelay,device_id = '',_lRelayLine = [],runObj,layer_line_relay,mk,stepIcon = 0;

$('#formMapTrackDev').submit(function (e) {
    e.preventDefault();
    _dtfrom = $("input[name=txtdtfrom]").val();
    _dtto = $("input[name=txtdtto]").val();

    if (device_id === '') {
        toastr.warning('Please select the Device.', 'Validation');
        return null;
    }

    _lRelay = [];
    _lRelayLine = [];
    if (lRelay) {
        map.removeLayer(lRelay);
        map.removeLayer(layer_line_relay);
    }
    if (runObj) {
        clearInterval(runObj);
    }
    
    $.get(`${window.burl}/tracking/detail/js/map?did=${device_id}&from=${_dtfrom}&to=${_dtto}&humanTz=${window.dtHumanName()}`, function (res) {
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
        $.each(res.relay.geo_gate, function (k, v) {
            // console.log(v)
            _lPolyGate.push({
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    // "coordinates": [[
                    //     [-104.05, 48.99],
                    //     [-97.22,  48.98],
                    //     [-96.58,  45.94],
                    //     [-104.03, 45.94],
                    //     [-104.05, 48.99]
                    // ]]
                    "coordinates": [v.polygon]
                }
            })
            _lPolyGate.push({
                "type": "Feature",
                "properties": v,
                "geometry": {
                    "type": "Point",
                    "coordinates": [v.gate_lon, v.gate_lat]
                }
            })
            // console.log(_lPolyGate)
        });
        if ( res.relay.data.length != 0) {
            relay_pointing();
            pointLines();
            startReplay();
        }else{
            toastr.info('Vehicle tracking not found.', 'Information');
        }
    });
});

function relay_pointing() {
    var bounds_group = new L.featureGroup([]);
    var jRelay = {
        type: "FeatureCollection",
        name: "relay",
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
            return L.shapeMarker(latlng, style_Relay());
        },
    });
    bounds_group.addLayer(lRelay);
    map.addLayer(lRelay);
    map.fitBounds(bounds_group.getBounds());
}
// End Of Relay Point

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
    map.addLayer(layer_line_relay);
}

// End Of Geo JSON

// Animation
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
        
        mk.bindTooltip(`Speed: ${resRelay.properties['ffspeed']} Km/h`, {
            position: 'bottom'
        });
        mk.openTooltip();
        stepIcon++;
        if (stepIcon === _lRelay.length) {
            clearInterval(runObj);
            startReplay();
        }
    }, 500);
}
// End of Animation

// Select Object
$("#sel_device").select2();
axios.get(`${window.burl}/devtools/js/sel_device`).then(rr => {
    $("#sel_device").select2({
        data: rr.data.devices
    });
}).catch(err => {
    console.log(err);
});

$("#sel_device").on("change",function () {
    device_id = $('#sel_device').val();
});

// End Select Object

function between(x, min, max) {
    return x >= min && x <= max;
}