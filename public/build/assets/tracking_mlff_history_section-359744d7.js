var t,d,n=new L.featureGroup([]),s,c,v=$("#tblmlff_sec").DataTable({lengthChange:!1,order:[[1,"desc"]],scrollX:!0,columnDefs:[{visible:!1,targets:[0]},{targets:-1,defaultContent:'<button class="btnview btn btn-pure btn-primary icon md-view waves-effect waves-classic">Log</button>'}]}),m=null;$("#tblmlff_sec tbody").on("click","button.btnview",function(){var a=v.row($(this).parents("tr")).data();m=a[0],$("#modallog").modal("show"),console.log(a[0])});var f=$("input[name=_deviceid]").val();console.log(f);axios.get(`${window.burl}/devtools/mlff/js/history/section?did=${f}`).then(a=>{a.data.data.length<=0||$.each(a.data.data,function(i,o){var r="-",l="-";o.fdexit_time&&(r=window.dtHumanParse(o.fdexit_time),l=o.ftexit_location),v.row.add([o.id,window.dtHumanParse(o.fdentry_time),o.ftentry_location,r,l]).draw(!0)})}).catch(a=>{console.log(a)});$("#modallog").on("shown.bs.modal",function(){if(!t){t=L.map("trackingmlff_log",{minZoom:5,fullscreenControl:!0,attributionControl:!1}).setView([.33995192349439596,120.3733680354565],5);var a=L.tileLayer(window.mapLayer);a.addTo(t)}$.get(`${window.burl}/devtools/mlff/js/history/section/log?section_history=${m}`,function(i){console.log(i.data.data);var o=i.data.data;i.data.routes&&p(o,i.data.routes)})});$("#modallog").on("hidden.bs.modal",function(){t.removeLayer(d),s&&t.removeLayer(s),c&&t.removeLayer(c),t.removeLayer(n)});function p(a,i){var o={type:"FeatureCollection",name:"line_relay",features:[{type:"Feature",properties:a,geometry:{type:"LineString",coordinates:i}}]};function r(l){n=new L.featureGroup([]);var e=l.properties;return s=window._newMarker({lat:parseFloat(e.ffentry_lat),lng:parseFloat(e.ffentry_lon)},{icon:L.icon({iconUrl:`${window.burl}/assets/images/leaflet/entry.png`,iconSize:[30,30],iconAnchor:[16,25],popupAnchor:[0,-15]})},e.gate_name,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${e.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(e.fddeclaration)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">TOLL SECTION</div><div class="col-7 pl-4">${e.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DECLARATION</div><div class="col-7 pl-4">${e.ftdeclaration_type}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">PAYMENT TYPE</div><div class="col-7 pl-4">${e.ftpayment_type}</div></div>`).addTo(t),e.fdexit_time&&(c=window._newMarker({lat:parseFloat(e.ffexit_lat),lng:parseFloat(e.ffexit_lon)},{icon:L.icon({iconUrl:`${window.burl}/assets/images/leaflet/exit.png`,iconSize:[30,30],iconAnchor:[16,25],popupAnchor:[0,-15]})},e.gate_name,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${e.gate_exit_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(e.fddeclaration_exit)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">TOLL SECTION</div><div class="col-7 pl-4">${e.gate_exit_ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DECLARATION</div><div class="col-7 pl-4">${e.ftdeclaration_exit}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">PAYMENT TYPE</div><div class="col-7 pl-4">${e.gate_exit_ftpayment_type}</div></div>`).addTo(t)),{pane:"pane_line_relay",opacity:1,color:"#FF0032",dashArray:"",lineCap:"square",lineJoin:"bevel",weight:1,fillOpacity:0,interactive:!0}}t.createPane("pane_line_relay"),t.getPane("pane_line_relay").style.zIndex=401,t.getPane("pane_line_relay").style["mix-blend-mode"]="normal",d=new L.geoJson(o,{attribution:"",interactive:!0,dataVar:"json_line_relay",layerName:"layer_line_relay",pane:"pane_line_relay",style:r}),n.addLayer(d),t.addLayer(d),t.fitBounds(n.getBounds())}