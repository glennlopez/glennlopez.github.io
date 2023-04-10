/*
    Mailing address: auto hide non regional mailing address
 */
let canadaAddress = document.getElementById("canada-address"); // Get the DOM element for Canada address
let usaAddress = document.getElementById("usa-address"); // Get the DOM element for USA address

fetch('https://ipapi.co/json/') // Fetch the user's IP geolocation data
    .then(response => response.json()) // Convert the response to a JSON object
    .then(data => { // Handle the JSON object
        if (data.country === "CA") { // If the user is in Canada
            canadaAddress.style.display = "inline-block"; // Show the Canada address
            usaAddress.style.display = "none"; // Hide the USA address
        } else if (data.country === "US") { // If the user is in the USA
            canadaAddress.style.display = "none"; // Hide the Canada address
            usaAddress.style.display = "inline-block"; // Show the USA address
        } else { // If the user is in any other country
            canadaAddress.style.display = "inline-block"; // Show the Canada address
            usaAddress.style.display = "inline-block"; // Show the USA address
        }
    })
    .catch(error => console.error(error)); // Log any errors to the console


