// About Me text variations for the portfolio site
// Ultra simplified version

// Array of fallback texts in case loading fails
const BACKUP_TEXTS = [
  "NULL"
];

// Array to hold our loaded texts
let aboutTexts = [];

// Function to load the file directly
function loadTextFile() {
  console.log('Loading about text file');
  
  // Try to fetch the text file from a public location
  fetch('/assets/data/about-texts.txt')
    .then(response => response.text())
    .then(text => {
      // Process the text content
      const paragraphs = text.split('\n\n').filter(p => p.trim());
      console.log(`Found ${paragraphs.length} texts in the file`);
      
      // Store texts in our array
      aboutTexts = paragraphs;
      
      // Display a random text
      displayRandomText();
    })
    .catch(error => {
      console.error('Error loading about text file:', error);
      // Use backup texts if loading fails
      aboutTexts = BACKUP_TEXTS;
      displayRandomText();
    });
}

// Function to display a random text
function displayRandomText() {
  // If no texts are loaded, use backup
  if (aboutTexts.length === 0) {
    aboutTexts = BACKUP_TEXTS;
  }
  
  // Get a random text
  const randomIndex = Math.floor(Math.random() * aboutTexts.length);
  const randomText = aboutTexts[randomIndex];
  
  // Get the paragraph element
  const paragraph = document.querySelector('#about-text-content p');
  if (paragraph) {
    // Update the text
    paragraph.textContent = randomText;
    
    // Ensure hover animation styles are applied
    paragraph.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
    paragraph.style.transformOrigin = 'left center';
  }
}

// Function called when the text is clicked
function changeAboutText() {
  console.log('About text clicked, changing to a new random text');
  
  // Get the current text
  const paragraph = document.querySelector('#about-text-content p');
  if (!paragraph) return;
  
  // Get the current text to avoid showing it again
  const currentText = paragraph.textContent;
  
  // Find a different text if possible
  let newText;
  let attempts = 0;
  
  do {
    const randomIndex = Math.floor(Math.random() * aboutTexts.length);
    newText = aboutTexts[randomIndex];
    attempts++;
  } while (newText === currentText && attempts < 5 && aboutTexts.length > 1);
  
  // Fade out effect
  paragraph.style.opacity = '0';
  
  // Change text and fade in
  setTimeout(function() {
    paragraph.textContent = newText;
    paragraph.style.opacity = '1';
    
    // Call the alignTextWithImage function from text-spacing.js to adjust line spacing
    // This ensures line spacing is dynamically adjusted for each new text
    if (typeof alignTextWithImage === 'function') {
      // Small delay to ensure the text is rendered before calculating
      setTimeout(alignTextWithImage, 50);
    } else {
      console.warn('alignTextWithImage function not found - check text-spacing.js inclusion');
    }
  }, 300);
}

// Load text when the page loads
document.addEventListener('DOMContentLoaded', function() {
  loadTextFile();
});

// Try again when window fully loads if needed
window.addEventListener('load', function() {
  const paragraph = document.querySelector('#about-text-content p');
  if (!paragraph || !paragraph.textContent.trim()) {
    console.log('Text not loaded yet, trying again');
    loadTextFile();
  }
});
