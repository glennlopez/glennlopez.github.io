function vanityToNumeric(phoneNumber) {
    const vanityMap = {
        'A': '2', 'B': '2', 'C': '2',
        'D': '3', 'E': '3', 'F': '3',
        'G': '4', 'H': '4', 'I': '4',
        'J': '5', 'K': '5', 'L': '5',
        'M': '6', 'N': '6', 'O': '6',
        'P': '7', 'Q': '7', 'R': '7', 'S': '7',
        'T': '8', 'U': '8', 'V': '8',
        'W': '9', 'X': '9', 'Y': '9', 'Z': '9',
    };

    return phoneNumber.split('').map(char => vanityMap[char.toUpperCase()] || char).join('');
}

fetch('../inf.dat')
    .then(response => response.text())
    .then(data => {
        // Use regular expressions to parse and extract the phone number
        const phoneRegex = /Phone_number:\s*([A-Za-z\d-]+)/;
        const parsedPhoneNumber = data.match(phoneRegex)[1];

        // Find the element in the existing HTML file where you want to insert the phone number
        const phoneNumberElement = document.getElementById('phone-number');
        if (phoneNumberElement) {
            // Insert the extracted phone number into the <span> tag
            phoneNumberElement.textContent = parsedPhoneNumber;
        }

        // Find the element in the existing HTML file where you want to insert the phone number link
        const phoneNumberLinkElement = document.getElementById('phone-number-link');
        if (phoneNumberLinkElement) {
            // Convert the vanity phone number to its numerical counterpart
            const numericPhoneNumber = vanityToNumeric(parsedPhoneNumber);

            // Set the href attribute to the tel: link
            phoneNumberLinkElement.setAttribute('href', `tel:${numericPhoneNumber}`);
        }

        // Use regular expressions to parse and extract the mailing address
        const addressRegex = /Mailing_Address:\s*([\s\S]*?)(?=Email_address)/;
        const parsedAddress = data.match(addressRegex)[1].trim();

        // Find the element in the existing HTML file where you want to insert the mailing address in one line
        const mailingAddressOneLineElement = document.getElementById('mailing-address-one-line');
        if (mailingAddressOneLineElement) {
            // Insert the extracted mailing address into the <p> tag as a single line
            mailingAddressOneLineElement.textContent = parsedAddress.replace(/\s*\n\s*/g, ', ');
        }

        // Find the element in the existing HTML file where you want to insert the original mailing address
        const mailingAddressOriginalElement = document.getElementById('mailing-address-original');
        if (mailingAddressOriginalElement) {
            // Insert the extracted mailing address into the <p> tag in its original format
            mailingAddressOriginalElement.innerHTML = parsedAddress.replace(/\n/g, '<br>');
        }

        // Find the element in the existing HTML file where you want to insert the mailing address link
        const mailingAddressOneLineLinkElement = document.getElementById('mailing-address-one-line-link');
        if (mailingAddressOneLineLinkElement) {
            // Encode the mailing address for use in a URL
            const encodedMailingAddress = encodeURIComponent(parsedAddress.replace(/\s*\n\s*/g, ', '));

            // Set the href attribute to the Google Maps link
            mailingAddressOneLineLinkElement.setAttribute('href', `https://www.google.com/maps?q=${encodedMailingAddress}`);
        }

        // Use regular expressions to parse and extract all the email addresses
        const emailRegexes = {
            main: /Email_address_main:\s*([\w.-]+@[\w.-]+\.\w+)/,
            support: /Email_address_support:\s*([\w.-]+@[\w.-]+\.\w+)/,
            store: /Email_address_store:\s*([\w.-]+@[\w.-]+\.\w+)/,
            info: /Email_address_info:\s*([\w.-]+@[\w.-]+\.\w+)/,
            legal: /Email_address_legal:\s*([\w.-]+@[\w.-]+\.\w+)/,
            finance: /Email_address_finance:\s*([\w.-]+@[\w.-]+\.\w+)/,
            marketing: /Email_address_marketing:\s*([\w.-]+@[\w.-]+\.\w+)/,
        };

        // Iterate over the emailRegexes object
        for (const key in emailRegexes) {
            const regex = emailRegexes[key];
            const parsedEmail = data.match(regex)[1];
            const emailElement = document.getElementById(`email-address-${key}`);
            if (emailElement) {
                emailElement.textContent = parsedEmail;
            }

            // Find the element in the existing HTML file where you want to insert the email link
            const emailLinkElement = document.getElementById(`email-address-${key}-link`);
            if (emailLinkElement) {
                // Set the href attribute to the mailto: link
                emailLinkElement.setAttribute('href', `mailto:${parsedEmail}`);
            }
        }

        // Use regular expressions to parse and extract the fax number
        const faxRegex = /Fax_number:\s*([\d-]+)/;
        const parsedFaxNumber = data.match(faxRegex)[1];

        // Find the element in the existing HTML file where you want to insert the fax number
        const faxNumberElement = document.getElementById('fax-number');
        if (faxNumberElement) {
            // Insert the extracted fax number into the <span> tag
            faxNumberElement.textContent = parsedFaxNumber;
        }

        // Find the element in the existing HTML file where you want to insert the fax number link
        const faxNumberLinkElement = document.getElementById('fax-number-link');
        if (faxNumberLinkElement) {
            // Set the href attribute to the fax: link
            faxNumberLinkElement.setAttribute('href', `sms:${parsedFaxNumber}`);
        }
    })
    .catch(error => {
        console.error('Error fetching info.txt:', error);
    });
