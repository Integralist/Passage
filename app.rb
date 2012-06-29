#!/usr/bin/env ruby

require 'sinatra'
require 'redcarpet'

use Rack::Deflater
set :static_cache_control, [:public, :max_age => 2678400]
set :server, %w[thin webrick]
enable :sessions
disable :show_exceptions

helpers do
    include Rack::Utils
    alias_method :xss, :escape # alias "xss" to "escape" method
end

before do
    request.path_info.sub! %r{/$}, ''
    cache_control :public, :must_revalidate, :max_age => 2678400 # (one month in seconds = ((60*60)*24)*31)
end

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
	redirect "/contact-error/name" if params[:user].empty?
    redirect "/contact-error/email" if params[:email].empty?
    redirect "/contact-error/message" if params[:message].empty?
    
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

get '/my-article' do
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :fenced_code_blocks => true)
    file = File.read('./public/Assets/Markdown/My Article Content.md')
    @converted = markdown.render(file)
    erb :article
end

not_found do
    erb :notfound
end

error do
    erb :error
end