"use strict";

var video = document.getElementById('webcam');

function start() {

    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	var facingMode = "environment";

	adjustVideoSize(video.width, video.height);

	var constraints = {
	  audio: false,
	  video: {
	    facingMode: facingMode
	  }
	}


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

function adjustVideoSize(width, height) {
    const aspectRatio = width / height;
    if (width >= height) {
      video.width = aspectRatio * video.height;
    } else if (width < height) {
      video.height = video.width / aspectRatio;
    }
}

start();