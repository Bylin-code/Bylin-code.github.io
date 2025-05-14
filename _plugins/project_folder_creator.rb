# Project Folder Creator
# Automatically creates asset folders for Jekyll posts with exact same names as the post files

module Jekyll
  class ProjectFolderCreator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      # Get the root directory of the site
      site_root = site.source
      asset_root = File.join(site_root, 'assets', 'project-assets')
      
      # Ensure the project-assets directory exists
      FileUtils.mkdir_p(asset_root) unless Dir.exist?(asset_root)
      
      # Process each post
      site.posts.docs.each do |post|
        # Skip if no path
        next unless post.path
        
        # Extract filename from the post path (without extension)
        filename = File.basename(post.path, '.*')
        
        # Create project folder with exact same name as the post file
        project_folder = File.join(asset_root, filename)
        
        # Create project folder if it doesn't exist
        unless Dir.exist?(project_folder)
          Jekyll.logger.info "ProjectFolderCreator:", "Creating project folder: #{filename}"
          FileUtils.mkdir_p(project_folder)
          
          # Create a blank thumbnail.jpg placeholder
          thumbnail_path = File.join(project_folder, 'thumbnail.jpg')
          unless File.exist?(thumbnail_path)
            # Copy a placeholder image or create an empty file
            placeholder_path = File.join(site_root, 'assets', 'global-assets', 'placeholder.jpg')
            if File.exist?(placeholder_path)
              FileUtils.cp(placeholder_path, thumbnail_path)
            else
              # Create empty file as fallback (should be replaced with real content)
              FileUtils.touch(thumbnail_path)
              Jekyll.logger.warn "ProjectFolderCreator:", "Created empty thumbnail for #{filename}. Please add content."
            end
          end
          
          # If thumbnail path is referenced in post, may need to update it
          if post.data['thumbnail'] && post.data['thumbnail'].include?(post.data['project_code'])
            # Update post's thumbnail path if needed
            Jekyll.logger.info "ProjectFolderCreator:", "Note: You may need to update thumbnail paths in posts."
          end
        end
      end
    end
  end
end
