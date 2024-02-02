var map = L.map('map');
map.setView([21.1458, 79.0882], 12.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
console.log("Hello");    

import supabase from "../config/supabaseClient.js";
const fetchData = async () => {
    try {
        // Selecting multiple rows with specific columns
        const { data, error } = await supabase
            .from('ResolvedComplaintDetails')
            .select('latitude', 'longitude');

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        // Process the data
        console.log('Fetched data:', data);

        // Now you can work with the data, for example, add markers to the map
        // ...
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

fetchData();