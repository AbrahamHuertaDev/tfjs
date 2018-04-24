
predicting = false;
$( document ).ready(function() {

    $("#predictButton").click(function(){
        if(predicting){
            predicting = false;
            $("#predictButton").text("Predict");
            $("#predictButton").removeClass("btn-danger");
            $("#predictButton").addClass("btn-primary");
            stopPrediction();
        }else{
            predicting = true;
            predict();
            $("#predictButton").text("Stop");
            $("#predictButton").removeClass("btn-primary");
            $("#predictButton").addClass("btn-danger");
        }
    });

});