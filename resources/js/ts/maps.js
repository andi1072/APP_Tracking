import 'leaflet/dist/leaflet.css';
import 'leaflet';

var map = L.map('objmap', {
    minZoom: 5,
}).setView([
    0.339951, 120.373368
], 5);

var _tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '',
});
_tileLayer.addTo(map);