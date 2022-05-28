module Jekyll
    class TagPageGenerator < Generator
      safe true
  
      def generate(site)
        tags = site.documents.flat_map { |recipe| recipe.tags|| [] }.to_set
        tags.each do |tag|
          site.pages << TagPage.new(site, site.source, tag)
        end
      end
    end
  
    class TagPage < Jekyll::Page
      def initialize(site, base, tag)
        @site = site

        # Path to the source directory.
        @base = site.source
  
        # Directory the page will reside in.
        @dir = 'tags'
  
        # All pages have the same filename.
        @basename = tag
        @ext = '.html'
        @name = tag + '.html'
  
        self.read_yaml(File.join(base, '_layouts'), 'tags.html')
        # Define any custom data you want.
        @data = {
          'layout' => 'page',
          # Get data from wherever you need.
          'tag' =>  tag,
          'title' => tag.capitalize()
          
        }
        end
    end
  end