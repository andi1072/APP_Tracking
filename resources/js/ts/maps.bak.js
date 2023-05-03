import 'leaflet/dist/leaflet.css';
import 'leaflet';
// import '../Leaflet.draw-0.4.14/dist/leaflet.draw';
// Is INIT
// var map = L.map('map', {drawControl: true}).setView([
var map = L.map('map').setView([
    0.378974, 113.739920
], 5);

// var _tileLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { // Earth View
var _tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '',
});
_tileLayer.addTo(map);

// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);
// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems
//     }
// });
// map.addControl(drawControl);


var geoOption = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.1,
}

var latlngs = [
    [-6.201655766896261, 106.6654244273562],
    [-6.202848074837508, 106.6688182700654],
    [-6.199600931989775, 106.66894585813718],
    [-6.200564929609571, 106.66996656271135],
    [-6.202137764048263, 106.67152313718701],
    [-6.201528925467236, 106.67239073607507],
    [-6.197901247684314, 106.67236521846073],
    [-6.198713037886509, 106.67323281734879],
    [-6.199778510631079, 106.6739473105507],
    [-6.19947409006653, 106.6757590611699],
    [-6.198332511384764, 106.67703494188765],
    [-6.197140193235335, 106.67734115325992],
    [-6.195288289491163, 106.67688183620153],
    [-6.194019858519706, 106.67529974411153],
    [-6.194780917468342, 106.67154865480136],
    [-6.197571457557876, 106.6678486007199],
    [-6.201351347415353, 106.66532235689878],
];
var polygon = L.polygon(latlngs, geoOption);
polygon.addTo(map)

var circleCenter = [-6.185516814931187, 106.65147352464736];
var circle = L.circle(circleCenter, 500, geoOption);
circle.addTo(map);


var greenIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var myFGMarker = new L.FeatureGroup();
var marker = L.marker({ lat: -6.201655766896261, lng: 106.6654244273562 },
    { icon: greenIcon });
myFGMarker.addLayer(marker);
myFGMarker.addTo(map);

map.fitBounds(myFGMarker.getBounds());
// End INIT
