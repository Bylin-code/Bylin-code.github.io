#!/bin/bash

# Create thumbnails directory if it doesn't exist
mkdir -p assets/images/thumbnails

# Dark background color aligned with minimalist industrial design
bg_color="1a1a1a"

# Accent color from the site's theme (highlight color #ff4d5a from memory)
fg_color="ff4d5a"

# Download thumbnail for project 1
echo "Downloading thumbnail for Smart Home Control System (SMART)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=SMART&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project1-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project1-thumbnail.jpg"

# Download thumbnail for project 2
echo "Downloading thumbnail for Portable Audio Interface (AUDIO)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=AUDIO&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project2-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project2-thumbnail.jpg"

# Download thumbnail for project 3
echo "Downloading thumbnail for Ergonomic Desktop Workstation (ERGO)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=ERGO&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project3-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project3-thumbnail.jpg"

# Download thumbnail for project 4
echo "Downloading thumbnail for Modular Lighting System (LIGHT)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=LIGHT&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project4-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project4-thumbnail.jpg"

# Download thumbnail for project 5
echo "Downloading thumbnail for Sustainable Water Filtration (WATER)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=WATER&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project5-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project5-thumbnail.jpg"

# Download thumbnail for project 6
echo "Downloading thumbnail for Wearable Health Monitor (VITAL)"
curl -s "https://placehold.co/420x594/$bg_color/$fg_color?text=VITAL&font=montserrat+alternates" \
     -o "assets/images/thumbnails/project6-thumbnail.jpg"
echo "Created thumbnail: assets/images/thumbnails/project6-thumbnail.jpg"

echo "All thumbnails downloaded successfully."