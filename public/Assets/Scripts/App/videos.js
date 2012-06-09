define(["../Utils/Templating/hogan", "../Utils/XHR/ajax", "../Utils/Flash/swfobject", "async!http://gdata.youtube.com/feeds/api/videos?author=OfficialBasRutten&alt=json"], function (hogan, ajax, swf, videos) {

	/*	
	http://www.youtube.com/watch?v=-a3u7b4Pn7Q&feature=g-logo&context=G24226c5FOAAAAAAAAAA
	http://www.youtube.com/watch?v=n7PDwmDlS7I&feature=context&context=G24226c5FOAAAAAAAAAA
	http://www.youtube.com/watch?v=3zALVxhHTp8&feature=related
	
	Regex to match id: 
	v=([^&]+)
	
	End URL for pulling in Flash video...
	http://www.youtube.com/v/-a3u7b4Pn7Q?enablejsapi=1&playerapiid=ytplayer&version=3
	*/
	
	// Reference:
	// http://perfectionkills.com/unnecessarily-comprehensive-look-into-a-rather-insignificant-issue-of-global-objects-creation/
	var global = (function(){return this;}()),
		doc = document,
		body = doc.body,
		params, 
		atts, 
		id = videos.feed.entry[0].id.$t.split("videos/")[1],
		flash = doc.createElement("div");
	
	function handler(){
		ajax({
			url: "Assets/Templates/Video.tpl?cachebuster=" + (+new Date()),
			data: "html",
			onSuccess: function (data) {
				var template = hogan.compile(data),
					content = template.render({ 
						title: "Flash content inserted via JavaScript (using a template - Hogan.js - to render content)" 
					});
					
				var frag = doc.createDocumentFragment(),
					div = doc.createElement("div");
				
				div.innerHTML = content;
				frag.appendChild(div);
				body.appendChild(frag);
			}
		});
	}
	
	flash.id = "insertflash";
	atts = { id: "currentvideo" };
	
	body.appendChild(flash);
	
	// YouTube JavaScript API
	// https://developers.google.com/youtube/js_api_reference
	swf.embedSWF("http://www.youtube.com/v/" + id + "?enablejsapi=1&playerapiid=ytplayer&version=3", "insertflash", "270", "150", "8", null, null, null, atts, handler);
	
	
	// YouTube iframe API 
	// https://developers.google.com/youtube/iframe_api_reference
	// https://google-developers.appspot.com/youtube/iframe_api_reference
	// https://google-developers.appspot.com/youtube/player_parameters?playerVersion=HTML5
	
	// 1.) Insert a DIV into the page
	var ytPlayer = doc.createElement("div");
		ytPlayer.id = "player";
		body.appendChild(ytPlayer);
	
	// 2.) This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement("script");
		tag.src = "http://www.youtube.com/player_api";
	
	var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	// 3.) This function creates an <iframe> (and YouTube player) after the API code downloads.
	var player;
	
	window.onYouTubePlayerAPIReady = function(){ // This must be a global property. 
		player = new YT.Player("player", { // id of div element
			height: "390",
			width: "640",
			videoId: "u1zgFlCw8Aw",
			events: {
				"onReady": onPlayerReady,
				"onStateChange": onPlayerStateChange
			}
		});
	};
	
	// 4.) The API will call this function when the video player is ready.
	function onPlayerReady (event) {
		event.target.playVideo();
	}
	
	// 5. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	var done = false;
	
	function onPlayerStateChange (event) {	
		if (event.data == YT.PlayerState.PLAYING && !done) {
			setTimeout(stopVideo, 6000);
			done = true;
		}
	}
	
	function stopVideo(){
		player.stopVideo();
	}

});