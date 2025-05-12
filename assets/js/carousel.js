// Project carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  // Project data - would typically come from your CMS or data source
  const projects = [
    { 
      id: 1, 
      title: 'Smart Home Control System', 
      code: 'SMART',
      url: '/projects/project1/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+1'
    },
    { 
      id: 2, 
      title: 'Portable Audio Interface', 
      code: 'AUDIO',
      url: '/projects/project2/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+2'
    },
    { 
      id: 3, 
      title: 'Ergonomic Desktop Workstation', 
      code: 'ERGO',
      url: '/projects/project3/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+3'
    },
    { 
      id: 4, 
      title: 'Modular Lighting System', 
      code: 'LIGHT',
      url: '/projects/project4/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+4'
    },
    { 
      id: 5, 
      title: 'Sustainable Water Filtration', 
      code: 'WATER',
      url: '/projects/project5/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+5'
    },
    { 
      id: 6, 
      title: 'Wearable Health Monitor', 
      code: 'PULSE',
      url: '/projects/project6/',
      image: 'https://placehold.co/420x594/e2e2e2/333333?text=Project+6'
    }
  ];
  
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
  
  // Start auto-scrolling
  startAutoScroll();
  
  // Set up event listeners for navigation
  leftItem.addEventListener('click', function() {
    if (!isAnimating) navigateCarousel('left', true);
  });
  
  rightItem.addEventListener('click', function() {
    if (!isAnimating) navigateCarousel('right', true);
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
      
      // Show the text overlay halfway through the animation
      setTimeout(() => {
        const overlayElement = offscreenElement.querySelector('.project-code-overlay');
        if (overlayElement) {
          overlayElement.style.display = 'flex';
        }
      }, Math.floor(getTransitionTimeMs() / 2)); // Show text halfway through the animation
      
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
      
      // 1.1 Ensure text overlay is initially visible for the animation
      const overlayElement = offscreenElement.querySelector('.project-code-overlay');
      if (overlayElement) {
        // Make sure text is visible from the start for right transitions
        overlayElement.style.display = 'flex';
      }
      
      // 2. Apply animation classes for smooth slide transition
      // Force a reflow before adding animation classes
      void offscreenElement.offsetWidth;
      
      // Apply our animation classes
      rightItem.classList.add('slide-right-to-center');
      centerItem.classList.add('slide-center-to-left');
      leftItem.classList.add('slide-left-to-offscreen');
      offscreenElement.classList.add('slide-offscreen-to-right');
      
      // Show the text overlay halfway through the animation
      setTimeout(() => {
        const overlayElement = offscreenElement.querySelector('.project-code-overlay');
        if (overlayElement) {
          overlayElement.style.display = 'flex';
        }
      }, Math.floor(getTransitionTimeMs() / 2)); // Show text halfway through the animation
      
      // 3. After animation completes, clean up and update
      setTimeout(() => {
        // Update index for next slide
        currentIndex = (currentIndex + 1) % projects.length;
        
        // Clean up animation classes
        rightItem.classList.remove('slide-right-to-center');
        centerItem.classList.remove('slide-center-to-left');
        leftItem.classList.remove('slide-left-to-offscreen');
        offscreenElement.classList.remove('slide-offscreen-to-right');
        
        // Remove temporary element
        carousel.removeChild(offscreenElement);
        
        // Update carousel with new order
        updateCarouselItems();
        updateDots();
        
        // Animation finished
        isAnimating = false;
        
        // Call callback if provided
        if (callback) callback();
      }, getTransitionTimeMs()); // Get transition time from CSS variables
    }
  }
  
  // Helper function to create a project element
  function createProjectElement(projectIndex, positionClass) {
    const element = document.createElement('div');
    element.className = `carousel-item ${positionClass}`;
    
    // Only hide text for offscreen-left, but show for offscreen-right (to fix animation issue)
    const showTextInitially = positionClass !== 'offscreen-left';
    
    element.innerHTML = `
      <div class="project-image-container">
        <img src="${projects[projectIndex].image}" alt="${projects[projectIndex].title}" />
        <div class="project-code-overlay" style="${!showTextInitially ? 'display: none;' : ''}">
          ${projects[projectIndex].code.split('').map(letter => `<span>${letter}</span>`).join('')}
        </div>
      </div>
    `;
    return element;
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
    leftItem.innerHTML = `
      <div class="project-image-container">
        <img src="${projects[leftIndex].image}" alt="${projects[leftIndex].title}" />
        <div class="project-code-overlay">
          ${projects[leftIndex].code.split('').map(letter => `<span>${letter}</span>`).join('')}
        </div>
      </div>
    `;
    
    // Update center item with project (with link)
    centerItem.innerHTML = `
      <a href="${projects[currentIndex].url}">
        <div class="project-image-container">
          <img src="${projects[currentIndex].image}" alt="${projects[currentIndex].title}" />
          <div class="project-code-overlay">
            ${projects[currentIndex].code.split('').map(letter => `<span>${letter}</span>`).join('')}
          </div>
        </div>
      </a>
    `;
    
    // Update right item with project
    rightItem.innerHTML = `
      <div class="project-image-container">
        <img src="${projects[rightIndex].image}" alt="${projects[rightIndex].title}" />
        <div class="project-code-overlay">
          ${projects[rightIndex].code.split('').map(letter => `<span>${letter}</span>`).join('')}
        </div>
      </div>
    `;
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
});
