require 'fileutils'

# This class handles image resizing during the Jekyll build process
module Jekyll
  class ImageResizer
    # Configuration constants
    # Project carousel thumbnails
    TARGET_WIDTH = 420  # Carousel image width from CSS
    TARGET_HEIGHT = 594 # Carousel image height from CSS
    # About page and section images
    ABOUT_WIDTH = 420   # About section image width from CSS
    ABOUT_HEIGHT = 594  # About section image height from CSS
    # Welcome image (optimized for responsive display)
    WELCOME_WIDTH = 1920 # Welcome image width (high resolution)
    WELCOME_HEIGHT = 1080 # Welcome image height (16:9 aspect ratio)
    QUALITY = 85        # Output image quality (0-100)
    
    # Initialize with the Jekyll site
    def initialize(site)
      @site = site
      @project_assets_dir = File.join(site.source, 'assets', 'project-assets')
      @global_assets_dir = File.join(site.source, 'assets', 'global-assets')
      @has_imagemagick = system('which convert > /dev/null 2>&1') || system('where convert > /dev/null 2>&1')
    end
    
    # Process all target images
    def process_images
      if @has_imagemagick
        # Check for ImageMagick and mini_magick
        begin
          require 'mini_magick'
        rescue LoadError
          log_error("mini_magick gem not found, skipping image resizing")
          return
        end
        
        log_info("Starting image processing with ImageMagick")
        
        # Process project thumbnails
        process_project_thumbnails if Dir.exist?(@project_assets_dir)
        
        # Process global assets (about and welcome images)
        process_global_assets if Dir.exist?(@global_assets_dir)
        
        log_info("Completed all image processing")
      else
        log_warning("ImageMagick not found, skipping image resizing. Install ImageMagick for auto image resizing.")
        log_warning("Hint: brew install imagemagick (on Mac) or visit https://imagemagick.org/script/download.php")
      end
    end
    
    private
    
    # Process project thumbnail images
    def process_project_thumbnails
      log_info("Processing project thumbnails...")
      
      # Find all project subfolders
      Dir.glob(File.join(@project_assets_dir, '*')).select { |f| File.directory?(f) }.each do |project_dir|
        # Look for thumbnail.jpg in each project folder
        thumbnail_path = File.join(project_dir, 'thumbnail.jpg')
        
        # Skip if thumbnail doesn't exist in this project folder
        next unless File.exist?(thumbnail_path)
        
        begin
          # Get project folder name for logging
          project_name = File.basename(project_dir)
          process_image(thumbnail_path, TARGET_WIDTH, TARGET_HEIGHT, "project thumbnail: #{project_name}")
        rescue => e
          log_error("Error processing thumbnail for #{project_name}: #{e.message}")
        end
      end
    end
    
    # Process global assets (about and welcome images)
    def process_global_assets
      log_info("Processing global assets...")
      
      # Define target images with their dimensions
      target_images = {
        'about-main.jpg' => [ABOUT_WIDTH, ABOUT_HEIGHT],
        'home-welcome.jpg' => [WELCOME_WIDTH, WELCOME_HEIGHT],
        'home-about.jpg' => [ABOUT_WIDTH, ABOUT_HEIGHT]
      }
      
      # Process each target image
      target_images.each do |filename, dimensions|
        image_path = File.join(@global_assets_dir, filename)
        if File.exist?(image_path)
          begin
            process_image(image_path, dimensions[0], dimensions[1], "global asset: #{filename}")
          rescue => e
            log_error("Error processing #{filename}: #{e.message}")
          end
        else
          log_warning("Global asset not found: #{filename}")
        end
      end
    end
    
    # Process a single image with target dimensions
    def process_image(image_path, width, height, description)
      # Open image with MiniMagick
      image = MiniMagick::Image.open(image_path)
      
      # Skip if image is already the right size
      if image.width == width && image.height == height
        log_info("#{description} already at target size (#{width}x#{height}), skipping")
        return
      end
      
      log_info("Processing #{description} - current: #{image.width}x#{image.height}, target: #{width}x#{height}")
      
      # Resize image to fill the target dimensions while maintaining aspect ratio
      # and centering the crop to create a professional effect
      image.combine_options do |img|
        img.resize "#{width}x#{height}^"    # ^ ensures image fills dimensions
        img.gravity "center"                # Center the crop
        img.extent "#{width}x#{height}"     # Crop to exact dimensions
        img.quality QUALITY.to_s           # Set quality for file size optimization
      end
      
      # Save the resized image back to the original location
      image.write(image_path)
      log_info("Resized #{description} to #{width}x#{height}")
    end
    
    # Logging helper methods
    def log_info(message)
      Jekyll.logger.info "ImageResizer:", message
    end
    
    def log_warning(message)
      Jekyll.logger.warn "ImageResizer:", message
    end
    
    def log_error(message)
      Jekyll.logger.error "ImageResizer:", message
    end
  end
end

# Hook into Jekyll build process
Jekyll::Hooks.register :site, :after_init do |site|
  # Create and run the image resizer
  resizer = Jekyll::ImageResizer.new(site)
  resizer.process_images
end
