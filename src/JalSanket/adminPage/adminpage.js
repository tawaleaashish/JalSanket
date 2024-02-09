var map = L.map('map');
map.setView([21.1458,79.0882], 12.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
import supabase from "../../config/supabaseClient.js";
const fetchDataAndAddCircles = async () => {
    try {
        const { data, error } = await supabase
            .from('ActiveComplaintDetails')
            .select('latitude,longitude,category');

        if (error) 
        {
            console.error('Error fetching data:', error);
            return;
        }

        data.forEach(item => {
            console.log(JSON.stringify(item))
            let circleColor = 'red';
            if (item.category =='Flood') {
                circleColor = 'red'; 
            }
            if (item.category == 'Water-logging') {
                circleColor = 'blue'; 
            }
            if (item.category == 'Water-supply Issue') {
                circleColor = 'green'; 
            }
            if (item.category == 'Drainage Issue') {
                circleColor = 'black'; 
            }
            if (item.category == 'Water Contamination') {
                circleColor = 'yellow'; 
            }
            const circle = L.circle([item.latitude, item.longitude], {
                radius: 2, // 2 meters radius
                color: circleColor,
                fillColor: circleColor,
                fillOpacity: 0.5,
            }).addTo(map);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
fetchDataAndAddCircles();