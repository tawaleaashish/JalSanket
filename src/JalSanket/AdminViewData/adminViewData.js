import supabase from "../supabaseClient.js";

function searchGoogle(latitude, longitude, e) {
  const searchTerm = `${latitude},${longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}`;
  window.location.href = googleMapsUrl;
}
window.searchGoogle = searchGoogle;

const fetchAndRenderUserData = async () => {
    try {
        const { data, error } = await supabase
            .from('ActiveComplaintDetails')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach((complaint, index) => {
    
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="userloginId">${complaint.userloginId}</td>
                <td>${complaint.category}</td>
                <td>${complaint.latitude}</td>
                <td>${complaint.longitude}</td>
                <td><a href="#" onclick="searchGoogle('${complaint.latitude}', '${complaint.longitude}')">Click Here</a></td>
                <td>${complaint.Date}</td>
                <td class="dropdown">
                    <select class="dropdownbox" name="status" onchange="openConfirmationPopup(this)">
                        <option selected disabled hidden>Error</option>
                        <option ${complaint.status == 'Initiated' ? 'selected' : ''}>Initiated</option>
                        <option ${complaint.status == 'In-Progress' ? 'selected' : ''}>In-Progress</option>
                        <option ${complaint.status == 'Closed' ? 'selected' : ''}>Closed</option>
                        <option ${complaint.status == 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    </td>
                    `;
                    tbody.appendChild(row);
                  });
                } catch (error) {
                  console.error('Error fetching and rendering user data:', error);
                }
              };
              
window.onload = fetchAndRenderUserData;

var selectedStatusElement;

function openConfirmationPopup(selectElement) {
  selectedStatusElement = selectElement;
  document.getElementById('confirmationPopupContainer').style.display = 'block';
}

async function confirmStatusChange(confirmation) {
  if (confirmation) {
    var selectedStatus = selectedStatusElement.value;
    var userloginId = selectedStatusElement.closest('tr').querySelector('.userloginId').innerHTML;
    try {
      const { data, error } = await supabase
        .from('ActiveComplaintDetails')
        .update({ status: selectedStatus })
        .eq('userloginId', userloginId);

      if (error) {
        throw new Error(error.message);
      }

      if (selectedStatus == 'Resolved' || selectedStatus=="Closed") {
        // Retrieve the data of the resolved complaint
        const { data: resolvedComplaintData, error: resolvedComplaintError } = await supabase
          .from('ActiveComplaintDetails')
          .select('*')
          .eq('userloginId', userloginId);

        if (resolvedComplaintError) {
          throw new Error(resolvedComplaintError.message);
        }

        // Insert the resolved complaint data into the ResolvedComplaintDetails table
        const { data: insertedData, error: insertError } = await supabase
          .from('ResolvedComplaintDetails')
          .insert(resolvedComplaintData[0]); // Assuming there's only one row

        if (insertError) {
          throw new Error(insertError.message);
        }

        // Delete the row from the ActiveComplaintDetails table
        const { error: deleteError } = await supabase
          .from('ActiveComplaintDetails')
          .delete()
          .eq('userloginId', userloginId);

        if (deleteError) {
          throw new Error(deleteError.message);
        }
      }

      alert("Status changed to '" + selectedStatus + "'");
    } catch (error) {
      console.error('Error updating status:', error);
    }
  } else {
    var previousStatus = selectedStatusElement.getAttribute('data-previous');
    selectedStatusElement.value = previousStatus;
  }
  document.getElementById('confirmationPopupContainer').style.display = 'none';
}

window.openConfirmationPopup = openConfirmationPopup;
window.confirmStatusChange = confirmStatusChange;

// Add event listeners to store previous status when dropdown is focused
var dropdowns = document.getElementsByClassName('dropdownbox');
for (var i = 0; i < dropdowns.length; i++) {
  dropdowns[i].addEventListener('focus', function() {
    this.setAttribute('data-previous', this.value);
  });
}