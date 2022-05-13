const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// commented code is from web API, uncommented code is using local quotes from quotes.js

let apiQuotes = [];

// Show Loading
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    hideLoader();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // console.log(quote);
    
    // Check Quote length to determine styling
    if (quote.text.length > 140) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }     
    quoteText.textContent = quote.text;
       
    // Check if Author field is blank and replace it with 'Unknow'
    if (!quote.author) {
        authorText.textContent = 'Unknow';
    } else {
    authorText.textContent = quote.author;
    }
}

// Get Quotes from API
async function getQuotes (){
    const apiUrl = 'https://type.fit/api/quotes' //API address
    try {
        // response waits for the api address search to finish, if successful it goes to the json() object method in the apiQuotes global variable, with all the quotes
        const reponse = await fetch (apiUrl); 
        apiQuotes = await reponse.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote);

// On Load
showLoader();
getQuotes();
// newQuote(); 