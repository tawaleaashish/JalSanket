import supabase from "../supabaseClient.js";

let today = new Date();
let year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let day = today.getDate().toString().padStart(2, '0');
let formattedDate = `${year}-${month}-${day}`;


var map = L.map('map');
map.setView([21.1458,79.0882], 12.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let latitude="";
let longitude="";

navigator.geolocation.watchPosition(success, error);
let circle, marker, zoomed;

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    latitude=lat;
    longitude=lng;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat, lng], { draggable: true }).addTo(map);
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);

    document.getElementById('searchbar').value = lat + ', ' + lng;

    marker.on('dragend', function(event) {
        const markerLatLng = event.target.getLatLng();
        document.getElementById('searchbar').value = markerLatLng.lat + ', ' + markerLatLng.lng;
        latitude=markerLatLng.lat;
        longitude=markerLatLng.lng;
    });
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }
}

const reportbtn = document.getElementById('reportbtn');
const issue = document.getElementById('issue');
const userloginId = JSON.parse(localStorage.getItem('user'))['userloginId'];
let eventListenerFunction = async (event) => {
    let a=parseFloat(latitude).toFixed(4);
    let b=parseFloat(longitude).toFixed(4);
    let c=issue.value;
    event.preventDefault();
    const { data, error } = await supabase
    .from('ActiveComplaintDetails')
    .insert([
        { userloginId: userloginId, latitude: a, longitude: b, category: c, status: "Initiated", Date: formattedDate},
    ]);
    
    if (error) {
        console.error("Error Inserting data into Supabase:", error.message);
        return;
    }
    
    alert('Complaint Registered Successfully!');
    window.location.href = '../UserPage/userpage.html';
};
reportbtn.addEventListener('click', eventListenerFunction);