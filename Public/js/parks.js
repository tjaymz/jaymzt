const dataContainer = document.getElementById("data-container");
const buttons = document.querySelectorAll("#button-container button");

function fetchDataAndDisplay(parkId) {
    const apiUrl = `https://api.themeparks.wiki/v1/entity/${parkId}/live`;

    fetch(apiUrl)
        .then(response => {
            // If response is NOT ok throw an error
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            // If response is good return json results
            return response.json();
        })
        .then(data => {
            // Clear existing data
            dataContainer.innerHTML = "";

            data.liveData.sort((a, b) => a.name.localeCompare(b.name)); 

            // Display live data items
            data.liveData.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");

                let content = `
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> ${item.entityType}</p>
                    <p><strong>Status:</strong> ${item.status}</p>
                `;

                if (item.showtimes && item.showtimes.length > 0) {
                    const startTime = new Date(item.showtimes[0].startTime);
                    const formattedTime = startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                    content += `<p><strong>Next Show:</strong> ${formattedTime}</p>`;
                } else if (item.operatingHours && item.operatingHours.length > 0) {
                    const startTime = new Date(item.operatingHours[0].startTime);
                    const endTime = new Date(item.operatingHours[0].endTime);
                    const formattedStartTime = startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                    const formattedEndTime = endTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                    content += `<p><strong>Operating Hours:</strong> ${formattedStartTime} - ${formattedEndTime}</p>`;
                }

                itemDiv.innerHTML = content;
                dataContainer.appendChild(itemDiv);
            });
        })
        .catch(error => {
            // Display a user-friendly error message
            dataContainer.innerHTML = `<p class="error">Error loading data: ${error.message}</p>`;
            console.error(error); 
        });
}

// Initial data fetch for the first park
fetchDataAndDisplay("75ea578a-adc8-4116-a54d-dccb60765ef9"); // Magic Kingdom

// Event listeners for button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    dataContainer.innerHTML = ""; // Clear previous data
    const parkId = button.dataset.parkId;
    fetchDataAndDisplay(parkId);
  });
});
