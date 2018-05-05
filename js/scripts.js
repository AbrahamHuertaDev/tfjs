
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

    $("#retrainButton").click(function(){
        // Si esta prediciendo lo paramos
        if(predicting){
            predicting = false;
            $("#predictButton").text("Predict");
            $("#predictButton").removeClass("btn-danger");
            $("#predictButton").addClass("btn-primary");
            stopPrediction();
        }
        
        $(".predict_card_body").hide();
        $(".retrain_card_body").show();
        if ($(window).width() >= 768 ){
            $(".card").animate({height:'40.5rem'},200);
        }else{
            $(".card").animate({height:'33.5rem'},200);
        }

    });

    $(".add_class_button").click(function(){
        $(".new_classes").append('<div class="new_class_container">\
                                    <input type="text" class="new_class_input" placeholder="Your class">\
                                    <p class="waves-effect waves-light take_data_class_btn">Take data</p>\
                                </div>');
    });

});