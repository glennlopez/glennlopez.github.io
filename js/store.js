let canadaAddress = document.getElementById("canada-address");
let usaAddress = document.getElementById("usa-address");

fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        if (data.country === "CA") {
            canadaAddress.style.display = "inline-block";
        } else if (data.country === "US") {
            usaAddress.style.display = "inline-block";
        }
    })
    .catch(error => console.error(error));