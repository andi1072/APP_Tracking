const d=window.burl,u=$("input[name=_id]").val();var i=[],p=window.mapLayer,m=L.tileLayer(p,{minZoom:5}),l=new L.Map("objmap",{center:new L.LatLng(.339951,120.373368),zoom:5,attributionControl:!1,fullscreenControl:!0}),r=L.featureGroup().addTo(l),s={},g=0;L.Control.geocoder().addTo(l);L.control.layers({osm:m.addTo(l),google:L.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",{attribution:"google"})},{drawlayer:r},{position:"topright",collapsed:!1}).addTo(l);self.resPolygon={};self.drawControlFull=new L.Control.Draw({edit:{featureGroup:r,poly:{allowIntersection:!1}},draw:{polygon:{allowIntersection:!1,showArea:!0},polyline:!1,rectangle:!1,marker:!1,circle:!1,circlemarker:!1}});self.drawControlEdit=new L.Control.Draw({edit:{featureGroup:r,poly:{allowIntersection:!1}},draw:!1});l.addControl(drawControlFull);l.on(L.Draw.Event.CREATED,function(n){if(self.Polygon||self.Circle)return alert("You can only create 1 location per geofence"),null;var e=n.layer;if(e._latlng&&e._mRadius)window.circle=e;else if(e._latlngs&&e._bounds){if(i=e._latlngs[0],i.length<4)return alert("Minimum 4 points required!"),null;self.Polygon=e,self.Polygon.setStyle({color:"#16FF00",fillColor:"#16FF00",fillOpacity:.1})}else return swal("Please make 1 Geofencing!","","Warning"),null;self.drawControlFull.remove(),self.drawControlEdit.addTo(l),r.addLayer(e)});l.on(L.Draw.Event.EDITED,function(n){var e=n.layers;e.eachLayer(function(o){if(!(o._latlng&&o._mRadius))if(o._latlngs&&o._bounds){if(i=o._latlngs[0],i.length<4)return toastr.error("Minimum 4 points required!","Warning"),self.Polygon.remove(),self.Polygon=null,self.drawControlEdit.remove(),self.drawControlFull.addTo(l),r.clearLayers(),null}else toastr.error("Please make 1 Geofencing!","Error")})});l.on(L.Draw.Event.DELETED,function(n){var e=n.layers;e.eachLayer(function(o){self.Circle=null,self.Polygon=null,i=[],self.drawControlEdit.remove(),self.drawControlFull.addTo(l)})});$("#formGeo").submit(function(n){n.preventDefault();var e=$("input[name=_backurl]").val(),o=new FormData;if(o.append("_token",$("input[name=_token]").val()),o.append("id",$("input[name=_id]").val()),o.append("txtName",$("input[name=txtName]").val()),o.append("txtAddress",$("textarea[name=txtAddress]").val()),o.append("_isEdit",g),typeof self.Polygon<"u"&&self.Polygon!==null){for(const[t,a]of Object.entries(s))delete s[t];$.each(self.Polygon._latlngs,function(t,a){$.each(a,function(f,c){s[f]={lat:c.lat,lng:c.lng}})}),console.log(JSON.stringify(s)),o.append("polygon_point",JSON.stringify(s))}else return toastr.error("Please make 1 Geofencing!","Warning"),null;$.ajax({type:"POST",url:d+"/restarea/js/add",data:o,dataType:"json",contentType:!1,cache:!1,processData:!1,beforeSend:function(){$("#formGeo").css("opacity",".5")},success:function(t){$("#formGeo").css("opacity","");var a=t.msg;a.code===200?(sio.emit("trx_downlink","{POLYGONLOAD}"),swal({title:"Success",text:"Continue editing?",type:"success",showCancelButton:!0,confirmButtonClass:"btn-primary",confirmButtonText:"Yes, continue editing!",cancelButtonText:"No, take me back!",closeOnConfirm:!1,closeOnCancel:!1},function(f){f?window.location.href=d+"/restarea/detail/"+u:window.location.href=e})):(console.log(t),toastr.error(t.msg,"Error"))}})});$.get(d+`/restarea/js/detail/${u}/point`,function(n){var e=[];if($.each(n.dataPoint,function(t,a){g=1,e.push([a.fflat,a.fflon])}),n.dataPoint.length!==0){var o=L.polygon(e);self.Polygon=o,r.addLayer(o),l.fitBounds(r.getBounds()),self.drawControlFull.remove(),self.drawControlEdit.addTo(l)}});