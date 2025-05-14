// Quote bank for the portfolio site
let quotes = [];

// Function to fetch and parse quotes from the text file
async function fetchQuotes() {
  try {
    const response = await fetch('/assets/data/quotes.txt');
    if (!response.ok) {
      console.error('Failed to load quotes data');
      return;
    }
    
    const data = await response.text();
    // Split by double newlines to get individual quote blocks
    const quoteBlocks = data.split('\n\n').filter(block => block.trim() !== '');
    
    // Process each quote block
    quotes = quoteBlocks.map(block => {
      // Split by the line with author (starts with '- ')
      const lines = block.split('\n');
      const authorLine = lines.find(line => line.trim().startsWith('- '));
      
      // Extract author and text
      const author = authorLine ? authorLine.trim().substring(2).trim() : 'Unknown';
      const text = lines.filter(line => !line.trim().startsWith('- ')).join(' ').trim();
      
      return { text, author };
    });
    
    // If we successfully loaded quotes, display one
    if (quotes.length > 0) {
      displayRandomQuote();
    }
  } catch (error) {
    console.error('Error loading quotes:', error);
  }
}

// Function to get a random quote from the bank
function getRandomQuote() {
  if (quotes.length === 0) return { text: '', author: '' };
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

// Initialize: fetch the quotes and set up the display when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  fetchQuotes();
});
