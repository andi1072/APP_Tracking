var map, layer_line_relay, lRelay, _lRelay = [], bounds_group = new L.featureGroup([]),
    _mkrEntry, _mkrExit;
// Table Mlff List
var tblmlff_sec = $('#tblmlff_sec').DataTable({
    "lengthChange": false,
    order: [
        [1, 'desc']
    ],
    scrollX: true,
    "columnDefs": [
        { 'visible': false, 'targets': [0] },
        {
            targets: -1,
            "defaultContent": '<button class="btnview btn btn-pure btn-primary icon md-view waves-effect waves-classic">MAP</button>'
        },
    ],

}), _tmpMlffHistory_id = null;

$('#tblmlff_sec tbody').on('click', 'button.btnview', function () {
    var data = tblmlff_sec.row($(this).parents('tr')).data();
    _tmpMlffHistory_id = data[0];
    $('#modallog').modal('show');
    console.log(data[0])
});
// EOF
// Select Object
// $("#sel_device").select2();
// axios.get(`${window.burl}/devtools/js/sel_device`).then(rr => {
//     $("#sel_device").select2({
//         data: rr.data.devices
//     });
// }).catch(err => {
//     console.log(err);
// });

var device_id = $('input[name=_deviceid]').val();
axios.get(`${window.burl}/devtools/mlff/js/history/section?did=${device_id}`).then(rr => {
    if (rr.data.data.length <= 0) { return }
    $.each(rr.data.data, function (k, v) {
        console.log(k,v)
        var _tmpExit = '-', _tmpLoc = '-';
        if (v.fdexit_time) {
            _tmpExit = window.dtHumanParse(v.fdexit_time);
            _tmpLoc = v.ftexit_location;
        }
        // <th>#</th>
        // <th>Entry Time</th>
        // <th>Entry Gate</th>
        // <th>Entry Point</th>
        // <th>Entry Section</th>
        // <th>Exit Time</th>
        // <th>Exit Gate</th>
        // <th>Exit Point</th>
        // <th>Exit Section</th>
        // <th>Distence</th>

        // "id": "72609a19-0ecb-4159-b27f-e4b7d48c0581",
        // "fdentry_time": "2023-08-04 04:02:35",
        // "ftentry_gate": null,
        // "ftentry_point": "-6.181197, 106.794144",
        // "ftentry_section": "janger",
        // "fdexit_time": "2023-08-04 04:06:14",
        // "ftexit_gate": null,
        // "ftexit_point": "-6.212467, 106.662008",
        // "ftexit_section": null,
        // "ffdistence_section": "15.70145641411461"
        tblmlff_sec.row.add([
            // v.id, window.dtHumanParse(v.fdentry_time), v.ftentry_location, _tmpExit, _tmpLoc
            v.id,
            window.dtHumanParse(v.fdentry_time),
            v.ftentry_gate,
            v.ftentry_point,
            v.ftentry_section,
            window.dtHumanParse(v.fdexit_time),
            v.ftexit_gate,
            v.ftexit_point,
            v.ftexit_section,
            v.ffdistence_section
        ]).draw(true);
    });
}).catch(err => {
    console.log(err);
});

// $("#sel_device").on("change",function () {
//     tblmlff_sec.clear().draw();
//     var device_id = $('#_deviceid').val();
//     axios.get(`${window.burl}/devtools/mlff/js/history/section?did=${device_id}`).then(rr => {
//         if (rr.data.data.length <= 0) { return }
//         $.each(rr.data.data, function(k, v) {
//             // console.log(k,v)
//             var _tmpExit = '-', _tmpLoc = '-';
//             if(v.fdexit_time) {
//                 _tmpExit = window.dtHumanParse(v.fdexit_time);
//                 _tmpLoc = v.ftexit_location;
//             }

//             tblmlff_sec.row.add([
//                 v.id,window.dtHumanParse(v.fdentry_time), v.ftentry_location ,_tmpExit,_tmpLoc
//             ]).draw(true);
//         });
//     }).catch(err => {
//         console.log(err);
//     });
// });

