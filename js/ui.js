var predictButton = document.getElementById('predictButton');

predictButton.addEventListener('click', function() {	
	if(predictButton.innerText == "Start") {
		predictButton.innerText = "Stop";
		predict();
	} else {
		predictButton.innerText = "Start";
		stopPrediction();
	}
});
