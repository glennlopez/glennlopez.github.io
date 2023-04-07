<!-- Form scripts -->
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