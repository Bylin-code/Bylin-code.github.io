// JavaScript to ensure the vertical project code letters are responsive
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing responsive carousel text sizing');

  // Remove the inline styles from index.md that might be interfering
  function removeInlineStyles() {
    const projectCodeLetters = document.querySelectorAll('.vertical-project-code div');
    projectCodeLetters.forEach(letter => {
      // Store original font size before removal
      const originalStyle = letter.getAttribute('style');
      if (originalStyle) {
        console.log('Removing inline style:', originalStyle);
        letter.removeAttribute('style');
      }
    });
  }

  // Function to update font sizes based on actual image dimensions
  function updateProjectCodeFontSizes() {
    console.log('Window resized or image loaded - updating font sizes');
    
    // Get the center carousel item
    const centerItem = document.getElementById('center-carousel-item');
    if (!centerItem) {
      console.error('Center carousel item not found');
      return;
    }
    
    // Get the actual image width
    const image = centerItem.querySelector('img');
    if (!image) {
      console.error('Image not found in center carousel item');
      return;
    }
    
    // Get the actual width of the image (this is the real rendered width)
    const imageWidth = image.offsetWidth;
    const windowWidth = window.innerWidth;
    
    console.log(`Image width: ${imageWidth}px, Window width: ${windowWidth}px`);
    
    // Find all vertical project code letters in the carousel
    const projectCodeLetters = document.querySelectorAll('.vertical-project-code div');
    console.log(`Found ${projectCodeLetters.length} project code letters`);
    
    // Update font sizes based on image width and window width
    projectCodeLetters.forEach((letter, index) => {
      let fontSize;
      
      // For center item, use responsive sizing based on window width
      if (letter.closest('.carousel-item.center')) {
        // Responsive formula: larger divisor for smaller screens
        const divisor = windowWidth < 768 ? 20 : (windowWidth < 1024 ? 15 : 12);
        fontSize = Math.max(1, Math.min(windowWidth / divisor / 16, 3));
        console.log(`Center letter ${index}: fontSize=${fontSize}rem (window/${divisor})`);
      } 
      // For left/right items, smaller font size
      else {
        const divisor = windowWidth < 768 ? 24 : (windowWidth < 1024 ? 18 : 15);
        fontSize = Math.max(0.8, Math.min(windowWidth / divisor / 16, 2.5));
        console.log(`Side letter ${index}: fontSize=${fontSize}rem (window/${divisor})`);
      }
      
      // Set the font size directly with !important to override any CSS
      letter.style.setProperty('font-size', `${fontSize}rem`, 'important');
    });
  }
  
  // First remove any inline styles that might interfere
  removeInlineStyles();
  
  // Run on page load after a slight delay to ensure DOM is fully loaded
  setTimeout(updateProjectCodeFontSizes, 100);
  
  // Run on window resize for responsiveness with throttling to improve performance
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateProjectCodeFontSizes, 100);
  });
  
  // Also run when images load to ensure accurate dimensions
  document.querySelectorAll('.carousel-item img').forEach(img => {
    img.addEventListener('load', updateProjectCodeFontSizes);
  });
});
