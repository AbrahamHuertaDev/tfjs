const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const IMAGE_SIZE = 224;

let mobilenet;
const mobilenetDemo = async () => {
  status('Loading model...');
  mobilenet = await tf.loadModel(MOBILENET_MODEL_PATH);
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();
  status('Done.');
};

const demoStatusElement = document.getElementById('status');
const status = msg => demoStatusElement.innerText = msg;

mobilenetDemo();

var isPredicting = false;

function stopPrediction() {
  isPredicting = false;
}

async function predict() {
  isPredicting = true;
  while (isPredicting) {
    tf.tidy(() => {
      var video = document.getElementById('webcam');
      var preImg = preprocess(video)
      let pred = mobilenet.predict(preImg);
      let cls = pred.argMax().buffer().values[0];    
      status(IMAGENET_CLASSES[cls]);
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



