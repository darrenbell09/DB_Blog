source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8" # Required for Ruby 3.x

group :jekyll_plugins do
  gem "jekyll-feed",     "~> 0.17"
  gem "jekyll-seo-tag",  "~> 2.8"
  gem "jekyll-sitemap",  "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
end

# Windows / JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
