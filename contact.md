---
layout: default
title: Contact
permalink: /contact/
---

<section class="contact">
  <h1>Connect</h1>
  
  <div class="vertical-links-container">
    <a href="mailto:bradylin2008@gmail.com" class="vertical-link">
      <div class="vertical-text">
        <span>E</span>
        <span>M</span>
        <span>A</span>
        <span>I</span>
        <span>L</span>
      </div>
    </a>
    
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
    margin: 0 auto var(--spacing-xlarge);
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
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: var(--spacing-large);
    height: calc(100vh + 100px);
    overflow: hidden;
    padding: 0;
  }
  
  .vertical-link {
    position: relative;
    text-decoration: none;
    color: var(--color-text);
    transition: color 0.3s ease, transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 0;
    opacity: 0.6;
  }
  
  .vertical-link:hover {
    color: #000;
    opacity: 1;
    transform: translateY(-15px);
  }
  
  .vertical-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-start;
  }
  
  .vertical-text span {
    font-family: 'Montserrat', Arial, sans-serif;
    font-size: 6rem;
    font-weight: 600;
    line-height: 0.9;
    text-transform: uppercase;
    letter-spacing: -0.05em;
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
  }
  
  @media (max-width: 768px) {
    .vertical-links-container {
      flex-direction: column;
      align-items: center;
      height: auto;
      gap: var(--spacing-large);
    }
    
    .vertical-link {
      height: auto;
      width: 100%;
      margin-bottom: var(--spacing-large);
    }
    
    .vertical-text {
      flex-direction: row;
      justify-content: center;
      height: auto;
    }
    
    .vertical-text span {
      font-size: 2.5rem;
      margin: 0 0.1em;
    }
  }
</style>
