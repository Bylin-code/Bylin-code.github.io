---
layout: default
title: Home
permalink: /
---

<div class="welcome-image-container">
  <a href="/">
    <div class="welcome-image-wrapper">
      <img src="assets/images/webpage/home-welcome.jpg" alt="Welcome" class="gallery-image" />
      <div class="welcome-overlay"></div>
      <div class="welcome-text">
        <span>H</span>
        <span>E</span>
        <span>L</span>
        <span>L</span>
        <span>O</span>
      </div>
      <div class="welcome-subtitle"><span class="arrow down-arrow">↓</span> scroll to see what I've been working on <span class="arrow down-arrow">↓</span></div>
    </div>
  </a>
</div>

<div class="project-carousel">
  <div class="vertical-text left-featured">
    <span>F</span>
    <span>E</span>
    <span>A</span>
    <span>T</span>
    <span>U</span>
    <span>R</span>
    <span>E</span>
    <span>D</span>
  </div>
  
  <!-- Hidden project data that will be read by the carousel JavaScript -->
  <div id="project-data" style="display: none;">
    {% assign featured_projects = site.posts | where: 'featured', true | sort: 'date' | reverse %}
    {% for project in featured_projects %}
      <div data-project-post="true"
          data-project-id="{{ forloop.index }}"
          data-project-title="{{ project.title }}"
          data-project-url="{{ project.url }}"
          data-project-thumbnail="{{ project.thumbnail }}"
          data-project-code="{{ project.project_code }}">
      </div>
    {% endfor %}
  </div>
  
  <!-- We rebuilt the carousel container and items from scratch -->
  <!-- Only featured projects will be shown -->
  <div class="carousel-container">
    {% assign featured_projects = site.posts | where: 'featured', true | sort: 'date' | reverse %}
    
    <!-- LEFT POSITION: Second-most recent featured project -->
    {% if featured_projects.size > 1 %}
      {% assign left_project = featured_projects[1] %}
      <div class="carousel-item left new-carousel-item">
        <img src="{{ left_project.thumbnail }}" alt="{{ left_project.title }}" />
      </div>
    {% endif %}
    
    <!-- CENTER POSITION: Most recent featured project -->
    {% if featured_projects.size > 0 %}
      {% assign center_project = featured_projects[0] %}
      <div class="carousel-item center new-carousel-item">
        <div class="project-image-container">
          <a href="{{ center_project.url }}" class="project-link">
            <img src="{{ center_project.thumbnail }}" alt="{{ center_project.title }}" />
          </a>
          <div class="project-overlay">
            <h2>{{ center_project.title }}</h2>
            <p class="post-date">{{ center_project.date | date: "%b %d, %Y" }}</p>
          </div>
        </div>
      </div>
    {% endif %}
    
    <!-- RIGHT POSITION: Third-most recent featured project -->
    {% if featured_projects.size > 2 %}
      {% assign right_project = featured_projects[2] %}
      <div class="carousel-item right new-carousel-item">
        <img src="{{ right_project.thumbnail }}" alt="{{ right_project.title }}" />
      </div>
    {% endif %}
  </div>

<div class="vertical-text right-featured">
    <span>F</span>
    <span>E</span>
    <span>A</span>
    <span>T</span>
    <span>U</span>
    <span>R</span>
    <span>E</span>
    <span>D</span>
  </div>
  <div class="carousel-dots">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot active"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</div>

<div class="projects-button-container">
  <a href="/projects/" class="button">Projects</a>
</div>



<div class="about-section">
  <div class="about-image">
    <a href="/about/">
      <img src="assets/images/webpage/home-about.jpg" alt="Brady Lin" id="about-image" />
    </a>
  </div>
  <div class="about-text">
    <div class="about-text-content" id="about-text-content">
      <p>I'm a Computer Engineering student at Northwestern, always diving into projects that mix hardware, software, and creativity. I’ve worked on everything from building robotic systems to designing interactive MIDI controllers. I’m also excited about turning my tech ideas into real products, and when I’m not doing that, you’ll find me involved in a cappella and exploring music production.
</p>
    </div>
  </div>
  <div class="buttons-container">
    <div class="about-button-container" style="text-align: center; width: 100%;">
      <a href="/about/" class="button">About</a>
    </div>
  </div>
</div>


<div class="gallery-container">
  <a href="/gallery/">
    <div class="gallery-image-wrapper">
      <img src="assets/images/webpage/home-gallery.jpg" alt="Gallery" class="gallery-image" />
      <div class="gallery-overlay"></div>
      <div class="gallery-quote">
        <p>"Design is not just what it looks like and feels like.<br>Design is how it works."</p>
        <p class="quote-author">— Steve Jobs</p>
      </div>
    </div>
  </a>
</div>

<div class="contact-button-container" style="text-align: center; margin-top: 2rem;">
  <a href="/contact/" class="button">Contact</a>
</div>



<p class="footer-text">designed and coded by Brady Lin in his dormitory</p>