// About page text handler

async function fetchAboutPageText() {
  try {
    const response = await fetch('/_data/about-page-texts.txt');
    if (!response.ok) {
      console.error('Failed to load about page text data');
      return;
    }
    
    const data = await response.text();
    updateAboutPageContent(data.trim());
  } catch (error) {
    console.error('Error loading about page text:', error);
  }
}

function updateAboutPageContent(content) {
  const aboutBio = document.querySelector('.about-bio');
  
  if (aboutBio) {
    // Split by double newlines to get paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
    
    // Clear existing content
    aboutBio.innerHTML = '';
    
    // Add each paragraph
    paragraphs.forEach(paragraph => {
      const p = document.createElement('p');
      // Replace single newlines with spaces to ignore them
      p.textContent = paragraph.trim().replace(/\n/g, ' ');
      aboutBio.appendChild(p);
    });
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only run on about page
  if (window.location.pathname.includes('/about')) {
    fetchAboutPageText();
  }
});
