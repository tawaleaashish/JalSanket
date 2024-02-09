import supabase from "../../config/supabaseClient.js";

const fetchUserData = async () => {
    try {
        const { data, error } = await supabase
            .from('ActiveComplaintDetails')
            .select('*')
            .eq('userloginId', JSON.parse(localStorage.getItem('user'))['userloginId']);
        
            // console.log(JSON.parse(localStorage.getItem('user')));
        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        let serialNumber = 1;

        const complaintContainers = document.getElementsByClassName('complaint-area');

        // Iterate over each complaint area
        Array.from(complaintContainers).forEach(complaintContainer => {
            data.forEach(complaint => {
                const section = document.createElement('section');
                section.className = 'complaint';

                const h2 = document.createElement('h2');
                h2.className = 'complaintNo';
                h2.textContent = 'Complaint No: ' + serialNumber;
                section.appendChild(h2);

                const statusP = document.createElement('p');
                statusP.className = 'statusRepo';
                statusP.innerHTML = 'Status: <span class="status">' + complaint.status + '</span>';
                section.appendChild(statusP);

                const categoryP = document.createElement('p');
                categoryP.className = 'Category';
                categoryP.textContent = 'Category: ' + complaint.category;
                section.appendChild(categoryP);

                const locationP = document.createElement('p');
                locationP.className = 'location';
                locationP.textContent = 'Location: Latitude ' + complaint.latitude + ', Longitude ' + complaint.longitude;
                section.appendChild(locationP);

                complaintContainer.appendChild(section);

                serialNumber++;
            });
        });

    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

fetchUserData();
