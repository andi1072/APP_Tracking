import{_ as w}from"./leaflet.rotatedMarker-71d1d069.js";import"./leaflet-svg-shape-markers-8f7f1e58.js";import"./_commonjsHelpers-28e086c5.js";const y=window.burl,b=io("http://110.5.105.26:41257"),x="/assets/images/leaflet/toll_gate.png";var r=L.map("devicesmap",{minZoom:5,attributionControl:!1,fullscreenControl:!0}).setView([.33995192349439596,120.3733680354565],5),p=new L.FeatureGroup,n={},u=[],m,_=function(e){return L.icon({iconUrl:e,iconSize:window.c_marker_front_cfg[0],iconAnchor:window.c_marker_front_cfg[1],popupAnchor:window.c_marker_front_cfg[2]})},k=function(){return Math.floor(Math.random()*16777215).toString(16)},v=[],g,h=[],G=L.tileLayer(window.mapLayer,{attribution:""});G.addTo(r);var A=function(e){return`<h3 class="h6 d-block text-uppercase font-weight-bold">${e.ftdevice_name}</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">Last Update</div><div class="col-7 pl-4">${window.dtHumanParse(e.created_at)}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">Vehicle ID</div><div class="col-7 pl-4">${e.ftasset_id}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">Vehicle Name</div><div class="col-7 pl-4">${e.ftasset_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark"></div>`};$.get(y+"/devtools/monitor/js/devices",function(e){$.each(e.data.data,function(o,t){var a=new w([t.fflat,t.fflon],{draggable:!1,riseOnHover:!0,icon:_(window.c_marker_front)});a.bindTooltip(t.ftasset_id).openTooltip();var i=L.popup().setContent(A(t));a.bindPopup(i,{className:"custom-popup"}).openPopup(),n[t.ftdevice_id]=a,n[t.ftdevice_id].__pathColor=`#${k()}`,a.addTo(r),p.addLayer(a),p.addTo(r)}),e.data.data.length!=0?r.fitBounds(p.getBounds()):console.log("No Data"),P()});function P(){b.on("trx_device_data_rcv",function(e){var o=JSON.parse(e);if(typeof n[o.id]<"u"){var t={lat:o.lat,lng:o.lon},a=new L.Polyline([n[o.id]._latlng,t],{color:n[o.id].__pathColor,weight:5,opacity:.5,smoothFactor:1});a.addTo(r),n[o.id].slideTo([o.lat,o.lon],{duration:5e3,keepAtCenter:!1});var i=L.icon({iconUrl:window.c_marker_top,iconSize:window.c_marker_top_cfg[0],iconAnchor:window.c_marker_top_cfg[1],popupAnchor:window.c_marker_top_cfg[2]});n[o.id].setIcon(i),n[o.id].setRotationAngle(o.direction),n[o.id].setRotationOrigin("center center"),n[o.id]._latlng=t,setTimeout(function(){n[o.id].setIcon(_(window.c_marker_front)),n[o.id].setRotationAngle(0)},3e5)}})}$.get(y+"/devtools/js/gate/zone",function(e){$.each(e.data,function(o,t){v.push({type:"Feature",properties:{created_at:t.created_at,fflat:t.fflat,fflon:t.fflon,fnpayment_type:t.fnpayment_type,ftdescription:t.ftdescription,ftname:t.ftname,ftsection:t.ftsection,id:t.id},geometry:{type:"Point",coordinates:[parseFloat(t.fflon),parseFloat(t.fflat)]}}),h.push({type:"Feature",properties:{fntype:t.fntype},geometry:{type:"Polygon",coordinates:[t.polygon]}})}),e.data.length!=0?(S(r),C(r)):console.log("No Data")});var f;r.on("click",function(e){u=[];var o=e.latlng.lat,t=e.latlng.lng;f&&r.removeLayer(f),f=L.circle([o,t],1e4).addTo(r),$.get(`${y}/devtools/js/tollsectionpoint?latlng=${o},${t}`,function(a){$.each(a.data,function(i,l){u.push({type:"Feature",properties:{},geometry:{type:"Point",coordinates:[parseFloat(l.fflon),parseFloat(l.fflat)]}})}),a.data.length!=0&&T(r)})});function S(e){var o=new L.featureGroup([]),t={type:"FeatureCollection",name:"relay",features:v};function a(l,d){var c=l.properties,s="n/a";c.fnpayment_type===1?s="Open":c.fnpayment_type===2&&(s="Close"),d.bindPopup(`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${c.ftname}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">SECTION</div><div class="col-7 pl-4">${c.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">PAYMENT TYPE</div><div class="col-7 pl-4">${s}</div></div>`,{maxHeight:400}),d.bindTooltip(c.ftname)}e.createPane("pane_Gate"),e.getPane("pane_Gate").style.zIndex=402,e.getPane("pane_Gate").style["mix-blend-mode"]="normal";var i=new L.geoJson(t,{attribution:"",interactive:!0,dataVar:"jGate",layerName:"lGate",pane:"pane_Gate",onEachFeature:a,pointToLayer:function(l,d){return L.marker(d,{icon:L.icon({iconUrl:x,iconSize:[30,30],iconAnchor:[16,25],popupAnchor:[0,-15]})})}});o.addLayer(i),e.addLayer(i),e.fitBounds(o.getBounds())}function C(e){var o={type:"FeatureCollection",name:"polyGates",features:h};function t(a){return a.properties.fntype===1?{pane:"pane_polyGates",opacity:1,color:"#00FFCA",dashArray:"",lineCap:"square",lineJoin:"bevel",weight:2,fillOpacity:1,interactive:!0}:{pane:"pane_polyGates",opacity:1,color:"#ED2B2A",dashArray:"",lineCap:"square",lineJoin:"bevel",weight:2,fillOpacity:1,interactive:!0}}e.createPane("pane_polyGates"),e.getPane("pane_polyGates").style.zIndex=401,e.getPane("pane_polyGates").style["mix-blend-mode"]="normal",g=new L.geoJson(o,{attribution:"",interactive:!0,dataVar:"json_polyGates",layerName:"layer_polyGates",pane:"pane_polyGates",style:t,pointToLayer:function(a,i){return window._newMarker(i,{icon:L.icon({iconUrl:window.gateUrl,iconSize:[30,30],iconAnchor:[8,25],popupAnchor:[0,-20]})},a.properties.gate_name,`<h3 class="h6 text-center d-block text-uppercase font-weight-bold">INFO</h3><span class="bottom-line d-block mx-auto mt-3 mb-4"></span><div class="row my-2 mx-auto"><div class="col text-right border-right border-dark">GATE NAME</div><div class="col-7 pl-4">${a.properties.gate_name}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">SECTION</div><div class="col-7 pl-4">${a.properties.ftsection}</div></div><div class="row my-2 mx-auto"><div class="col-5 text-right border-right border-dark">DECLARE</div><div class="col-7 pl-4">${a.properties.ftdeclaration_type}</div></div>`)}}),e.addLayer(g)}function T(e){var o={type:"FeatureCollection",name:"section",features:u};function t(){return{pane:"pane_Section",shape:"circle",radius:4,opacity:1,color:"#000000",dashArray:"",lineCap:"butt",lineJoin:"miter",weight:1,fill:!1,fillOpacity:1,fillColor:"#000000",interactive:!0}}e.createPane("pane_Section"),e.getPane("pane_Section").style.zIndex=402,e.getPane("pane_Section").style["mix-blend-mode"]="normal",m=new L.geoJson(o,{attribution:"",interactive:!0,dataVar:"jSection",layerName:"lSection",pane:"pane_Section",pointToLayer:function(a,i){return L.shapeMarker(i,t())}}),e.addLayer(m)}
