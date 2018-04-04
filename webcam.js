"use strict";

var video = document.getElementById('video');

function start()
{
	var constraints = { audio: false, video: true }; 
	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(mediaStream) {
	  video.srcObject = mediaStream;
	  video.onloadedmetadata = function(e) {
	    video.play();
	  };
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}

start();