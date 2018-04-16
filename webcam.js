"use strict";

function start()
{

    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	var facingMode = "user";

	var constraints = {
	  audio: false,
	  video: {
	    facingMode: facingMode
	  }
	}

	var video = document.getElementById('webcam');

	navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
		video.srcObject = stream;
	});

	video.addEventListener('click', function() {
	  if (facingMode == "user") {
	    facingMode = "environment";
	  } else {
	    facingMode = "user";
	  }
	  
	  constraints = {
	    audio: false,
	    video: {
	      facingMode: facingMode
	    }
	  }  
	  
	  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
		  video.srcObject = stream;	
	  });
	});

}

start();