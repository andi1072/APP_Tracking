import"./leaflet-svg-shape-markers-8f7f1e58.js";import"./leaflet.rotatedMarker-71d1d069.js";import"./_commonjsHelpers-28e086c5.js";const n=window.burl,p=$("input[name=_deviceid]").val();var v=$("#tblmlfflist").DataTable({lengthChange:!1,order:[[1,"desc"]],scrollX:!0,columnDefs:[{visible:!1,targets:[0]},{targets:-1,defaultContent:'<button class="btnview btn btn-pure btn-primary icon md-view waves-effect waves-classic">Log</button>'}]}),g=null;$("#tblmlfflist tbody").on("click","button.btnview",function(){var i=v.row($(this).parents("tr")).data();g=i[0],$("#modallog").modal("show")});$.get(n+`/tracking/detail/js/mlff/${p}`,function(i){$.each(i.mlffHistoryData.data,function(r,a){var o="-",l="-",e="-";a.fddeclaration_exit&&(o=window.dtHumanParse(a.fddeclaration_exit),l=a.gate_exit_name,e=a.gate_exit_ftsection),v.row.add([a.id,window.dtHumanParse(a.fddeclaration),a.gate_name,a.ftsection,o,l,e,a.declaration_status]).draw(!0)})});var t,d,s=new L.featureGroup([]),c,m;$("#modallog").on("shown.bs.modal",function(){if(!t){t=L.map("trackingmlff_log",{minZoom:5,fullscreenControl:!0,attributionControl:!1}).setView([.33995192349439596,120.3733680354565],5);var i=L.tileLayer(window.mapLayer);i.addTo(t)}$.get(n+`/tracking/detail/js/mlff/log/${g}`,function(r){var a=r.data.data;r.data.routes&&_(a,r.data.routes)})});$("#modallog").on("hidden.bs.modal",function(){t.removeLayer(d),c&&t.removeLayer(c),m&&t.removeLayer(m),t.removeLayer(s)});function _(i,r){var a={type:"FeatureCollection",name:"line_relay",features:[{type:"Feature",properties:i,geometry:{type:"LineString",coordinates:r}}]};function o(l){var e=l.properties;return c=window._newMarker({lat:parseFloat(e.gate_lat),lng:parseFloat(e.gate_lon)},{icon:L.icon({iconUrl:`${n}/assets/images/leaflet/toll_gate.png`,iconSize:[30,30],iconAnchor:[16,25],popupAnchor:[0,-15]})},e.gate_name,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${e.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(e.fddeclaration)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">TOLL SECTION</div><div class="col-7 pl-4">${e.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DECLARATION</div><div class="col-7 pl-4">${e.ftdeclaration_type}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">PAYMENT TYPE</div><div class="col-7 pl-4">${e.ftpayment_type}</div></div>`).addTo(t),e.fddeclaration_exit&&(m=window._newMarker({lat:parseFloat(e.gate_exit_fflat),lng:parseFloat(e.gate_exit_fflon)},{icon:L.icon({iconUrl:`${n}/assets/images/leaflet/toll_gate.png`,iconSize:[30,30],iconAnchor:[16,25],popupAnchor:[0,-15]})},e.gate_name,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${e.gate_exit_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DATE TIME</div><div class="col-7 pl-4">${window.dtHumanParse(e.fddeclaration_exit)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">TOLL SECTION</div><div class="col-7 pl-4">${e.gate_exit_ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DECLARATION</div><div class="col-7 pl-4">${e.ftdeclaration_exit}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">PAYMENT TYPE</div><div class="col-7 pl-4">${e.gate_exit_ftpayment_type}</div></div>`).addTo(t)),{pane:"pane_line_relay",opacity:1,color:"#FF0032",dashArray:"",lineCap:"square",lineJoin:"bevel",weight:1,fillOpacity:0,interactive:!0}}t.createPane("pane_line_relay"),t.getPane("pane_line_relay").style.zIndex=401,t.getPane("pane_line_relay").style["mix-blend-mode"]="normal",d=new L.geoJson(a,{attribution:"",interactive:!0,dataVar:"json_line_relay",layerName:"layer_line_relay",pane:"pane_line_relay",style:o}),s.addLayer(d),t.addLayer(d),t.fitBounds(s.getBounds())}