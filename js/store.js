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




// Function to disable the script
function disableScript(scriptElement) {
    scriptElement.remove();
}

// Get the script to disable
const scriptToDisable = document.getElementById('script-to-disable');

// Get the footer element
const footer = document.getElementById('footer-copyright');

// Set up the Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // If the footer is in view, disable the script
                disableScript(scriptToDisable);

                // Unobserve the footer (optional, but recommended to stop observing after the script is disabled)
                observer.unobserve(footer);
            }
        });
    },
    {
        threshold: 0.1, // Adjust the threshold value as needed (0.1 means 10% visibility of the footer element)
    }
);

// Start observing the footer
observer.observe(footer);
