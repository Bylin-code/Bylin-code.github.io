// Project carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  // SIGNIFICANTLY IMPROVED VERSION - MORE ROBUST
  // Function to fetch featured project data with robust error handling
  function getProjectsFromPosts() {
    console.log('Starting carousel with robust error handling');
    
    try {
      // Get all featured project data attributes from the hidden div
      const projectPosts = document.querySelectorAll('#project-data [data-project-post]');
      console.log('Found featured projects:', projectPosts.length);
      
      // Create an array with only the featured projects
      const projectData = [];
      
      if (projectPosts.length > 0) {
        projectPosts.forEach((post, index) => {
          try {
            const project = {
              // Use index+1 as ID instead of relying on specific IDs
              id: index + 1,
              title: post.getAttribute('data-project-title') || `Project ${index + 1}`,
              url: post.getAttribute('data-project-url') || '#',
              image: post.getAttribute('data-project-thumbnail') || 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Project',
              code: post.getAttribute('data-project-code') || 'FEAT'
            };
            console.log('Adding featured project:', project.title);
            projectData.push(project);
          } catch (itemError) {
            console.error('Error processing project item:', itemError);
            // Add a placeholder project if we encounter an error
            projectData.push({
              id: index + 1,
              title: `Featured Project ${index + 1}`,
              url: '#',
              image: 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Project',
              code: 'FEAT'
            });
          }
        });
        
        // Log the filtered list
        console.log('Final featured project list:', projectData);
        return projectData;
      }
      
      // Fallback with placeholder projects - will work even if specific projects are removed
      console.log('WARNING: No featured project data found, using placeholders');
      return [
        { 
          id: 1, 
          title: 'Featured Project 1', 
          url: '#',
          image: 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Project+1',
          code: 'FEAT1'
        },
        { 
          id: 2, 
          title: 'Featured Project 2', 
          url: '#',
          image: 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Project+2',
          code: 'FEAT2'
        },
        { 
          id: 3, 
          title: 'Featured Project 3', 
          url: '#',
          image: 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Project+3',
          code: 'FEAT3'
        }
      ];
    } catch (error) {
      console.error('Error in getProjectsFromPosts:', error);
      // Ultimate fallback if everything else fails
      return [
        { 
          id: 999, 
          title: 'Featured Projects', 
          url: '/projects/',
          image: 'https://placehold.co/420x594/e2e2e2/333333?text=Featured+Projects',
          code: 'PROJ'
        }
      ];
    }
  }
  
  // Get project data
  const projects = getProjectsFromPosts();
  
  // Initial configuration
  let currentIndex = 2; // Start with the third project (index 2) active
  let isAnimating = false; // Flag to prevent clicking during animations
  let autoScrollTimerId = null; // For tracking the auto-scroll timer
  let userInteracted = false; // Flag to track if user has interacted with carousel
  
  // Cache carousel elements for better performance
  const carousel = document.querySelector('.carousel-container');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const leftItem = document.querySelector('.carousel-item.left');
  const centerItem = document.querySelector('.carousel-item.center');
  const rightItem = document.querySelector('.carousel-item.right'); 
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  // Initialize carousel with initial data
  updateCarouselItems();
  updateDots();
  
  // Trigger initial project code reveal after a short delay
  setTimeout(() => {
    revealProjectCode();
  }, 0);
  
  // Start auto-scrolling
  startAutoScroll();
  
  // Set up event listeners for navigation
  leftItem.addEventListener('click', function() {
    if (!isAnimating) navigateCarousel('left', true);
  });
  
  rightItem.addEventListener('click', function() {
    if (!isAnimating) navigateCarousel('right', true);
  });
  
  // Pause auto-scrolling when hovering over the center image
  centerItem.addEventListener('mouseenter', function() {
    stopAutoScroll();
  });
  
  centerItem.addEventListener('mouseleave', function() {
    startAutoScroll();
  });
  
  // Set up dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      if (!isAnimating && index !== currentIndex) {
        // Determine which direction to animate
        const direction = index > currentIndex ? 'right' : 'left';
        // How many steps to take
        const steps = Math.abs(index - currentIndex);
        
        // Mark as user interaction
        userInteracted = true;
        resetUserInteracted();
        
        // For multiple steps, we'll chain the animations
        navigateCarousel(direction, function() {
          if (steps > 1) {
            // Schedule the next step after a slight delay
            setTimeout(() => dots[index].click(), 50);
          }
        });
      }
    });
  });
  
  // Get the transition time from CSS variables
  function getTransitionTimeMs() {
    // Get the CSS variable value (returns something like '1s')
    const transitionTimeStr = getComputedStyle(document.documentElement)
      .getPropertyValue('--carousel-transition-time').trim();
    
    // Convert to milliseconds (assumes the format is always in seconds with 's' suffix)
    const seconds = parseFloat(transitionTimeStr);
    return seconds * 1000; // Convert to milliseconds
  }
  
  // Get the auto-scroll interval from CSS variables
  function getAutoScrollIntervalMs() {
    // Get the CSS variable value
    const intervalTimeStr = getComputedStyle(document.documentElement)
      .getPropertyValue('--carousel-auto-scroll-interval').trim();
    
    // Convert to milliseconds (assumes the format is always in seconds with 's' suffix)
    const seconds = parseFloat(intervalTimeStr);
    return seconds * 1000; // Convert to milliseconds
  }
  
  // Start auto-scrolling
  function startAutoScroll() {
    // Clear any existing timer first
    if (autoScrollTimerId) {
      clearInterval(autoScrollTimerId);
    }
    
    // Set up a new timer to auto-scroll the carousel
    autoScrollTimerId = setInterval(() => {
      // Only auto-scroll if not currently animating and user hasn't interacted recently
      if (!isAnimating && !userInteracted) {
        navigateCarousel('right');
      }
    }, getAutoScrollIntervalMs());
  }
  
  // Stop auto-scrolling
  function stopAutoScroll() {
    if (autoScrollTimerId) {
      clearInterval(autoScrollTimerId);
      autoScrollTimerId = null;
    }
  }
  
  // Reset user interaction flag after a delay
  function resetUserInteracted() {
    // After 10 seconds of no interaction, reset the flag to allow auto-scrolling again
    setTimeout(() => {
      userInteracted = false;
    }, 10000);
  }
  
  // Main carousel navigation function
  function navigateCarousel(direction, callback) {
    isAnimating = true;
    
    // If this is triggered by a user action, set the flag
    if (callback) {
      userInteracted = true;
      resetUserInteracted();
    }
    updateDots(); // Update dots to match current position
    
    if (direction === 'left') {
      // LEFT NAVIGATION - Move roster leftward
      
      // 1. Create new offscreen element that will slide in from left
      const newLeftIndex = (currentIndex - 2 + projects.length) % projects.length;
      const offscreenElement = createProjectElement(newLeftIndex, 'offscreen-left');
      carousel.appendChild(offscreenElement);
      
      // 2. Apply animation classes for smooth slide transition
      // Force a reflow before adding animation classes
      void offscreenElement.offsetWidth;
      
      // Apply our animation classes
      leftItem.classList.add('slide-left-to-center');
      centerItem.classList.add('slide-center-to-right');
      rightItem.classList.add('slide-right-to-offscreen');
      offscreenElement.classList.add('slide-offscreen-to-left');
      
      // 3. After animation completes, clean up and update
      setTimeout(() => {
        // Update index for next slide
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        
        // Clean up animation classes
        leftItem.classList.remove('slide-left-to-center');
        centerItem.classList.remove('slide-center-to-right');
        rightItem.classList.remove('slide-right-to-offscreen');
        offscreenElement.classList.remove('slide-offscreen-to-left');
        
        // Remove temporary element
        carousel.removeChild(offscreenElement);
        
        // Update carousel with new order
        updateCarouselItems();
        updateDots();
        
        // Trigger the project code reveal animation
        revealProjectCode();
        
        // Animation finished
        isAnimating = false;
        
        // Call callback if provided
        if (callback) callback();
      }, getTransitionTimeMs()); // Get transition time from CSS variables
    } 
    else {
      // RIGHT NAVIGATION - Move roster rightward
      
      // 1. Create new offscreen element that will slide in from right
      const newRightIndex = (currentIndex + 2) % projects.length;
      const offscreenElement = createProjectElement(newRightIndex, 'offscreen-right');
      carousel.appendChild(offscreenElement);
      
      // 2. Apply animation classes for smooth slide transition
      // Force a reflow before adding animation classes
      void offscreenElement.offsetWidth;
      
      // Apply our animation classes
      rightItem.classList.add('slide-right-to-center');
      centerItem.classList.add('slide-center-to-left');
      leftItem.classList.add('slide-left-to-offscreen');
      offscreenElement.classList.add('slide-offscreen-to-right');
      
      // 3. After animation completes, clean up and update
      setTimeout(() => {
        // Update index for next slide
        currentIndex = (currentIndex + 1) % projects.length;
        
        // Clean up animation classes
        leftItem.classList.remove('slide-left-to-offscreen');
        centerItem.classList.remove('slide-center-to-left');
        rightItem.classList.remove('slide-right-to-center');
        offscreenElement.classList.remove('slide-offscreen-to-right');
        
        // Remove temporary element
        carousel.removeChild(offscreenElement);
        
        // Update carousel with new order
        updateCarouselItems();
        updateDots();
        
        // Trigger the project code reveal animation
        revealProjectCode();
        
        // Animation finished
        isAnimating = false;
        
        // Call callback if provided
        if (callback) callback();
      }, getTransitionTimeMs()); // Get transition time from CSS variables
    }
  }
  
  // Helper function to create a project element
  function createProjectElement(projectIndex, positionClass) {
    const div = document.createElement('div');
    div.className = `carousel-item ${positionClass}`;
    div.setAttribute('data-project-code', projects[projectIndex].code);
    
    // Create image container for overlay
    // Only add project code overlay for center position
    const projectCodeOverlay = positionClass === 'center' ? 
      `<div class="project-code-overlay">
        ${projects[projectIndex].code.split('').map(letter => `<span class="hidden">${letter}</span>`).join('')}
      </div>` : '';
    
    div.innerHTML = `
      <div class="project-image-container">
        <img src="${projects[projectIndex].image}" alt="${projects[projectIndex].title}">
        ${projectCodeOverlay}
      </div>
    `;
    
    return div;
  }
  
  // Update carousel items with current projects
  function updateCarouselItems() {
    // Calculate adjacent project indexes
    const leftIndex = (currentIndex - 1 + projects.length) % projects.length;
    const rightIndex = (currentIndex + 1) % projects.length;
    
    // Clear current items
    leftItem.innerHTML = '';
    centerItem.innerHTML = '';
    rightItem.innerHTML = '';
    
    // Update left item with project
    leftItem.innerHTML = `<div class="project-image-container"><img src="${projects[leftIndex].image}" alt="${projects[leftIndex].title}" /></div>`;
    
    // Update center item with project (with link and project code overlay)
    const projectCode = projects[currentIndex].code;
    centerItem.innerHTML = `
      <div class="project-image-container">
        <a href="${projects[currentIndex].url}">
          <img src="${projects[currentIndex].image}" alt="${projects[currentIndex].title}" />
        </a>
        <div class="project-code-overlay">
          ${projectCode.split('').map(letter => `<span class="hidden">${letter}</span>`).join('')}
        </div>
      </div>
    `;
    
    // Update right item with project
    rightItem.innerHTML = `<div class="project-image-container"><img src="${projects[rightIndex].image}" alt="${projects[rightIndex].title}" /></div>`;
    
    // Reset the project code animation
    resetProjectCodeAnimation();
  }
  
  // Update dot indicators
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Function to reset project code animation by hiding all letters
  function resetProjectCodeAnimation() {
    const centerItem = document.querySelector('.carousel-item.center');
    if (!centerItem) return;
    
    const letters = centerItem.querySelectorAll('.project-code-overlay span');
    if (!letters.length) return;
    
    // Reset all letters to hidden state
    letters.forEach(letter => {
      letter.classList.remove('reveal');
      letter.classList.add('hidden');
    });
  }

  // Function to reveal project code letters one by one with animation
  function revealProjectCode() {
    // Get the center item's project code overlay
    const centerItem = document.querySelector('.carousel-item.center');
    if (!centerItem) return;
    
    const letters = centerItem.querySelectorAll('.project-code-overlay span');
    if (!letters.length) return;
    
    // Reset all letters to hidden state first
    letters.forEach(letter => {
      letter.classList.remove('reveal');
      letter.classList.add('hidden');
    });
    
    // Get the reveal delay between letters from CSS variable
    const revealDelay = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--project-code-reveal-delay').trim()) * 1000;
    
    // For transitions, use the transition time from CSS
    const transitionTime = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--carousel-transition-time').trim()) * 1000;
    
    // Start revealing letters immediately after transition completes
    // with no additional delay
    setTimeout(() => {
      // Reveal letters one by one with delay
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.remove('hidden');
          letter.classList.add('reveal');
        }, index * revealDelay);
      });
    }, transitionTime);
  }
});
