//import * as tf from '@tensorflow/tfjs';

// 2x3 Tensor
const shape = [2, 3]; // 2 rows, 3 columns
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // print Tensor values
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

// The shape can also be inferred:
const b = tf.tensor([[1.0, 2.0, 3.0, 4.0, 5.0], [10.0, 20.0, 30.0, 40.0, 5.0]]);
b.print();
// Output: [[1 , 2 , 3 ],
//          [10, 20, 30]]

//document.getElementById("kk").innerHTML = "holass";


function test() {
	document.getElementById("kk").innerHTML = String(a.shape);
}

function test2() {
	document.getElementById("kk").innerHTML = String(b.shape);
}

//webcam.setup();