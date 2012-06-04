#!/usr/bin/env ruby

require "sinatra"

=begin
	Load the /views/index.erb file which contains the HTML for this URL
	By default it will load the /views/layout.erb as the wrapper around index.erb
=end

before do
    @title_home = "Welcome"
    @title_projects = "Projects"
end

get "/" do
    erb :home
end

get "/projects" do
    erb :projects
end

get "/internet-explorer" do
    erb :ie, :layout => :layout_ie
end

get '/test-error/:a/:b' do |a, b|
    "#{a.to_i / b.to_i}" # http://127.0.0.1:9393/test-error/10/0 should cause a ZeroDivisionError
end

not_found do
    erb :notfound
end

error do
    "Sorry there was a nasty error <b style=\"color:red;\">#{env["sinatra.error"]}</b>"
end