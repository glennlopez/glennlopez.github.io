/**************************
 *  INFO
 *************************/
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

fetch('../.inf/inf.dat')
    .then(response => response.text())
    .then(data => {
        // Use regular expressions to parse and extract the phone number
        const phoneRegex = /Phone_number:\s*([A-Za-z\d-]+)/;
        const parsedPhoneNumber = data.match(phoneRegex)[1];

        // Replace this part of your inf.js file
        const phoneNumberElements = document.getElementsByClassName('phone-number');
        const phoneNumberLinkElements = document.getElementsByClassName('phone-number-link');

        if (phoneNumberElements.length > 0 && phoneNumberLinkElements.length > 0) {
            // Convert the vanity phone number to its numerical counterpart
            const numericPhoneNumber = vanityToNumeric(parsedPhoneNumber);

            // Iterate through each phone number element and set the content and href attributes
            for (let i = 0; i < phoneNumberElements.length; i++) {
                phoneNumberElements[i].textContent = parsedPhoneNumber;
                phoneNumberLinkElements[i].setAttribute('href', `tel:${numericPhoneNumber}`);
            }
        }


        // Use regular expressions to parse and extract the mailing address
        const addressRegex = /Mailing_Address:\s*([\s\S]*?)(?=Email_address)/;
        const parsedAddress = data.match(addressRegex)[1].trim();

        const mailingAddressOneLineElements = document.getElementsByClassName('mailing-address-one-line');
        const mailingAddressOriginalElements = document.getElementsByClassName('mailing-address-original');
        const mailingAddressOneLineLinkElements = document.getElementsByClassName('mailing-address-one-line-link');
        const encodedMailingAddress = encodeURIComponent(parsedAddress.replace(/\s*\n\s*/g, ', '));

        for (let i = 0; i < mailingAddressOneLineElements.length; i++) {
            if (mailingAddressOneLineElements[i]) {
                mailingAddressOneLineElements[i].textContent = parsedAddress.replace(/\s*\n\s*/g, ', ');
            }
        }

        for (let i = 0; i < mailingAddressOriginalElements.length; i++) {
            if (mailingAddressOriginalElements[i]) {
                mailingAddressOriginalElements[i].innerHTML = parsedAddress.replace(/\n/g, '<br>');
            }
        }

        for (let i = 0; i < mailingAddressOneLineLinkElements.length; i++) {
            if (mailingAddressOneLineLinkElements[i]) {
                mailingAddressOneLineLinkElements[i].setAttribute('href', `https://www.google.com/maps?q=${encodedMailingAddress}`);
            }
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

            const emailElements = document.getElementsByClassName(`email-address-${key}`);
            const emailLinkElements = document.getElementsByClassName(`email-address-${key}-link`);

            if (emailElements.length > 0 && emailLinkElements.length > 0) {
                // Iterate through each email element and set the content and href attributes
                for (let i = 0; i < emailElements.length; i++) {
                    emailElements[i].textContent = parsedEmail;
                    emailLinkElements[i].setAttribute('href', `mailto:${parsedEmail}`);
                }
            }
        }


        // Use regular expressions to parse and extract the fax number
        const faxRegex = /Fax_number:\s*([\d-]+)/;
        const parsedFaxNumber = data.match(faxRegex)[1];

        const faxNumberElements = document.getElementsByClassName('fax-number');
        const faxNumberLinkElements = document.getElementsByClassName('fax-number-link');

        if (faxNumberElements.length > 0 && faxNumberLinkElements.length > 0) {
            // Iterate through each fax number element and set the content and href attributes
            for (let i = 0; i < faxNumberElements.length; i++) {
                faxNumberElements[i].textContent = parsedFaxNumber;
                faxNumberLinkElements[i].setAttribute('href', `sms:${parsedFaxNumber}`);
            }
        }


        const socialRegexes = {
            github: /GitHub_address:\s*(https?:\/\/[\w.-]+(?:\.\w+)+\/[\w-]+(?:\/[\w-]+)*)/,
            linkedin: /LinkedIn_address:\s*(https?:\/\/www\.linkedin\.com\/in\/[\w-]+)/,
            youtube: /YouTube_address:\s*(https?:\/\/www\.youtube\.com\/[\w-]+)/,
        };

        for (const key in socialRegexes) {
            const regex = socialRegexes[key];
            const parsedAddress = data.match(regex)[1];

            if (key === 'github' || key === 'linkedin' || key === 'youtube') {
                const addressElements = document.getElementsByClassName(`${key}-address`);
                const addressLinkElements = document.getElementsByClassName(`${key}-address-link`);

                if (addressElements.length > 0 && addressLinkElements.length > 0) {
                    // Iterate through each address element and set the content and href attributes
                    for (let i = 0; i < addressElements.length; i++) {
                        addressElements[i].textContent = parsedAddress;
                        addressLinkElements[i].setAttribute('href', parsedAddress);
                    }
                }
            } else {
                const addressElement = document.getElementById(`${key}-address`);
                if (addressElement) {
                    addressElement.textContent = parsedAddress;
                }

                const addressLinkElement = document.getElementById(`${key}-address-link`);
                if (addressLinkElement) {
                    addressLinkElement.setAttribute('href', parsedAddress);
                }
            }
        }

    })
    .catch(error => {
        console.error('Error fetching info.txt:', error);
    });



/**************************
 *  NAVIGATION LINKS
 *************************/
document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("../.inf/nav.dat");
    const navData = await response.text();
    const navDataLines = navData.split("\n");

    const navDataObj = {};
    navDataLines.forEach(line => {
        const [key, value] = line.split(": ");
        if (key && value) {
            navDataObj[key] = value;
        }
    });

    const sections = [
        { labelKey: "Store_label", linkKey: "Store_link", id: "store-link" },
        { labelKey: "Services_label", linkKey: "Services_link", id: "services-link" },
        { labelKey: "Projects_label", linkKey: "Projects_link", id: "projects-link" },
        { labelKey: "Code_label", linkKey: "Code_link", id: "code-link" },
        { labelKey: "About_label", linkKey: "About_link", id: "about-link" },
        { labelKey: "Contact_label", linkKey: "Contact_link", id: "contact-link" },
    ];

    sections.forEach(section => {
        const label = navDataObj[section.labelKey];
        const link = navDataObj[section.linkKey];

        const linkElement = document.getElementById(section.id);
        linkElement.textContent = label;
        linkElement.href = link;
    });
});
