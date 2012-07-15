require.config({ 
	paths: {
		async: "../Plugins/async"
	}
});

require(['../Utils/XHR/ajax', '../Utils/Markdown/showdown', 'template', 'videos', 'twitter', '../Utils/Mobile/iOS'], function (ajax, Showdown) {

	// XHR Example
	ajax({
	   url: 'humans.txt',
	   onSuccess: function (response) {
		   console.log('XHR response: ', response);
	   }
	});
	
	// Showdown Example
	ajax({
        url: 'Assets/Markdown/My Article Content.md',
        onSuccess: function (content) {
            var text = content;
        	var converter = new Showdown.converter();
        	var html = converter.makeHtml(text);
            console.log(html);
        }
	});

});