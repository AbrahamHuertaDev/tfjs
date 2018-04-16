
const MOBILENET_MODEL_PATH = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
const IMAGE_SIZE = 224;

let mobilenet;
const mobilenetDemo = async () => {
  status('Loading model...');

  mobilenet = await tf.loadModel(MOBILENET_MODEL_PATH);

  // Warmup the model. This isn't necessary, but makes the first prediction
  // faster. Call `dispose` to release the WebGL memory allocated for the return
  // value of `predict`.
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

  status('Done.');

};


const demoStatusElement = document.getElementById('status');
const status = msg => demoStatusElement.innerText = msg;

mobilenetDemo();

function predict() {

	//var img = document.getElementById('cat');
	var video = document.getElementById('webcam');

	//var preImg = preprocess(img)
	var preImg = preprocess(video)

    //get predictions 
    let pred = mobilenet.predict(preImg);
    //retreive the highest probability class label 
    let cls = pred.argMax().buffer().values[0];
    
    status(IMAGENET_CLASSES[cls]);
}

function preprocess(video) {
	/*
    let tensor = tf.fromPixels(video).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image 
    const normalized = tensor.sub(offset).div(offset);
  
    //We add a dimension to get a batch shape [1,224,224,3]
    const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);

    return batched
    */
    
    const webcamImage = tf.fromPixels(video);
    const batchedImage = webcamImage.expandDims(0);
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    
}



