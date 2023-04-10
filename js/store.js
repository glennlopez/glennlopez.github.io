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




// Function to show or hide the Crisp Chat widget
function setCrispChatVisibility(visible) {
    if (window.$crisp) {
        window.$crisp.push(["do", visible ? "chat:show" : "chat:hide"]);
    }
}

// Get the footer element
const footer = document.getElementById("footer-copyright-001");

// Set up the Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // If the footer is in view, hide the chat widget
                setCrispChatVisibility(false);
            } else {
                // If the footer is not in view, show the chat widget
                setCrispChatVisibility(true);
            }
        });
    },
    {
        threshold: 0, // Adjust the threshold value as needed (0 means when any part of the footer element is in view)
    }
);

// Start observing the footer
observer.observe(footer);
