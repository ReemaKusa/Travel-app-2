//src\client\js\handleFormSubmission.js

export function scrollToTop(outputElement, buttonElement) {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, and Opera

    const outputContainer = document.querySelector(outputElement);
    const buttonContainer = document.querySelector(buttonElement);

    outputContainer.style.display = 'none';
    buttonContainer.style.display = 'none';
}

// Get today's date in YYYY-MM-DD format
export function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Compute difference in days between two dates
export function calculateDaysBetween(d1, d2) {
    const msPerDay = 86400000;
    const differenceInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.floor(differenceInMs / msPerDay);
}

// Validate if the input date is not earlier than today
export function isMinDateValid(inputDate) {
    return inputDate >= getCurrentDate();
}

// Print selected content
export function triggerPrint(printSection) {
    const printContent = document.querySelector(printSection).innerHTML;
    const originalPageContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalPageContent;
}

const submitButton = document.querySelector('.generate-button');
const departureDateField = document.querySelector('#depart-date-input');
const returnDateField = document.querySelector('#return-date-input');
const destinationField = document.querySelector('#destination-input');
const notesField = document.querySelector('#remarks-input');
const processingMessage = document.querySelector('.process-message');

export async function handleFormSubmission(event) {
    event.preventDefault();

    const departureDate = departureDateField.value;
    console.log(departureDate);
    const returnDate = returnDateField.value;
    console.log(returnDate);
    const destination = destinationField.value;
    console.log("Destination input: " + destination);
    const notes = notesField.value;
    console.log(notes);

    if (!departureDate || !returnDate || !destination) {
        alert('Date and destination fields must be filled.');
        return;
    }

    if (!isMinDateValid(departureDate) || !isMinDateValid(returnDate)) {
        alert('The selected date must be today or later.');
        return;
    }

    processingMessage.innerHTML = 'Processing request...';

    try {
        const response = await fetch('/all-apis', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination, notes })
        });

        if (!response.ok) throw new Error('Error retrieving data from server.');

        const responseData = await response.json();
        if (responseData.locValidation) {
            alert(responseData.locValidation);
            processingMessage.innerHTML = '';
            return;
        }

        console.log('Response Data:', responseData);
        processingMessage.innerHTML = '';

        // Extract necessary data for rendering the trip details
        const locationDetails = responseData.geonamesData.geonames[0];
        console.log("Location Details: ", locationDetails, "Country: ", locationDetails.countryName);
        const weatherData = responseData.weatherbitData;
        console.log("Weather Data: ", weatherData);
        const images = responseData.pixabayData.hits;
        console.log("Location Images: ", images);
        const tripDuration = calculateDaysBetween(departureDate, returnDate);
        console.log("Trip Duration: ", departureDate, returnDate, tripDuration);
        const countdownToTrip = calculateDaysBetween(getCurrentDate(), departureDate);
        console.log("Days Until Trip: ", countdownToTrip);
        const tripDetailsContainer = document.getElementById('trip-info');
        console.log("Trip Details Container: ", tripDetailsContainer);

        // Render trip details with the extracted data
        displayTripDetails(locationDetails, weatherData, images, departureDate, returnDate, tripDuration);

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request. Please try again.',error);
        processingMessage.innerHTML = '';
    }
}

const displayTripDetails = (locationDetails, weatherData, images, startDate, endDate, tripDuration) => {
    const tripDetailsContainer = document.getElementById('trip-info');
    const countdownToTrip = calculateDaysBetween(getCurrentDate(), startDate);

    tripDetailsContainer.innerHTML = `
        <div id="trip-data">
        <h2>Traveling to ${locationDetails.countryName}</h2>
        ${images.map((img) => `<img src="${img.webformatURL}" alt="${locationDetails.countryName}" class="trip-img">`).join('')}
        <div>
        <p>Departure Date: ${startDate}</p>
        <p>Return Date: ${endDate}</p>
        <p>Days Until Departure: ${countdownToTrip}</p>
        <p>Trip Duration: ${tripDuration} days</p>
        <p>Weather Forecast: ${weatherData.data[0].temp}°C, ${weatherData.data[0].weather.description}</p>
       </div>
       </div>
    `;
};

// Attach event listener to the submission button
submitButton.addEventListener('click', handleFormSubmission);

export default handleFormSubmission;