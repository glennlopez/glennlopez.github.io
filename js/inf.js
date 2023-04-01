fetch('../inf.dat')
    .then(response => response.text())
    .then(data => {
        // Use regular expressions to parse and extract the phone number
        const phoneRegex = /Phone_number:\s*([\d-]+)/;
        const parsedPhoneNumber = data.match(phoneRegex)[1];

        // Find the element in the existing HTML file where you want to insert the phone number
        const phoneNumberElement = document.getElementById('phone-number');

        // Insert the extracted phone number into the <span> tag
        phoneNumberElement.textContent = parsedPhoneNumber;

        // Use regular expressions to parse and extract the mailing address
        const addressRegex = /Mailing_Address:\s*([\s\S]*?)(?=Email_address)/;
        const parsedAddress = data.match(addressRegex)[1].trim();

        // Find the element in the existing HTML file where you want to insert the mailing address in one line
        const mailingAddressOneLineElement = document.getElementById('mailing-address-one-line');

        // Insert the extracted mailing address into the <p> tag as a single line
        mailingAddressOneLineElement.textContent = parsedAddress.replace(/\s*\n\s*/g, ', ');

        // Find the element in the existing HTML file where you want to insert the original mailing address
        const mailingAddressOriginalElement = document.getElementById('mailing-address-original');

        // Insert the extracted mailing address into the <p> tag in its original format
        mailingAddressOriginalElement.innerHTML = parsedAddress.replace(/\n/g, '<br>');

        // Use regular expressions to parse and extract the email address
        const emailRegex = /Email_address:\s*([\w.-]+@[\w.-]+\.\w+)/;
        const parsedEmailAddress = data.match(emailRegex)[1];

        // Find the element in the existing HTML file where you want to insert the email address
        const emailAddressElement = document.getElementById('email-address');

        // Insert the extracted email address into the <span> tag
        emailAddressElement.textContent = parsedEmailAddress;

        // Use regular expressions to parse and extract the fax number
        const faxRegex = /Fax_number:\s*([\d-]+)/;
        const parsedFaxNumber = data.match(faxRegex)[1];

        // Find the element in the existing HTML file where you want to insert the fax number
        const faxNumberElement = document.getElementById('fax-number');

        // Insert the extracted fax number into the <span> tag
        faxNumberElement.textContent = parsedFaxNumber;
    })
    .catch(error => {
        console.error('Error fetching info.txt:', error);
    });