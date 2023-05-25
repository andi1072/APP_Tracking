const url = window.burl;
const device_id = $("input[name=_deviceid]").val();
import 'leaflet-svg-shape-markers';
import DriftMarker from "leaflet-drift-marker";
import "leaflet-rotatedmarker";
var tblmlfflist = $('#tblmlfflist').DataTable({
    "lengthChange": false,
    order: [
        [1, 'desc']
    ],
    scrollX: true,
    "columnDefs": [
        { 'visible': false, 'targets': [0] },
        {
            // <button class="btn btn-info waves-effect waves-classic" data-content="And here's some amazing content. It's very engaging. Right?" data-trigger="hover" data-toggle="popover" data-original-title="Hover to trigger" tabindex="0" title="" type="button">Hover to trigger</button>
            targets: -1, 
            "defaultContent": '<button class="btnview btn btn-pure btn-primary icon md-view waves-effect waves-classic">Log</button>'
        },
    ]
}),_tmpMlffHistory_id = null;
{/* <th>Entry Time</th> */}
{/* <th>Entry Gate</th> */}
{/* <th>Toll Sec. Entry</th> */}
{/* <th>Exit Time</th> */}
{/* <th>Exit Gate</th> */}
{/* <th>Toll Sec. Exit</th> */}
{/* <th>Action</th> */}

$('#tblmlfflist tbody').on( 'click', 'button.btnview', function () {
    var data = tblmlfflist.row($(this).parents('tr')).data();
    _tmpMlffHistory_id = data[0];
    $('#modallog').modal('show');
});

$.get(url + `/tracking/detail/js/mlff/${device_id}`, function(res) {
    console.log(res)
    $.each(res.mlffHistoryData.data, function(k, v) {
        var _declareExit = '-', _nameExit = '-',_secExit = '-'
        if (v.fddeclaration_exit) {
            _declareExit = window.dtHumanParse(v.fddeclaration_exit);
            _nameExit = v.gate_exit_name;
            _secExit = v.gate_exit_ftsection;
        }
        tblmlfflist.row.add([
            v.id,window.dtHumanParse(v.fddeclaration), v.gate_name ,v.ftsection,_declareExit,_nameExit,_secExit,v.declaration_status
        ]).draw(true);
    });
});
var map, layer_line_relay,lRelay, _lRelay = [], bounds_group = new L.featureGroup([]),
_mkrEntry,_mkrExit;


$('#modallog').on('shown.bs.modal', function () {
    if (!map) {
        map = L.map('trackingmlff_log', {
            minZoom: 5,
            fullscreenControl: true,
            attributionControl: false,
        }).setView([
            0.33995192349439596, 120.3733680354565
        ], 5);
        var _tileLayer = L.tileLayer(window.mapLayer);
        _tileLayer.addTo(map);
    }
    $.get(url + `/tracking/detail/js/mlff/log/${_tmpMlffHistory_id}`, function(res) {
        var v = res.data.data;
        if (res.data.routes) {
            pointLines(v, res.data.routes);
        }
    });
})

$('#modallog').on('hidden.bs.modal', function () {
    map.removeLayer(layer_line_relay);
    if (_mkrEntry) { map.removeLayer(_mkrEntry)};
    if (_mkrExit) { map.removeLayer(_mkrExit) };
    map.removeLayer(bounds_group);
    _lRelay = [];
});

function pointLines(v,_lRelayLine) {
    var json_line_relay = {
        type: "FeatureCollection",
        name: "line_relay",
        features: [
            {
                type: "Feature",
                properties: v,
                geometry: {
                    type: "LineString",
                    coordinates: _lRelayLine,
                },
            },
        ]
    }
    
    function style_line_relay (feature) {
        var v = feature.properties;
        
        _mkrEntry = window._newMarker(
            {
                lat: parseFloat(v.gate_lat), 
                lng: parseFloat(v.gate_lon)
            },{
                icon: L.icon({
                iconUrl: `${url}/assets/images/leaflet/toll_gate.png`,
                iconSize:     [30, 30],
                iconAnchor:   [16, 25],
                popupAnchor:  [0, -15]
            })
        } ,v.gate_name,
            `<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
            `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
            `GATE NAME</div><div class="col-7 pl-4">${v.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            `DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(v.fddeclaration)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            `TOLL SECTION</div><div class="col-7 pl-4">${v.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
            `DECLARATION</div><div class="col-7 pl-4">${v.ftdeclaration_type}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
            `PAYMENT TYPE</div><div class="col-7 pl-4">${v.ftpayment_type}</div></div>`
        ).addTo(map);

        if (v.fddeclaration_exit) {
            _mkrExit = window._newMarker(
                {
                    lat: parseFloat(v.gate_exit_fflat), 
                    lng: parseFloat(v.gate_exit_fflon)
                },{
                    icon: L.icon({
                    iconUrl:    `${url}/assets/images/leaflet/toll_gate.png`,
                    iconSize:     [30, 30],
                    iconAnchor:   [16, 25],
                    popupAnchor:  [0, -15]
                })
            } ,v.gate_name,
                `<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
                `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
                `GATE NAME</div><div class="col-7 pl-4">${v.gate_exit_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
                `DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(v.fddeclaration_exit)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
                `TOLL SECTION</div><div class="col-7 pl-4">${v.gate_exit_ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
                `DECLARATION</div><div class="col-7 pl-4">${v.ftdeclaration_exit}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">`+
                `PAYMENT TYPE</div><div class="col-7 pl-4">${v.gate_exit_ftpayment_type}</div></div>`
            ).addTo(map);
        }
        
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
    bounds_group.addLayer(layer_line_relay);
    map.addLayer(layer_line_relay);
    map.fitBounds(bounds_group.getBounds());
}
