document.addEventListener('DOMContentLoaded', function() {
  // Function to precisely align text with image top and bottom
  function alignTextWithImage() {
    const aboutImage = document.getElementById('about-image');
    const textContainer = document.getElementById('about-text-content');
    const paragraph = textContainer ? textContainer.querySelector('p') : null;
    
    if (!aboutImage || !textContainer || !paragraph) return;
    
    // Get the image height
    const imageHeight = aboutImage.offsetHeight;
    
    // Get text content
    const text = paragraph.textContent || paragraph.innerText;
    
    // Complete reset of any previous styling
    textContainer.style.cssText = '';
    paragraph.style.cssText = '';
    
    // First approach: Use exact height calculation
    
    // 1. Set container to exact image height
    textContainer.style.height = imageHeight + 'px';
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.justifyContent = 'flex-start';
    
    // 2. Use much larger font size
    paragraph.style.fontSize = '28px';
    paragraph.style.margin = '0';
    
    // 3. Set initial styles to measure content
    paragraph.style.lineHeight = 'normal';
    
    // 4. Get text metrics after initial styling
    const initialHeight = paragraph.offsetHeight;
    const approxLinesCount = Math.max(Math.ceil(text.length / 50), 2); // Rough approximation
    
    // 5. Calculate exact line height needed
    const neededLineHeight = (imageHeight - 10) / approxLinesCount; // Slight adjustment
    
    // 6. Apply precise line height
    paragraph.style.lineHeight = neededLineHeight + 'px';
    
    // 7. Final verification and adjustments if needed
    setTimeout(() => {
      const finalHeight = paragraph.offsetHeight;
      
      // If we still have a significant difference, make one final adjustment
      if (Math.abs(finalHeight - imageHeight) > 20) {
        const adjustmentFactor = imageHeight / finalHeight;
        paragraph.style.lineHeight = (neededLineHeight * adjustmentFactor) + 'px';
      }
    }, 10);
  }
  
  // Initial alignment
  alignTextWithImage();
  
  // Realign on window resize
  window.addEventListener('resize', alignTextWithImage);
});
