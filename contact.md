---
layout: default
title: Contact
permalink: /contact/
---

<section class="contact">
  <h1>Connect</h1>
  
  <div class="vertical-links-container">
    <div class="link-wrapper">
      <a href="mailto:bradylin2008@gmail.com" class="vertical-link">
        <div class="vertical-text">
          <span>E</span>
          <span>M</span>
          <span>A</span>
          <span>I</span>
          <span>L</span>
        </div>
      </a>
    </div>
    
    <div class="link-wrapper">
      <a href="https://github.com/bylin-code" class="vertical-link" target="_blank">
        <div class="vertical-text">
          <span>G</span>
          <span>I</span>
          <span>T</span>
          <span>H</span>
          <span>U</span>
          <span>B</span>
        </div>
      </a>
    </div>
    
    <div class="link-wrapper">
      <a href="https://youtube.com/@bylin04" class="vertical-link" target="_blank">
        <div class="vertical-text">
          <span>Y</span>
          <span>O</span>
          <span>U</span>
          <span>T</span>
          <span>U</span>
          <span>B</span>
          <span>E</span>
        </div>
      </a>
    </div>

    <div class="link-wrapper">
      <a href="https://www.linkedin.com/in/brady-lin/" class="vertical-link" target="_blank">
        <div class="vertical-text">
          <span>L</span>
          <span>I</span>
          <span>N</span>
          <span>K</span>
          <span>E</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
        </div>
      </a>
    </div>
    
    <div class="link-wrapper">
      <a href="https://instagram.com/b.y.lin" class="vertical-link" target="_blank">
        <div class="vertical-text">
          <span>I</span>
          <span>N</span>
          <span>S</span>
          <span>T</span>
          <span>A</span>
          <span>G</span>
          <span>R</span>
          <span>A</span>
          <span>M</span>
        </div>
      </a>
    </div>
  </div>
</section>

<style>
  .contact {
    width: 100%;
    max-width: var(--site-content-width);
    margin: 0 auto;
    padding: var(--spacing-xlarge) var(--site-padding);
    min-height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .contact h1 {
    font-family: 'Montserrat Alternates', Arial, sans-serif;
    font-size: var(--font-size-xxlarge);
    margin: 0 auto 0px; /* Reduced bottom margin */
    text-align: center;
    border-bottom: none;
    position: relative;
    width: 100%;
    left: 0px;
    right: 0px;
  }
  
  /* Remove any default horizontal lines */
  .contact h1::after,
  .contact h1::before {
    display: none;
  }
  
  .vertical-links-container {
    display: flex;
    justify-content: space-around; /* More even spacing */
    align-items: flex-start;
    width: 100%;
    margin-top: 40px; /* Reduced space after the Connect header */
    min-height: calc(100vh - 200px); /* Reduced fixed height */
    height: auto; /* Allow auto height based on content */
    overflow: visible; /* Show overflowing content */
    padding: 0 var(--spacing-medium);
    position: relative; /* Establish positioning context */
  }
  
  .vertical-link {
    position: relative;
    text-decoration: none;
    color: var(--color-text);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto; /* Height based on content */
    padding: 0 10px; /* Add horizontal padding */
    opacity: 0.6;
    margin-bottom: 20px; /* Add bottom margin */
    cursor: pointer; /* Clear cursor indication */
    z-index: 100; /* Higher z-index to ensure visibility */
    pointer-events: auto !important; /* Ensure clickability */
    will-change: transform, opacity; /* Performance optimization */
  }
  
  .vertical-link:hover {
    color: #000;
    opacity: 1;
    transform: translateY(-35px) scale(1.1); /* More dramatic jump with scale effect */
    transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.5); /* Bouncier animation */
    text-shadow: 0 10px 20px rgba(0,0,0,0.1); /* Subtle shadow for depth */
  }
  
  .vertical-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto; /* Height based on content */
    justify-content: flex-start;
    padding-bottom: 20px; /* Add padding at bottom */
  }
  
  .vertical-text span {
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: clamp(3rem, 5vw, 6rem); /* Responsive font size */
    font-weight: 600;
    line-height: 1.1; /* Increased line height */
    text-transform: uppercase;
    letter-spacing: -0.05em;
    margin-bottom: 5px; /* Add spacing between letters */
  }
  
  /* Link wrapper to ensure proper clickable area */
  .link-wrapper {
    display: block;
    position: relative;
    width: 80px; /* Fixed width to avoid content shift */
    text-align: center;
  }
  
  /* Override default.html styles that block clicks */
  .vertical-links-container .vertical-text {
    pointer-events: auto !important; /* Override global setting */
    position: relative; /* Override absolute positioning */
  }
  
  /* Ensure all children are clickable too */
  .vertical-links-container .vertical-text * {
    pointer-events: auto !important;
  }
  
  /* Mobile responsiveness */
  
  @media (max-width: 1200px) {
    .vertical-links-container {
      height: auto;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--spacing-small);
    }
    
    .vertical-text span {
      font-size: 4rem;
    }
    
    .link-wrapper {
      width: auto;
      margin: 0 10px;
    }
  }
  
  @media (max-width: 768px) {
    .vertical-links-container {
      flex-direction: column;
      align-items: center;
      height: auto;
      gap: var(--spacing-large);
      width: 100%;
    }
    
    .link-wrapper {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .vertical-link {
      height: auto;
      width: 100%;
      margin-bottom: 0;
      padding: 10px 0;
    }
    
    .vertical-text {
      flex-direction: row;
      justify-content: center;
      height: auto;
      width: 100%;
      padding: 10px 0;
    }
    
    .vertical-text span {
      font-size: 2.5rem;
      margin: 0 0.1em;
      display: inline-block;
    }
  }
</style>
