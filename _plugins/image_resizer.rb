require 'fileutils'

# This class handles image resizing during the Jekyll build process
module Jekyll
  class ImageResizer
    # Configuration constants
    TARGET_WIDTH = 420  # Carousel image width from CSS
    TARGET_HEIGHT = 594 # Carousel image height from CSS
    QUALITY = 85        # Output image quality (0-100)
    
    # Initialize with the Jekyll site
    def initialize(site)
      @site = site
      @project_assets_dir = File.join(site.source, 'assets', 'project-assets')
      @has_imagemagick = system('which convert > /dev/null 2>&1') || system('where convert > /dev/null 2>&1')
    end
    
    # Process thumbnail images in each project directory
    def process_images
      # Skip if project assets directory doesn't exist
      return unless Dir.exist?(@project_assets_dir)
      
      if @has_imagemagick
        process_with_imagemagick
      else
        log_warning("ImageMagick not found, skipping image resizing. Install ImageMagick for auto thumbnail resizing.")
        log_warning("Hint: brew install imagemagick (on Mac) or visit https://imagemagick.org/script/download.php")
      end
    end
    
    private
    
    # Process images using ImageMagick via mini_magick gem
    def process_with_imagemagick
      begin
        require 'mini_magick'
      rescue LoadError
        log_error("mini_magick gem not found, skipping image resizing")
        return
      end
      
      log_info("Starting thumbnail processing with ImageMagick")
      
      # Find all project subfolders
      Dir.glob(File.join(@project_assets_dir, '*')).select { |f| File.directory?(f) }.each do |project_dir|
        # Look for thumbnail.jpg in each project folder
        thumbnail_path = File.join(project_dir, 'thumbnail.jpg')
        
        # Skip if thumbnail doesn't exist in this project folder
        next unless File.exist?(thumbnail_path)
        
        begin
          # Get project folder name for logging
          project_name = File.basename(project_dir)
          log_info("Processing thumbnail for project: #{project_name}")
          
          # Open image with MiniMagick
          image = MiniMagick::Image.open(thumbnail_path)
          
          # Skip if image is already the right size
          if image.width == TARGET_WIDTH && image.height == TARGET_HEIGHT
            log_info("Thumbnail for #{project_name} already at target size, skipping")
            next
          end
          
          # Resize image to fill the target dimensions while maintaining aspect ratio
          # and centering the crop to create a professional thumbnail effect
          image.combine_options do |img|
            img.resize "#{TARGET_WIDTH}x#{TARGET_HEIGHT}^"  # ^ ensures image fills dimensions
            img.gravity "center"                           # Center the crop
            img.extent "#{TARGET_WIDTH}x#{TARGET_HEIGHT}"  # Crop to exact dimensions
            img.quality QUALITY.to_s                        # Set quality for file size optimization
          end
          
          # Save the resized image back to the original location
          image.write(thumbnail_path)
          log_info("Resized thumbnail for #{project_name} to #{TARGET_WIDTH}x#{TARGET_HEIGHT}")
        rescue => e
          log_error("Error processing thumbnail for #{project_name}: #{e.message}")
        end
      end
      
      log_info("Completed thumbnail processing")
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
