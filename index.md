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
              <div class="vertical-project-code" style="display:block;">{% for char in left_code_chars %}<div style="display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
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
            <div class="vertical-project-code" style="display:block;">{% for char in center_code_chars %}<div style="display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
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
              <div class="vertical-project-code" style="display:block;">{% for char in right_code_chars %}<div style="display:block;margin:0 0 0.1em 0;color:white;font-size:3rem;font-weight:700;text-shadow:2px 2px 8px rgba(0,0,0,0.7);">{{ char }}</div>{% endfor %}</div>
            </div>
          </div>
        </div>
      {% endif %}
      
      <!-- Only show navigation arrows if we have multiple featured projects -->
      {% if total_featured > 1 %}
        <div class="carousel-nav prev" id="carousel-prev">‹</div>
        <div class="carousel-nav next" id="carousel-next">›</div>
      {% endif %}
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