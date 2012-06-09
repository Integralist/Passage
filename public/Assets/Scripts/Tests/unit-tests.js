require(['./test-ajax', 
		 './test-array',  
		 './test-css', 
		 './test-dictionary',  
		 './test-dom', 
		 './test-get', 
		 './test-host', 
		 './test-json',  
		 './test-polyfills',  
		 './test-string'], function(){

	jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
	jasmine.getEnv().execute();

});