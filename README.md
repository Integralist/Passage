#Passage

##Description

http://evening-warrior-9288.herokuapp.com/

Since learning Ruby (along with the Sinatra framework) I wanted to set-up a template project that I could refer to whenever starting up a new web based Ruby project.

The name "Passage" is an associated word related to "routing" (which in principle is what the Sinatra framework is most notorious for).

##TODO

I've got lots to do on this project but a few items I can think of at the moment is...

* Put together a basic site
* Enhance it with more dynamic content
    * Need to look into how I load specific content into a layout (depending on the page being loaded)
* Look into possibility of dynamically loading sub content into a .erb file
* Look at setting up a database for loading content from
* Look at setting up a contact form
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

* Create a Gemfile file (no file extension - you'll see it changes to Gemfile.lock) and add the content:

```
source 'http://rubygems.org'
gem 'sinatra'
```

* Open CLI and enter:
	* `git push heroku master`
	* `heroku open` will open your default browser to the relevant URL (e.g. http://evening-warrior-9288.herokuapp.com/)