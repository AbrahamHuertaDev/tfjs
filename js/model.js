
const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const IMAGE_SIZE = 224;

let mobilenet;
const mobilenetDemo = async () => {
  $("#modalLoad_body").html("Loading model...");

  mobilenet = await tf.loadModel(MOBILENET_MODEL_PATH);

  // Warmup the model. This isn't necessary, but makes the first prediction
  // faster. Call `dispose` to release the WebGL memory allocated for the return
  // value of `predict`.
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

  $("#modalLoad_body").html("Done! <i class='fa fa-smile-o' aria-hidden='true'></i>");
    setTimeout(function() {
        $('#loadModel_modal').modal('hide');
    }, 1250);

};


const demoStatusElement = document.getElementById('status');
const status = msg => demoStatusElement.innerText = msg;

$('#loadModel_modal').modal('show');
mobilenetDemo();

var isPredicting = false;

function stopPrediction() {
  isPredicting = false;
}

var time_between_predictions = 2000; //Milisegundos
async function predict() {
    isPredicting = true;
    var last_prediction = "";
    var last_update = 99999999;
    while (isPredicting) {
      tf.tidy(() => {
        var t0 = performance.now();
        var video = document.getElementById('webcam');
        var preImg = preprocess(video)
        let pred = mobilenet.predict(preImg);
        let cls = pred.argMax().buffer().values[0];
        if(last_update>time_between_predictions && last_prediction!=IMAGENET_CLASSES[cls]){
          status(IMAGENET_CLASSES[cls]);
          last_update = 0;
          last_prediction = IMAGENET_CLASSES[cls];
        }
        var t1 = performance.now();
        last_update = last_update + (t1-t0);
      });
      await tf.nextFrame();
    }
  }

function preprocess(video) {
    const webcamImage = tf.fromPixels(video);
    const croppedImage = cropImage(webcamImage);
    const batchedImage = croppedImage.expandDims(0);
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  }
  
  function cropImage(img) {
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (IMAGE_SIZE / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (IMAGE_SIZE / 2);
    return img.slice([beginHeight, beginWidth, 0], [IMAGE_SIZE, IMAGE_SIZE, 3]);
  }
