require.config({ 
	paths: {
		async: "../Plugins/async",
		jquery: "../Utils/Libraries/jquery"
	}
});

require(["../Utils/XHR/ajax", "template", "videos", "twitter"], function (ajax) {

	// XHR Example
	ajax({
	   url: "humans.txt",
	   onSuccess: function (response) {
		   console.log('XHR response: ', response);
	   }
	});

});