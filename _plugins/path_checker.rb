# Path Checker
# Checks thumbnail paths in posts and warns if they don't match the new folder structure

module Jekyll
  class PathChecker < Jekyll::Generator
    safe true
    priority :low # Run after folder creation

    def generate(site)
      # Process each post
      site.posts.docs.each do |post|
        next unless post.data['thumbnail'] && post.path
        
        # Get the filename (with date prefix)
        filename = File.basename(post.path, '.*')
        
        # Check if thumbnail path includes the full filename (with date)
        expected_path_fragment = "/assets/project-assets/#{filename}/"
        actual_path = post.data['thumbnail']
        
        # If thumbnail path doesn't match expected structure, warn about it
        unless actual_path.include?(expected_path_fragment)
          # If it uses project_code instead of full filename
          if post.data['project_code'] && actual_path.include?("/assets/project-assets/#{post.data['project_code']}/")
            Jekyll.logger.warn "PathChecker:", "Thumbnail path for '#{filename}' uses project_code instead of full filename."
            Jekyll.logger.warn "PathChecker:", "  Current: #{actual_path}"
            Jekyll.logger.warn "PathChecker:", "  Expected: #{expected_path_fragment}thumbnail.jpg"
          end
        end
      end
    end
  end
end
