var map = L.map('map');
map.setView([21.1458, 79.0882], 12.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
import supabase from "../../config/supabaseClient.js";
const fetchDataAndAddCircles = async () => {
    try {
        const { data, error } = await supabase
            .from('ResolvedComplaintDetails')
            .select('latitude,longitude');

        if (error) 
        {
            console.error('Error fetching data:', error);
            return;
        }

        // Create a circle for each data point with a radius of 2 meters
        data.forEach(item => {
            const circle = L.circle([item.latitude, item.longitude], {
                radius: 2, // 2 meters radius
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.5,
            }).addTo(map);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

fetchDataAndAddCircles();