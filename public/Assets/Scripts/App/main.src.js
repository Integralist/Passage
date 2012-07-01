require.config({ 
	paths: {
		async: "../Plugins/async"
	}
});

require(["../Utils/XHR/ajax", "template", "videos", "twitter", "../Utils/Mobile/iOS"], function (ajax) {

	// XHR Example
	ajax({
	   url: "humans.txt",
	   onSuccess: function (response) {
		   console.log('XHR response: ', response);
	   }
	});

});