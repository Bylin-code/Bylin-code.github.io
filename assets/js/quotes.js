// Quote bank for the portfolio site
const quotes = [
  {
    text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Good design is making something intelligible and memorable. Great design is making something memorable and meaningful.",
    author: "Dieter Rams"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "What we make testifies who we are. People can sense care and can sense carelessness. This relates to respect for each other and carelessness is personally offensive.",
    author: "Jonathan Ive"
  },
  {
    text: "Form follows function.",
    author: "Louis Sullivan"
  },
  {
    text: "Less is more.",
    author: "Ludwig Mies van der Rohe"
  },
  {
    text: "Be alone, that is the secret of invention; be alone, that is when ideas are born.",
    author: "Nikola Tesla"
  },
  {
    text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
    author: "Charles Darwin"
  },
  {
    text: "Learn the rules like a pro, so you can break them like an artist.",
    author: "Pablo Picasso"
  },
  {
    text: "Begin by learning to draw and paint like the old masters. After that, you can do as you like; everyone will respect you.",
    author: "Salvador Dali"
  }
];

// Function to get a random quote from the bank
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Function to display a random quote in the quote container
function displayRandomQuote() {
  const quoteContainer = document.querySelector('.quote-container');
  
  if (quoteContainer) {
    const randomQuote = getRandomQuote();
    
    // Create the quote elements
    const quoteText = document.createElement('p');
    quoteText.classList.add('quote-text');
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteText.style.fontFamily = "'Montserrat', Arial, sans-serif";
    quoteText.style.color = "white";
    quoteText.style.fontSize = "clamp(1.2rem, 3vw, 2rem)";
    quoteText.style.lineHeight = "1.4";
    quoteText.style.marginBottom = "1rem";
    quoteText.style.fontWeight = "300";
    quoteText.style.letterSpacing = "0.05em";
    
    const quoteAuthor = document.createElement('p');
    quoteAuthor.classList.add('quote-author');
    quoteAuthor.textContent = `— ${randomQuote.author}`;
    quoteAuthor.style.fontFamily = "'Montserrat', Arial, sans-serif";
    quoteAuthor.style.color = "white";
    quoteAuthor.style.fontSize = "clamp(1rem, 2vw, 1.2rem)";
    quoteAuthor.style.opacity = "0.8";
    quoteAuthor.style.textAlign = "right";
    quoteAuthor.style.fontStyle = "italic";
    
    // Clear any existing content and add the new quote
    quoteContainer.innerHTML = '';
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteAuthor);
  }
}

// Initialize the quote display when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  displayRandomQuote();
});
