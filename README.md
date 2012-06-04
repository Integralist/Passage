#Passage

##Description

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
* Look into error handling and 404 error pages
    * Waiting feedback on issue with Sinatra error handling not working
    * Waiting feedback on issue with Sinatra where loading an unknown URL (but with a forward-slash ending!) causes the styles not to load
    (e.g. `/unknown` is fine, but `/unknown/` doesn't load styles?)
    *Note: This can be fixed by using an absolute path, but I want to know if this is the right way to solve the problem*
* Look at building XML site map automatically
* Write a blog post on all my findings