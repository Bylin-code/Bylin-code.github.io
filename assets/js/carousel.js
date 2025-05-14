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
    // Only add projects explicitly marked as featured
    const isFeatured = element.getAttribute('data-featured') === 'true';
    if (isFeatured) {
      featuredProjects.push({
        id: element.getAttribute('data-project-id'),
        title: element.getAttribute('data-project-title'),
        url: element.getAttribute('data-project-url'),
        thumbnail: element.getAttribute('data-project-thumbnail'),
        code: element.getAttribute('data-project-code'),
        date: element.getAttribute('data-project-date'),
        index: index
      });
    }
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
      
      // Update navigation dots to reflect current project
      updateCarouselDots(currentIndex);
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
  
  // Function to update carousel navigation dots with industrial animation
  function updateCarouselDots(activeIndex) {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    // Get all dots
    const dots = dotsContainer.querySelectorAll('.dot');
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current dot with staggered timing
    if (dots[activeIndex]) {
      // Short delay for mechanical feeling
      setTimeout(() => {
        dots[activeIndex].classList.add('active');
      }, 50);
    }
  }
  
  // Make dots clickable for direct navigation
  function setupDotNavigation() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        if (!isAnimating && index !== currentIndex) {
          // Determine if we're going forward or backward
          const direction = index > currentIndex ? 'next' : 'prev';
          
          // Set the new index directly
          const targetIndex = index;
          
          // Create mechanical sound effect (optional)
          const clickSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fk5OTk5OTx8fHx8fH///////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAX/+M4wDw5sGZIBhqCoR9Z/YUWDChCSfg+BAXnqP63f4UChYMUBAIBgdMRn/4EAwYcD/4sUCIT/wQCBoEAQDFjGP//gg/8QEDv6BgQ/+CYP///hf/xIIf5EP///5f//KNRbmZ2/+M4wGw1GGKIH5qAoPmb1W1BerZyZsEyZZMaTIvGYhM4ZU9PW1VdOxmQlL4/3X0GS5JlYWczmQ3GvsUL380l21l0W+J5K/RGDxKGRg8SJUVQpGsfnB0Pj88Vlc4PB0dHR0fn90OjaenT/+M4wKQ2qAKoL4qAoKNR0yWTJZVCPuimomkyaJ5MrTFkzz0ChUd8pHXIRpbP/K1Uak97y1ReIh+eIxZ68RT//9RS0O/8chGJPBITiD9jbEVHIRjDgyCZyHZ00JgRHDEAEBA7//2P/+M4wLoBCHrFv8IwATJ4TG3xM/8gYqcThTzNOHm8XDmwk4QM2LhhLzgmPHDKQEw6dMQleJxw8eKg8JxCHPFzB8aMmDRg0YRhGHPNi55d9HP//zXPS+3//uzzz/zzfzzz0ki4GiL/+M4wOsypCrFvjUFgVpbtVKqiiBXtVaQiuVNSnZTS0nZSorLf62mQiJ2/9J16SzX//+lifuiJpSyX///9LJf////kv///5KJKWTskkkkkkCAgICAgICAgICAgICAgICAgICAgICAgAgA=');
          clickSound.volume = 0.1; // Very subtle volume
          clickSound.play().catch(e => console.log('Audio play prevented by browser'));
          
          // Save current index to determine how many steps to navigate
          const originalIndex = currentIndex;
          
          // Set next index to the target index directly
          currentIndex = targetIndex;
          
          // Update carousel with animation
          updateCarouselDisplay(true);
        }
      });
    });
  }
  
  // Initialize carousel display
  updateCarouselDisplay(true);
  
  // Initialize dot navigation
  setupDotNavigation();
  
  // Auto-scrolling functionality
  let autoScrollTimer; // Timer for auto-scrolling
  let isHovering = false; // Track if user is hovering over carousel
  
  // Function to start auto-scroll timer
  function startAutoScroll() {
    // Clear any existing timer first
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
    }
    
    // Get the auto-scroll interval from CSS variables (default to 4.5s if not found)
    const root = document.documentElement;
    const intervalStr = getComputedStyle(root).getPropertyValue('--carousel-auto-scroll-interval').trim();
    const interval = intervalStr ? parseFloat(intervalStr) * 1000 : 4500;
    
    // Set new timer
    autoScrollTimer = setInterval(() => {
      // Only auto-scroll if not animating and not being hovered
      if (!isAnimating && !isHovering && featuredProjects.length > 1) {
        navigateCarousel('next');
      }
    }, interval);
    
    console.log(`Auto-scroll started with interval: ${interval}ms`);
  }
  
  // Add hover detection to pause auto-scrolling
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      isHovering = true;
      console.log('Carousel hover: pausing auto-scroll');
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      isHovering = false;
      console.log('Carousel hover ended: resuming auto-scroll');
    });
  }
  
  // Modify navigateCarousel to reset the timer when user manually navigates
  const originalNavigateCarousel = navigateCarousel;
  navigateCarousel = function(direction) {
    // Call the original function
    originalNavigateCarousel(direction);
    
    // Reset the auto-scroll timer
    startAutoScroll();
  };
  
  // Start auto-scrolling initially
  startAutoScroll();
});
