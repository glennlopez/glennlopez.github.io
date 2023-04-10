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




let isChatScriptLoaded = false;

function loadCrispChatScript() {
    if (!isChatScriptLoaded) {
        const script = document.createElement('script');
        script.id = 'crisp-chat-script';
        script.type = 'text/javascript';
        script.src = 'https://client.crisp.chat/l.js';
        script.async = 1;
        document.head.appendChild(script);
        isChatScriptLoaded = true;
    }
}

function initCrispChat() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '3018c10c-34cd-41c1-a2d1-db990e8b96ad';
    loadCrispChatScript();
}

const footer = document.getElementById('footer-copyright-001');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting && !isChatScriptLoaded) {
                initCrispChat();
            }
        });
    },
    {
        threshold: 0,
    }
);

observer.observe(footer);
