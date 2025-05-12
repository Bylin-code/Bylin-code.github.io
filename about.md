---
layout: default
title: About
permalink: /about/
---

<section class="about-page">
  <!-- Large header image -->
  <div class="about-image-container">
    <img src="/assets/images/webpage/about-main.jpg" alt="Brady Lin" class="about-main-image">
  </div>
  
  <div class="about-content">
    <!-- Vertical text columns -->
    <div class="vertical-text left-featured">
      <span>A</span>
      <span>B</span>
      <span>O</span>
      <span>U</span>
      <span>T</span>
      <span>&nbsp;</span>
      <span>M</span>
      <span>E</span>
    </div>
    
    <!-- Bio paragraph -->
    <div class="about-bio">
      <p>I'm a Computer Engineering student at Northwestern, always diving into projects that mix hardware, software, and creativity. I've worked on everything from building robotic systems to designing interactive MIDI controllers. I'm also excited about turning my tech ideas into real products, and when I'm not doing that, you'll find me involved in a cappella and exploring music production.</p>
    </div>
    
    <div class="vertical-text right-featured">
      <span>A</span>
      <span>B</span>
      <span>O</span>
      <span>U</span>
      <span>T</span>
      <span>&nbsp;</span>
      <span>M</span>
      <span>E</span>
    </div>
  </div>
  
  <!-- Projects button -->
  <div class="projects-button-container">
    <a href="/projects/" class="button">Projects</a>
  </div>
</section>

<style>
  .about-page {
    width: 100%;
    max-width: var(--site-content-width);
    margin: 0 auto;
    padding: 0 var(--site-padding) var(--spacing-xxlarge);
  }
  
  /* Header image styling */
  .about-image-container {
    width: 100%;
    margin-bottom: var(--spacing-xlarge);
    overflow: hidden;
  }
  
  .about-main-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
  
  /* Content area with vertical text and bio */
  .about-content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin-bottom: var(--spacing-xlarge);
    position: relative;
    min-height: 500px;
  }
  
  /* Using global vertical text styling from default.html */
  
  /* Define necessary variables */
  :root {
    --color-dark: #333333;
  }
  
  /* Bio paragraph styling */
  .about-bio {
    flex: 1;
    width: clamp(280px, 70%, 800px);
    margin: 0 auto;
    padding: 0 var(--spacing-large);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .about-bio p {
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: clamp(16px, 2.5vw, 26px);
    line-height: 3.5;
    margin: 0;
    color: var(--color-dark);
    text-align: justify;
    hyphens: auto;
    word-spacing: normal;
    letter-spacing: normal;
    white-space: pre-line;
    height: 100%;
    display: block;
  }
  
  /* Projects button styling */
  .projects-button-container {
    text-align: center;
    margin-top: var(--spacing-xlarge);
  }
  
  .button {
    display: inline-block;
    padding: var(--spacing-medium) var(--spacing-xlarge);
    background-color: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-text);
    text-decoration: none;
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: var(--font-size-medium);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
  }
  
  .button:hover {
    background-color: var(--color-text);
    color: var(--color-background);
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .about-content {
      flex-direction: column;
      align-items: center;
    }
    
    .vertical-text {
      flex-direction: row;
      margin: var(--spacing-large) 0;
      width: 100%;
      justify-content: center;
      padding: var(--spacing-medium) 0;
      height: auto;
    }
    
    .vertical-text span {
      margin: 0 0.2em;
      font-size: 1.5rem;
    }
    
    .left-featured {
      margin-bottom: var(--spacing-medium);
      order: 1;
    }
    
    .about-bio {
      order: 2;
      margin: var(--spacing-large) 0;
    }
    
    .right-featured {
      display: none; /* Hide the right text on mobile */
    }
  }
</style>
