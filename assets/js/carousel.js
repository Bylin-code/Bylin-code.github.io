// FEATURED PROJECTS CAROUSEL - Interactive version with animations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing interactive carousel with animations');
  
  // Only run if we have the carousel container
  const carouselContainer = document.getElementById('featured-carousel');
  if (!carouselContainer) {
    console.log('No carousel container found, skipping initialization');
    return;
  }
  
  // Get featured projects data from the data div
  const featuredProjects = [];
  const projectElements = document.querySelectorAll('#featured-projects-data .project-data');
  
  // Process all project data
  projectElements.forEach((element, index) => {
    featuredProjects.push({
      id: element.getAttribute('data-project-id'),
      title: element.getAttribute('data-project-title'),
      url: element.getAttribute('data-project-url'),
      thumbnail: element.getAttribute('data-project-thumbnail'),
      code: element.getAttribute('data-project-code'),
      index: index
    });
  });
  
  console.log(`Found ${featuredProjects.length} featured projects`);
  
  // If no featured projects, nothing to do
  if (featuredProjects.length === 0) {
    console.log('No featured projects found');
    return;
  }
  
  // Initialize carousel state
  let currentIndex = 0;
  let isAnimating = false;
  
  // Get DOM elements for carousel items
  const leftItem = document.getElementById('left-carousel-item');
  const centerItem = document.getElementById('center-carousel-item');
  const rightItem = document.getElementById('right-carousel-item');

  
  // Set up click handlers for carousel navigation
  if (leftItem) {
    leftItem.addEventListener('click', function() {
      if (!isAnimating && featuredProjects.length > 1) {
        navigateCarousel('prev');
      }
    });
  }
  
  if (rightItem) {
    rightItem.addEventListener('click', function() {
      if (!isAnimating && featuredProjects.length > 1) {
        navigateCarousel('next');
      }
    });
  }
  
  // Helper function to get project indices based on current index
  function getProjectIndices() {
    const total = featuredProjects.length;
    
    // For single project, it's just center
    if (total === 1) {
      return { center: 0 };
    }
    
    // For two projects, alternate between them
    if (total === 2) {
      return {
        left: (currentIndex + 1) % 2,
        center: currentIndex
      };
    }
    
    // For 3+ projects, we have left, center, right
    const left = (currentIndex - 1 + total) % total;
    const right = (currentIndex + 1) % total;
    return { left, center: currentIndex, right };
  }
  
  // Display project code for each carousel item with animation
  function displayProjectCode(codeElement, projectCode, animate = false) {
    if (!codeElement) return;
    
    const codeContainer = codeElement.querySelector('.vertical-project-code');
    if (!codeContainer) return;
    
    // Clear existing content
    codeContainer.innerHTML = '';
    
    // Create letter divs for vertical display
    if (projectCode) {
      Array.from(projectCode).forEach((char, index) => {
        const letterDiv = document.createElement('div');
        letterDiv.textContent = char;
        
        if (animate) {
          // Add animation styles for revealing letters
          letterDiv.style.cssText = 'display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);opacity:0;transform:translateY(10px);transition:all 0.3s;';
          letterDiv.style.transitionDelay = `${index * 0.08}s`;
          
          // Reveal with delay
          setTimeout(() => {
            letterDiv.style.opacity = '1';
            letterDiv.style.transform = 'translateY(0)';
          }, 10);
        } else {
          // No animation for side items
          letterDiv.style.cssText = 'display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);';
        }
        
        codeContainer.appendChild(letterDiv);
      });
    }
  }
  
  // Main function to handle carousel navigation
  function navigateCarousel(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    // Get current indices
    const indices = getProjectIndices();
    
    // Calculate the next index based on direction
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % featuredProjects.length;
    } else {
      nextIndex = (currentIndex - 1 + featuredProjects.length) % featuredProjects.length;
    }
    
    // Calculate the new indices after navigation
    let newIndices = {
      center: nextIndex,
      left: (nextIndex - 1 + featuredProjects.length) % featuredProjects.length,
      right: (nextIndex + 1) % featuredProjects.length
    };
    

    
    // Create a new off-screen element if needed
    let offscreenElement = null;
    
    // Perform animations based on direction
    if (direction === 'next') {
      // When clicking right image:
      // 1. Right item slides to center
      // 2. Center item slides to left
      // 3. Left item slides off-screen
      // 4. New right item slides in from off-screen
      
      // Right to center, center to left, left to off-screen
      if (rightItem) rightItem.classList.add('slide-right-to-center');
      if (centerItem) centerItem.classList.add('slide-center-to-left');
      if (leftItem) leftItem.classList.add('slide-left-to-offscreen');
      
      // Create new off-screen right element
      offscreenElement = document.createElement('div');
      offscreenElement.className = 'carousel-item offscreen-right';
      offscreenElement.id = 'offscreen-carousel-item';
      offscreenElement.style.position = 'absolute';
      offscreenElement.style.left = '110%';
      offscreenElement.style.top = '50%';
      offscreenElement.style.transform = 'translate(-50%, -50%) scale(0)';
      offscreenElement.style.opacity = '0';
      offscreenElement.style.zIndex = '0';
      
      // Create image container for new element
      const imageContainer = document.createElement('div');
      imageContainer.className = 'project-image-container';
      
      // Create image
      const img = document.createElement('img');
      img.src = featuredProjects[newIndices.right].thumbnail;
      img.alt = featuredProjects[newIndices.right].title;
      
      // Create project code overlay
      const overlay = document.createElement('div');
      overlay.className = 'project-code-overlay';
      
      // Create vertical project code container
      const codeContainer = document.createElement('div');
      codeContainer.className = 'vertical-project-code';
      
      // Add project code letters
      if (featuredProjects[newIndices.right].code) {
        Array.from(featuredProjects[newIndices.right].code).forEach(char => {
          const letterDiv = document.createElement('div');
          letterDiv.textContent = char;
          letterDiv.style.cssText = 'display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);';
          codeContainer.appendChild(letterDiv);
        });
      }
      
      // Assemble everything
      overlay.appendChild(codeContainer);
      imageContainer.appendChild(img);
      imageContainer.appendChild(overlay);
      offscreenElement.appendChild(imageContainer);
      
      // Add to carousel
      carouselContainer.appendChild(offscreenElement);
      
      // Begin animation for the new element after a short delay
      setTimeout(() => {
        offscreenElement.classList.add('slide-offscreen-to-right');
      }, 50);
      
      // After animation completes
      setTimeout(() => {
        // Remove animation classes
        if (rightItem) rightItem.classList.remove('slide-right-to-center');
        if (centerItem) centerItem.classList.remove('slide-center-to-left');
        if (leftItem) leftItem.classList.remove('slide-left-to-offscreen');
        if (offscreenElement) offscreenElement.classList.remove('slide-offscreen-to-right');
        
        // Update current index
        currentIndex = nextIndex;
        
        // Clean up temporary element
        if (offscreenElement) {
          carouselContainer.removeChild(offscreenElement);
        }
        
        // Update carousel display with new indices
        updateCarouselDisplay(true);
        
        // Animation complete
        isAnimating = false;
      }, 500); // Match CSS animation duration
    } else {
      // When clicking left image:
      // 1. Left item slides to center
      // 2. Center item slides to right
      // 3. Right item slides off-screen
      // 4. New left item slides in from off-screen
      
      // Left to center, center to right, right to off-screen
      if (leftItem) leftItem.classList.add('slide-left-to-center');
      if (centerItem) centerItem.classList.add('slide-center-to-right');
      if (rightItem) rightItem.classList.add('slide-right-to-offscreen');
      
      // Create new off-screen left element
      offscreenElement = document.createElement('div');
      offscreenElement.className = 'carousel-item offscreen-left';
      offscreenElement.id = 'offscreen-carousel-item';
      offscreenElement.style.position = 'absolute';
      offscreenElement.style.left = '-10%';
      offscreenElement.style.top = '50%';
      offscreenElement.style.transform = 'translate(-50%, -50%) scale(0)';
      offscreenElement.style.opacity = '0';
      offscreenElement.style.zIndex = '0';
      
      // Create image container for new element
      const imageContainer = document.createElement('div');
      imageContainer.className = 'project-image-container';
      
      // Create image
      const img = document.createElement('img');
      img.src = featuredProjects[newIndices.left].thumbnail;
      img.alt = featuredProjects[newIndices.left].title;
      
      // Create project code overlay
      const overlay = document.createElement('div');
      overlay.className = 'project-code-overlay';
      
      // Create vertical project code container
      const codeContainer = document.createElement('div');
      codeContainer.className = 'vertical-project-code';
      
      // Add project code letters
      if (featuredProjects[newIndices.left].code) {
        Array.from(featuredProjects[newIndices.left].code).forEach(char => {
          const letterDiv = document.createElement('div');
          letterDiv.textContent = char;
          letterDiv.style.cssText = 'display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);';
          codeContainer.appendChild(letterDiv);
        });
      }
      
      // Assemble everything
      overlay.appendChild(codeContainer);
      imageContainer.appendChild(img);
      imageContainer.appendChild(overlay);
      offscreenElement.appendChild(imageContainer);
      
      // Add to carousel
      carouselContainer.appendChild(offscreenElement);
      
      // Begin animation for the new element after a short delay
      setTimeout(() => {
        offscreenElement.classList.add('slide-offscreen-to-left');
      }, 50);
      
      // After animation completes
      setTimeout(() => {
        // Remove animation classes
        if (leftItem) leftItem.classList.remove('slide-left-to-center');
        if (centerItem) centerItem.classList.remove('slide-center-to-right');
        if (rightItem) rightItem.classList.remove('slide-right-to-offscreen');
        if (offscreenElement) offscreenElement.classList.remove('slide-offscreen-to-left');
        
        // Update current index
        currentIndex = nextIndex;
        
        // Clean up temporary element
        if (offscreenElement) {
          carouselContainer.removeChild(offscreenElement);
        }
        
        // Update carousel display with new indices
        updateCarouselDisplay(true);
        
        // Animation complete
        isAnimating = false;
      }, 500); // Match CSS animation duration
    }
  }
  
  // Update the carousel display based on current indices
  function updateCarouselDisplay(animate = false) {
    // Get current indices for all positions
    const indices = getProjectIndices();
    
    // Update center item
    if (centerItem && 'center' in indices) {
      const centerProject = featuredProjects[indices.center];
      
      // Update content
      const centerTitle = centerItem.querySelector('.project-overlay h2');
      const centerDate = centerItem.querySelector('.project-overlay .post-date');
      const centerLink = centerItem.querySelector('a.project-link');
      const centerImage = centerItem.querySelector('img');
      const centerCodeOverlay = centerItem.querySelector('.project-code-overlay');
      
      if (centerTitle) centerTitle.textContent = centerProject.title;
      if (centerDate) centerDate.textContent = new Date(centerProject.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      if (centerLink) centerLink.href = centerProject.url;
      if (centerImage) {
        centerImage.src = centerProject.thumbnail;
        centerImage.alt = centerProject.title;
      }
      
      // Update project code with animation for center item
      displayProjectCode(centerCodeOverlay, centerProject.code, animate);
    }
    
    // Update left item
    if (leftItem && 'left' in indices) {
      const leftProject = featuredProjects[indices.left];
      
      const leftImage = leftItem.querySelector('img');
      const leftCodeOverlay = leftItem.querySelector('.project-code-overlay');
      
      if (leftImage) {
        leftImage.src = leftProject.thumbnail;
        leftImage.alt = leftProject.title;
      }
      
      // Update project code without animation for side items
      displayProjectCode(leftCodeOverlay, leftProject.code, false);
    }
    
    // Update right item
    if (rightItem && 'right' in indices) {
      const rightProject = featuredProjects[indices.right];
      
      const rightImage = rightItem.querySelector('img');
      const rightCodeOverlay = rightItem.querySelector('.project-code-overlay');
      
      if (rightImage) {
        rightImage.src = rightProject.thumbnail;
        rightImage.alt = rightProject.title;
      }
      
      // Update project code without animation for side items
      displayProjectCode(rightCodeOverlay, rightProject.code, false);
    }
  }
  
  // Initialize carousel display
  updateCarouselDisplay(true);
});
