#Passage

##Description

http://evening-warrior-9288.herokuapp.com/

Since learning Ruby (along with the Sinatra framework) I wanted to set-up a template project that I could refer to whenever starting up a new web based Ruby project.

The name "Passage" is an associated word related to "routing" (which in principle is what the Sinatra framework is most notorious for).

##Requirements

* Sinatra (`gem install sinatra`)
* Thin (`gem install thin`)
* Shotgun (`gem install shotgun` - for testing purposes: it reloads server on every request)

##TODO

I've got lots to do on this project but a few items I can think of at the moment is...

* Put together a basic site
* Enhance it with more dynamic content
* Look at setting up a database for loading content from
* Look at setting up a contact form (set-up Class for validation and also look at sending email via Ruby)
* Look at building XML site map automatically
* Write a blog post on all my findings

##Heroku Hosting

* Set-up account (heroku.com)
* Install toolbelt (toolbelt.heroku.com)
* Open your Command Line Interface (CLI: e.g. Terminal on Mac OS) and enter:
	* `heroku login` (follow instructions)
	* `heroku create --stack cedar` (you can also do: `heroku create yourappname --stack cedar`)
* Create config.ru file and add the content:

```ruby
require 'app' # where app is the name of your main file that initializes your web application
run Sinatra::Application
```

* Create a Gemfile file (no file extension) and add the content:

```
source 'http://rubygems.org'
gem 'sinatra', '1.3.2'
gem 'thin', '1.3.1'
```

* Open CLI and enter:
	* bundle install
	* Create a Procfile (no file extension) and add the content: `web: bundle exec ruby app.rb -p $PORT`  
	   e.g.  
	   `touch Procfile`,  
	   `echo web: bundle exec ruby app.rb -p $PORT > Procfile`
	* Commit your files using Git (sorry not going into how to use Git here!)
	* `git push heroku master`
	* `heroku open` will open your default browser to the relevant URL (e.g. http://evening-warrior-9288.herokuapp.com/)