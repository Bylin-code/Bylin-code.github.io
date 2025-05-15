---
layout: default
title: Brady Lin | Mechanical Engineer & Computer Engineer | Embedded Systems Designer
permalink: /
description: Portfolio of Brady Lin, mechanical and computer engineer specializing in embedded systems, industrial design, and robotics. Projects showcase Brady Lin's engineering expertise.
keywords: ["Brady Lin", "BRADY LIN", "mechanical engineer", "computer engineer", "embedded systems", "industrial design", "robotics", "electronic product design", "CAD", "embedded programming"]
feature_image: "/assets/global-assets/home-welcome.jpg"
---

<div class="welcome-image-container">
  <a href="/">
    <div class="welcome-image-wrapper">
      <img src="assets/global-assets/home-welcome.jpg" alt="Welcome" class="gallery-image" />
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

<!-- FEATURED PROJECTS CAROUSEL - REBUILT FROM SCRATCH -->
<div class="project-carousel">
  <!-- Featured text on left side - properly vertical -->
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
  
  <!-- Featured text on right side - properly vertical -->
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
  
  <!-- Data attribute container for JavaScript -->
  <div id="featured-projects-data" style="display: none;">
    {% assign featured_projects = site.posts | where: 'featured', true | sort: 'date' | reverse %}
    {% for project in featured_projects %}
      <div class="project-data"
          data-project-id="{{ forloop.index }}"
          data-project-title="{{ project.title }}"
          data-project-url="{{ project.url }}"
          data-project-thumbnail="{{ project.thumbnail }}"
          data-project-code="{{ project.project_code }}"
          data-project-date="{{ project.date }}">
      </div>
    {% endfor %}
  </div>
  
  <!-- Carousel container -->
  <div class="carousel-container" id="featured-carousel">
    {% assign featured_projects = site.posts | where: 'featured', true | sort: 'date' | reverse %}
    {% assign total_featured = featured_projects.size %}
    
    <!-- Show appropriate placeholder message if no featured projects -->
    {% if total_featured == 0 %}
      <div class="no-featured-message" style="text-align: center; padding: 2rem;">
        <p>No featured projects to display. Set featured: true in project front matter.</p>
      </div>
    {% else %}
      <!-- LEFT ITEM: Only show if we have at least 2 featured projects -->
      {% if total_featured > 1 %}
        {% assign left_project = featured_projects[1] %}
        <div class="carousel-item left" id="left-carousel-item">
          <div class="project-image-container">
            <img src="{{ left_project.thumbnail }}" alt="{{ left_project.title }}" />
            <div class="project-code-overlay">
              {% assign left_code_chars = left_project.project_code | split: '' %}
              <div class="vertical-project-code" style="display:block;">{% for char in left_code_chars %}<div style="display:block; color:white; font-size:clamp(2rem, calc(var(--carousel-image-width) / 7), 5rem); font-weight:700; margin:0 0 0.1em 0; line-height:0.9; text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
            </div>
          </div>
        </div>
      {% endif %}
      
      <!-- CENTER ITEM: Always show if we have at least 1 featured project -->
      {% assign center_project = featured_projects[0] %}
      <div class="carousel-item center" id="center-carousel-item">
        <div class="project-image-container">
          <a href="{{ center_project.url }}" class="project-link">
            <img src="{{ center_project.thumbnail }}" alt="{{ center_project.title }}" />
          </a>
          <div class="project-overlay">
            <h2>{{ center_project.title }}</h2>
          </div>
          <div class="project-code-overlay">
            {% assign center_code_chars = center_project.project_code | split: '' %}
            <div class="vertical-project-code" style="display:block;">{% for char in center_code_chars %}<div style="display:block; color:white; font-size:clamp(2.5rem, calc(var(--carousel-image-width) / 6), 6rem); font-weight:700; margin:0 0 0.1em 0; line-height:0.9; text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
          </div>
        </div>
      </div>
      
      <!-- RIGHT ITEM: Only show if we have at least 3 featured projects -->
      {% if total_featured > 2 %}
        {% assign right_project = featured_projects[2] %}
        <div class="carousel-item right" id="right-carousel-item">
          <div class="project-image-container">
            <img src="{{ right_project.thumbnail }}" alt="{{ right_project.title }}" />
            <div class="project-code-overlay">
              {% assign right_code_chars = right_project.project_code | split: '' %}
              <div class="vertical-project-code" style="display:block;">{% for char in right_code_chars %}<div style="display:block; color:white; font-size:clamp(2rem, calc(var(--carousel-image-width) / 7), 5rem); font-weight:700; margin:0 0 0.1em 0; line-height:0.9; text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
            </div>
          </div>
        </div>
      {% endif %}
      
      <!-- Navigation arrows have been removed as requested -->
    {% endif %}
  </div>
  
  <!-- Featured text on right side - properly vertical -->
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
</div>

<div style="margin-top: 70px;"></div><!-- Space between carousel and dots -->

<!-- Carousel navigation dots - one for each featured project -->
<div class="carousel-dots">
  {% assign featured_projects = site.posts | where: 'featured', true | sort: 'date' | reverse %}
  {% for project in featured_projects %}
    <div class="dot {% if forloop.index0 == 0 %}active{% endif %}" data-index="{{ forloop.index0 }}"></div>
  {% endfor %}
</div>

<div class="projects-button-container" style="margin-top: 30px;">
  <a href="/projects/" class="button">Projects</a>
</div>

<div class="about-section">
  <div class="about-image">
    <a href="/about/">
      <img src="assets/global-assets/home-about.jpg" alt="Brady Lin" id="about-image" />
    </a>
  </div>
  <div class="about-text">
    <div class="about-text-content" id="about-text-content" onclick="changeAboutText()" style="cursor: pointer;">
      <!-- Initial text that will be replaced by JavaScript -->
      <p style="transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-origin: center center;"></p>
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
      <video src="assets/global-assets/home-gallery.mp4" class="gallery-image" autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;display:block;">
        <img src="assets/global-assets/home-gallery.jpg" alt="Gallery" style="width:100%;height:100%;object-fit:cover;display:block;" />
      </video>
      <div class="gallery-overlay"></div>
      <div class="gallery-quote quote-container">
        <!-- Quote will be populated by quotes.js -->
      </div>
    </div>
  </a>
</div>

<div class="contact-button-container" style="text-align: center; margin-top: 2rem;">
  <a href="/contact/" class="button">Contact</a>
</div>



<p class="footer-text">website designed and coded by Brady in his dormitory</p>

<!-- SEO Enhancement Section -->
<div class="seo-enhancement" style="opacity:0.05;font-size:10px;margin-top:3rem;color:#999;">
  <h2>Brady Lin - Mechanical & Computer Engineering Portfolio</h2>
  <p>Brady Lin is a mechanical engineer and computer engineer specializing in embedded systems design, industrial design, and robotics. This portfolio showcases Brady Lin's projects including robotic systems, electronic product designs, and mechanical engineering solutions. Brady Lin combines technical expertise in CAD, embedded programming, and hardware design with creative problem-solving. For engineering consultation, project collaboration, or to learn more about Brady Lin's work in mechanical engineering, computer engineering, or embedded systems design, please visit the contact page.</p>
</div>