var map = L.map('map');
map.setView([21.1458, 79.0882], 12.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var searchControl = L.control.geocoder({
    defaultMarkGeocode: false,
    collapsed: false,
    placeholder: "Search location..."
}).addTo(map);

// Handle geocode event
searchControl.on('markgeocode', function(e) {
    map.setView(e.geocode.center, 14); // Set view to the searched location
    L.marker(e.geocode.center).addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
});

function checkWindowSize() {
    var windowWidth = window.innerWidth;
    if (windowWidth < 600) {
        window.location.href = 'reportpage.html';
    }
}
window.addEventListener('resize', checkWindowSize);
window.onload = checkWindowSize;