// End Select Object

// Modal
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
    // http://127.0.0.1:8989/devtools/mlff/js/history/section/log?section_history=20b75454-844c-4369-886f-11f074ce27ba
    $.get(`${window.burl}/devtools/mlff/js/history/section/log?section_history=${_tmpMlffHistory_id}`, function (res) {
        console.log(res.data.data)
        var v = res.data.data;
        if (res.data.routes) {
            pointLines(v, res.data.routes);
        }
    });
})

$('#modallog').on('hidden.bs.modal', function () {
    map.removeLayer(layer_line_relay);
    if (_mkrEntry) { map.removeLayer(_mkrEntry) };
    if (_mkrExit) { map.removeLayer(_mkrExit) };
    map.removeLayer(bounds_group);
    _lRelay = [];
});
// End Modal

// Init Maps
function pointLines(v, _lRelayLine) {
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

    function style_line_relay(feature) {
        bounds_group = new L.featureGroup([]);
        var v = feature.properties;

        // _mkrEntry = window._newMarker(
        //     {
        //         lat: parseFloat(v.ffentry_lat),
        //         lng: parseFloat(v.ffentry_lon)
        //     }, {
        //     icon: L.icon({
        //         iconUrl: `${window.burl}/assets/images/leaflet/entry.png`,
        //         iconSize: [30, 30],
        //         iconAnchor: [16, 25],
        //         popupAnchor: [0, -15]
        //     })
        // }, v.gate_name,
        //     `<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
        //     `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
        //     `GATE NAME</div><div class="col-7 pl-4">${v.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        //     `DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(v.fddeclaration)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        //     `TOLL SECTION</div><div class="col-7 pl-4">${v.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        //     `DECLARATION</div><div class="col-7 pl-4">${v.ftdeclaration_type}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
        //     `PAYMENT TYPE</div><div class="col-7 pl-4">${v.ftpayment_type}</div></div>`
        // ).addTo(map);
        _mkrEntry = window._newMarker(
            {
                lat: parseFloat(v.ffentry_lat),
                lng: parseFloat(v.ffentry_lon)
            }, {
            icon: L.icon({
                iconUrl: `${window.burl}/assets/images/leaflet/entry.png`,
                iconSize: [40, 40],
                iconAnchor: [19, 34],
                popupAnchor: [0, -15]
            })
        }, v.gate_name,null).addTo(map);

        if (v.fdexit_time) {
            // _mkrExit = window._newMarker(
            //     {
            //         lat: parseFloat(v.ffexit_lat),
            //         lng: parseFloat(v.ffexit_lon)
            //     }, {
            //     icon: L.icon({
            //         iconUrl: `${window.burl}/assets/images/leaflet/exit.png`,
            //         iconSize: [30, 30],
            //         iconAnchor: [16, 25],
            //         popupAnchor: [0, -15]
            //     })
            // }, v.gate_name,
            //     `<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span>` +
            //     `<div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">` +
            //     `GATE NAME</div><div class="col-7 pl-4">${v.gate_exit_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            //     `DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(v.fddeclaration_exit)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            //     `TOLL SECTION</div><div class="col-7 pl-4">${v.gate_exit_ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            //     `DECLARATION</div><div class="col-7 pl-4">${v.ftdeclaration_exit}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">` +
            //     `PAYMENT TYPE</div><div class="col-7 pl-4">${v.gate_exit_ftpayment_type}</div></div>`
            // ).addTo(map);
            _mkrExit = window._newMarker(
                {
                    lat: parseFloat(v.ffexit_lat),
                    lng: parseFloat(v.ffexit_lon)
                }, {
                icon: L.icon({
                    iconUrl: `${window.burl}/assets/images/leaflet/exit.png`,
                    iconSize: [40, 40],
                    iconAnchor: [19, 34],
                    popupAnchor: [0, -15]
                })
            }, v.gate_name,null).addTo(map);
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

// Eof Maps