#Passage

Live example: [http://furious-wind-9309.herokuapp.com/](http://furious-wind-9309.herokuapp.com/)  
Hosting: [Heroku](http://www.heroku.com/)

##Description

Since learning Ruby (along with the Sinatra framework) I wanted to set-up a template project that I could refer to whenever starting up a new web based Ruby project.

The name "Passage" is an associated word related to "routing" (which in principle is what the Sinatra framework is most notorious for).

For an introduction to Ruby then [read my blog post here](https://github.com/Integralist/Blog-Posts/blob/master/Introduction-to-Ruby.md)

For more information on building a site using Ruby and Sinatra then [read my blog post here](https://github.com/Integralist/Blog-Posts/blob/master/Build%20a%20site%20with%20Ruby%20and%20Sinatra.md)

##Features

* Object-Oriented CSS (with additional assistance from the [Sass](http://sass-lang.com/) CSS pre-processor)
* Modular JavaScript (via AMD and [RequireJs](http://requirejs.org/))
* Built to be modular (via use of ERB templates)
* Can load content from Markdown files
* Performance conscientious
* Mobile First approach
* Useful utilities pre-packaged (well, only one `Rack::Utils`'s `escape` method but you have facility to add more)

##Requirements

* Bundler (`gem install bundler`)
* Sinatra (`gem install sinatra`)
* Thin (`gem install thin`)
* Red Carpet (`gem install redcarpet`)
* Shotgun (`gem install shotgun` - for testing purposes: it reloads server on every request)

##TODO

* Look to make loading of Markdown files more 'dynamic'
* Look at automatically building an XML site map

##Heroku Hosting

* Set-up account ([heroku.com](http://www.heroku.com/))
* Install toolbelt ([toolbelt.heroku.com](http://toolbelt.heroku.com/))
* Open your Command Line Interface (e.g. Terminal on Mac OS) and enter:
	* `heroku login` (follow instructions)
	* If you need add additional SSH keys then use: `heroku keys:add`
	* `heroku create --stack cedar` (you can also do: `heroku create yourappname --stack cedar`)
* Create a `config.ru` file and add the following content:

```ruby
require 'app' # app being the name of your main file that initializes your web application
run Sinatra::Application
```

* Create a Gemfile file (no file extension) and add the content:

```
source 'http://rubygems.org'
gem 'sinatra', '1.3.2'
gem 'thin', '1.3.1'
gem 'redcarpet', '2.1.1'
```

Open Command Line Interface and enter: 

	* `bundle install`
	* Create a `Procfile` (no file extension) and add the content:  
	`web: bundle exec ruby app.rb -p $PORT`  
	   
	   e.g.  
	   `touch Procfile`  
	   `echo web: bundle exec ruby app.rb -p $PORT > Procfile`  
 
    * Commit your files using Git ([for help with Git read this](https://github.com/Integralist/Blog-Posts/blob/master/How-to-use-Git-and-GitHub.md))
    * If not already, create a `remote`: `git remote add heroku git@heroku.com:xxxxx.git`
    * `git push heroku master`
    * `heroku open` will open your default browser to the relevant URL