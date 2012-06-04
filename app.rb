#!/usr/bin/env ruby

require "sinatra"

=begin
	Load the /views/index.erb file which contains the HTML for this URL
	By default it will load the /views/layout.erb as the wrapper around index.erb
=end
get "/" do
    erb :home
end

get "/projects" do
    erb :projects
end