/* Form scripts */
function validateEmail() {
    var email = document.getElementById("email").value;
    if (email.toLowerCase().includes("websolution")) {
        window.location.href = "failed_spam.html";
        return false;
    }
    disableButton();
    return true;
}

function disableButton() {
    document.getElementById("form-submit-btn").disabled = true;
    document.getElementById("form-submit-btn").innerHTML = 'Message sent. Thank you!';

    var timestamp = new Date().getTime();
    localStorage.setItem("buttonDisabledTimestamp", timestamp);
}

// function checkButtonState() {
//     var buttonDisabledTimestamp = localStorage.getItem("buttonDisabledTimestamp");
//     if (buttonDisabledTimestamp) {
//         var currentTime = new Date().getTime();
//         var timeDiff = currentTime - buttonDisabledTimestamp;
//         if (timeDiff < 60000) { // 1 minute in milliseconds
//             document.getElementById("form-submit-btn").disabled = true;
//             document.getElementById("form-submit-btn").innerHTML='Message received. Thank you!';
//         }
//     }
// }
// checkButtonState();
function checkButtonState() {
    var buttonDisabledTimestamp = localStorage.getItem("buttonDisabledTimestamp");
    var disableSubmitButton = localStorage.getItem("disableSubmitButton");
    if (buttonDisabledTimestamp || disableSubmitButton) {
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - buttonDisabledTimestamp;
        if (timeDiff < 60000 || disableSubmitButton) { // 1 minute in milliseconds
            document.getElementById("form-submit-btn").disabled = true;
            document.getElementById("form-submit-btn").innerHTML='Message received. Thank you!';
        }
    }
}
checkButtonState();

// JavaScript to handle the toggle functionality
// document.getElementById('toggleList').addEventListener('click', function (e) {
//     e.preventDefault();
//     var listWrapper = document.querySelector('.short-url-list-wrapper');
//     if (listWrapper.style.display === 'none' || listWrapper.style.display === '') {
//         listWrapper.style.display = 'block';
//     } else {
//         listWrapper.style.display = 'none';
//     }
// });

// Toggle the visibility of Short-URL list
document.addEventListener("DOMContentLoaded", function () {
    var toggleListLink = document.getElementById("toggleListLink");
    var toggleListContainer = document.getElementById("toggleListContainer");

    toggleListLink.addEventListener("click", function () {
        if (toggleListContainer.style.display === "none" || toggleListContainer.style.display === "") {
            toggleListContainer.style.display = "block";
            toggleListLink.textContent = "ⓘ Hide all short URLs";
        } else {
            toggleListContainer.style.display = "none";
            toggleListLink.textContent = "ⓘ Show all short URLs";
        }
    });
});