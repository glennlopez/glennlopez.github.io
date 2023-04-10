async function fetchQuotes() {
    const response = await fetch('inf/quote.dat');
    const rawText = await response.text();
    const quoteRegex = /{{(.*?)}}/g;
    const quotes = rawText.match(quoteRegex).map((quote) => quote.slice(2, -2));
    return quotes;
}

function displayRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerText = quotes[randomIndex];
}

async function loadRandomQuote() {
    const quotes = await fetchQuotes();
    displayRandomQuote(quotes);
}

document.addEventListener('DOMContentLoaded', loadRandomQuote);
