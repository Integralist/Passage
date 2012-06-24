#!/usr/bin/env ruby

=begin
	You'll see that when loading a local file (email.rb) we need to fix problems with the path.
	The answer from Stack Overflow (http://stackoverflow.com/questions/10945114/ruby-require-call-fails-on-custom-code) was as follows...
	
	The current directory (relative to the main ruby file) is not part of the load paths (the set of paths that require looks in). 
	So you either need to add it to the load path (best done by invoking ruby as ruby -I. test1.rb), 
	by using require "./test2.rb" or 
	by using require_relative "test2.rb", which requires files relative to the directory of the file.
=end
require 'sinatra'
require './email'
use Rack::Deflater # GZIP all content (HTML, CSS, JavaScript)

# We set the cache control for static resources to approximately 1 month
set :static_cache_control, [:public, :max_age => 2678400]

# We specify which server we want to use (Thin is tried first and then failing that WEBrick)
set :server, %w[thin webrick]

=begin
	Below we're enabling sessions so we can pass data around.
	We're also disabling exceptions (this is so when running Sinatra - not shotgun - we can see how our error handler works)
	
	For full configuration details available see:
	http://www.sinatrarb.com/configuration.html
	
	If you need to set additional parameters for sessions, like expiration date, 
	use Rack::Session::Cookie directly instead of enable :sessions (example from Rack documentation):
	
	use Rack::Session::Cookie,  :key => 'rack.session',
                                :domain => 'foo.com',
                                :path => '/',
                                :expire_after => 2592000, # In seconds
                                :secret => 'change_me'
=end
enable :sessions
disable :show_exceptions

helpers do
    include Rack::Utils
    alias_method :xss, :escape # we alias "xss" as a function so it actually uses escape()
end

=begin
	All routes are set-up as follows: http://domain.tld/route
	Notice there is no forward-slash at the end.
	If a user adds a forward-slash to the end that that is considered a different route.
	
	e.g. /projects and /projects/ are considered two different routes
	
	To fix this we can either do:
	/projects/?
	
	Or we can apply the following fix to ALL routes:
	request.path_info.sub! %r{/$}, ''
	
	You'll notice that for us to use this Regular Expression fix (which basically checks for a forward-slash at the end and then removes it)
	we need to place it inside the 'before' filter which is executed by Sinatra before every request
=end
before do
    request.path_info.sub! %r{/$}, ''
    cache_control :public, :must_revalidate, :max_age => 2678400 # this is seconds, so this works out as 1 month... ((60*60)*24)*31 = 2678400
end

after do
    #puts response.status
    #puts response.header
    #puts response.chunked
    #puts response.writer
    #puts response.block
    #puts response.length
    #puts response.body
end

=begin
    You can use the before and after filters to check for specific routes to set data by:
    
	before "/" do
        @title = "Welcome"
    end
    
    before "/projects" do
        @title = "Projects"
    end
=end

=begin
	We've created our own default layout (see: /views/layout.erb)
	When we load specific URL's we specify a 'template' to use and then the layout wraps that template.
	e.g. We have the :home template which is wrapped by the our layout.erb layout
=end

get '/' do
    session[:time] = Time.now    
    erb :home
end

get '/projects' do
    erb :projects
end

get '/contact' do
	erb :contact
end

post '/contact' do
	# We redirect the user if the field names are incorrect
    redirect "/contact-error/name" if params[:user].empty?
    redirect "/contact-error/email" if params[:email].empty?
    redirect "/contact-error/message" if params[:message].empty?
    
    # to, from, subject, body
    #email = Email.new('youremail@gmail.com', params[:email], 'test subject', params[:message]);
    #email.send_email

    # Notice when receiving post data from a form field we need to use the "Named Parameter" rather than "Block Parameters"
    erb :contact_success
end

get '/contact-error/:field' do |field|
	@field = field
	erb :contact_error
end

get '/internet-explorer' do
    erb :ie, :layout => :layout_ie
end

['/foo', '/bar', '/baz'].each do |path|
    get path do
        "You've reached me at #{request.path_info}"
    end
end

get '/test-error/:a/:b' do |a, b|
    "#{a.to_i / b.to_i}" # http://127.0.0.1:9393/test-error/10/0 should cause a ZeroDivisionError
end

not_found do
    erb :notfound
end

error do
    erb :error
end