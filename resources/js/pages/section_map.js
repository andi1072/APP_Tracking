import 'leaflet-svg-shape-markers';

var map = L.map('sectionmap', {
    minZoom: 5,
    attributionControl: false,
    fullscreenControl: true,
}).setView([
    0.33995192349439596, 120.3733680354565
], 5), myFGMarker = new L.FeatureGroup(), _lGate = [], _lSection = [], lSection;

var _tileLayer = L.tileLayer(window.mapLayerOpenStreet, {
    attribution: '',
});
_tileLayer.addTo(map);

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
            color: '#000000',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1.0,
            fill: false,
            fillOpacity: 1,
            fillColor: '#000000',
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

var _switchBtn = 0, newMkrCollection = [],_tmpLatlng = '';

$("input[name='ckScanPoints']").change(function(){
    _switchBtn = 0;
});

$("input[name='ckAddPoints']").change(function(){
    _switchBtn = 1;
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
            $('#formSection').css("opacity", ".5");
        }
        , success: function (res) {
            $('#formSection').css("opacity", "");
            var r = res.msg;
            if (r.code === 200) {
                toastr.success('Saved.', 'Error');
            } else {
                console.log(res)
                toastr.error(res.msg.obj, 'Error');
            }
            
        }
    });
}

L.DomUtil.addClass(map._container, 'crosshair-cursor-enabled');
// var circleScan;
map.on('click', function (e) {
    // L.DomUtil.removeClass(map._container, 'crosshair-cursor-enabled');
    var lat = e.latlng.lat,
    lon = e.latlng.lng, latlng = {lat: e.latlng.lat,lng: e.latlng.lng};
    switch (_switchBtn) {
        case 0:
            _lSection = [];
            
            // if (circleScan) {
            //     map.removeLayer(circleScan);
            // }
            // _tmpMarker = window._newMarker({lat: lat,lng: lon}).addTo(map);
            // circleScan = L.circle([lat,lon], 10000).addTo(map);
            $.get(`${window.burl}/devtools/js/tollsectionpoint?latlng=${lat},${lon}`, function (res) {
                $.each(res.data, function (k, v) {
                    _lSection.push({
                        type: "Feature",
                        properties: {},
                        geometry: { type: "Point", coordinates: [parseFloat(v.fflon), parseFloat(v.fflat)] },
                    });
                })

                if (res.data.length != 0) {
                    pointing_section(map);
                }
            });
            break;
        case 1:
            var _nMkr = window._newMarker(latlng, {
                icon : L.icon({
                    iconUrl: '/assets/images/leaflet/marker-reddot.png',
                    iconSize:     [8, 16],
                    iconAnchor:   [5, 14],
                }),
                interactive: true
            });
            _nMkr.addTo(map);
            // newMkrCollection.push(_nMkr);
            __save(JSON.stringify(_nMkr._latlng))
            break;
        default:
            console.log("No Action");
    }
})