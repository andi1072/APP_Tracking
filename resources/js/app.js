import './bootstrap';
import $ from 'jquery';
window.jQuery = $;
import 'popper.js';

const url = location.protocol + '//' + window.location.host;
window.burl = url;
window.iconUrl = url + '/assets/images/leaflet/marker-icon.png';
window.shadowUrl = url + '/assets/images/leaflet/marker-shadow.png';
window.gateUrl = url + '/assets/images/leaflet/toll_gate.png';
window.c_marker_top = url + "/assets/images/leaflet/yellow-car-top.png";
window.c_marker_top_cfg = [
    [16, 30], //iconsize
    [5,16], //iconancor
    [0, -25] //popancor
]
window.c_marker_front = url + '/assets/images/leaflet/yellow-car40px.png';
window.c_marker_front_cfg = [
    [28, 28], //size
    [15, 20], //ancor
    [0, -15] //popancor
]
// window.mapLayer = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
window.mapLayerOpenStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
window.mapLayer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

window.uuidv4 = function() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
// const sio = io("http://110.5.105.26:41257");
// const sio = io("http://127.0.0.1:3090");
// window.sio = sio;

// sio.on("trx_device_geo_rcv", function (data) {
//     var res = JSON.parse(data);
//     if (res.type === 'geo_notif') {
//         axios.get(url + `/info/js/geonotif/${res.id}/${res.geoid}`).then(rr => {
//             if (res.declare == 1) {
//                 toastr.options.closeDuration = 10000;
//                 toastr.success(`${rr.data.dataDevice.ftasset_name} <i><b>Enter</b></i> ${rr.data.dataGeo.ftgeo_name}`, 'Geo Notification');
//             } else {
//                 toastr.warning(`${rr.data.dataDevice.ftasset_name} <i><b>Exit</b></i> ${rr.data.dataGeo.ftgeo_name}`, 'Geo Notification');
//             }
//         }).catch(err => { });
//     }else if (res.type === 'geo_mlff_notif') {
//         console.log('res',res)
//     }
// });

const offsetTz = new Date().getTimezoneOffset();
window.dtHumanID = function () {
    const tzCode = parseInt(- (offsetTz / 60));
    if (tzCode > 0) {
        return `+${tzCode}`;
    } else {
        return `${tzCode}`;
    }
};
window.dtHumanName = function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
    // return moment.tz.guess();
};
// var visitortime = new Date();
// var visitortimezone = "GMT " + - visitortime.getTimezoneOffset() / 60;
window.dtHumanParse = function (isDateTime) {
    if (!isDateTime) { return null }
    var date = {
        // utc: '2013-10-16T21:31:51',
        utc: isDateTime.toString(),
        offset: offsetTz
    }
    //MM/DD/YYYY h:mm A - am/pm
    //dd Month yyyy - hh:i
    return moment.utc(date.utc).zone(date.offset).format('YYYY-MM-DD HH:mm:ss');
}


window._newMarker = function(latLng,customIcon = null,customToolTip = null, customPopUp = null) {
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
    return mkr;
}

console.log(window.dtHumanID(), window.dtHumanName());
// const button = document.querySelector("button");

// if (window.self !== window.top) {

//     if (Notification?.permission === "granted") {
//         // If the user agreed to get notified
//         // Let's try to send ten notifications
//         let i = 0;
//         // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
//         const interval = setInterval(() => {
//             // Thanks to the tag, we should only see the "Hi! 9" notification
//             const n = new Notification(`Hi! ${i}`, { tag: "soManyNotification" });
//             if (i === 9) {
//                 clearInterval(interval);
//             }
//             i++;
//         }, 200);
//     } else if (Notification && Notification.permission !== "denied") {
//         // If the user hasn't told if they want to be notified or not
//         // Note: because of Chrome, we are not sure the permission property
//         // is set, therefore it's unsafe to check for the "default" value.
//         Notification.requestPermission((status) => {
//             // If the user said okay
//             if (status === "granted") {
//                 let i = 0;
//                 // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
//                 const interval = setInterval(() => {
//                     // Thanks to the tag, we should only see the "Hi! 9" notification
//                     const n = new Notification(`Hi! ${i}`, {
//                         tag: "soManyNotification",
//                     });
//                     if (i === 9) {
//                         clearInterval(interval);
//                     }
//                     i++;
//                 }, 200);
//             } else {
//                 // Otherwise, we can fallback to a regular modal console.log
//                 console.log("Hi!");
//             }
//         });
//     } else {
//         // If the user refuses to get notified, we can fallback to a regular modal console.log
//         console.log("Hi!");
//     }
// }

$(() => {
    // console.log('isJQ')

    Site.run();
});
// (function(document, window, $){
//   'use strict';
//   var Site = window.Site;
//   $(document).ready(function(){
//     Site.run();
//   });
// })(document, window, jQuery);