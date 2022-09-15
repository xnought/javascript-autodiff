# JS GRAD
This translates Andrej Karpathy's [micrograd](https://github.com/karpathy/micrograd) into javascript and modifies the neural network composition to look more like pytorch. Thank you to Andrej!

## Getting Started
First install from npm
```bash
npm install js-grad
```
Then import from package in javascript
```javascript
import { autodiff, nn } from "js-grad";
```
or 
```javascript
const { autodiff, nn } = require("js-grad");
```
in node.

## Example Use Case in javascript : Linear Regression
This is a simple example of linear regression. You can see this live in the console at [code sandbox](https://codesandbox.io/s/linearregression-7xu75?file=/src/index.js)
```javascript
import { autodiff, nn } from "js-grad";

class LinearRegression extends nn.layers.FeedForward {
  constructor() {
    super();
    this.model = new nn.layers.Linear(1, 1);
  }
  forward(X) {
    return this.model.forward(X);
  }
  parameters() {
    return this.model.parameters();
  }
}
function createLinearVector(length) {
  return {
    X: new Array(length).fill(0).map((_, i) => [new autodiff.Value(i)]),
    y: new Array(length).fill(0).map((_, i) => [new autodiff.Value(i)])
  };
}
function main() {
  const numDataPoints = 10;
  const { X, y } = createLinearVector(numDataPoints);

  const learningRate = 0.01,
    epochs = 15; // hyper params

  // create model, how to evaluate(loss) and optimize model
  const model = new LinearRegression();
  const loss = new nn.losses.MSE();
  const optimizer = new nn.optimizers.SGD(model.parameters(), learningRate);

  for (let epoch = 1; epoch <= epochs; epoch++) {
    // forward pass
    const outputs = model.forward(X);
    const totalLoss = loss.forward(outputs, y);

    // backward pass and optimize
    optimizer.zeroGrad();
    totalLoss.backward();
    optimizer.step();

    // log metrics
    console.log(`EPOCH=${epoch} \t LOSS=${totalLoss.data}`);
  }
}

main(); // run the main program for linear regression
```

## Example Use Case : Sin Curve Fitting
```javascript
import { autodiff, nn } from "js-grad";

// destructure necessary components
const { Value } = autodiff;
const {
  layers: { Sequential, Linear, ReLU, FeedForward },
  losses: { MSE },
  optimizers: { SGD }
} = nn;

class NeuralNetwork extends FeedForward {
  constructor() {
    super();
    this.model = new Sequential(
      new Linear(1, 8),
      new ReLU(),
      new Linear(8, 8),
      new ReLU(),
      new Linear(8, 1)
    );
  }
  forward(X) {
    return this.model.forward(X);
  }
  parameters() {
    return this.model.parameters();
  }
}

function generate2D(start, stop, interval, func) {
  let X = [],
    y = [];
  for (let i = start; i < stop; i += interval) {
    X.push([new Value(i)]);
    y.push([new Value(func(i))]);
  }
  return { X, y };
}
function main() {
  const { X, y } = generate2D(0, 2 * Math.PI, Math.PI / 16, Math.sin);
  console.log(X.length, y.length);

  const model = new NeuralNetwork();
  const epochs = 10000;
  const learningRate = 0.01;
  const loss = new MSE();
  const optimizer = new SGD(model.parameters(), learningRate);

  // training
  for (let epoch = 0; epoch < epochs; epoch++) {
    //forward
    const outputs = model.forward(X);
    const totalLoss = loss.forward(outputs, y);

    //backward
    optimizer.zeroGrad(); // clear gradient
    totalLoss.backward();

    // gradient descent
    optimizer.step();

    console.log(`Epoch=${epoch + 1} \t Loss=${totalLoss.data}`);
  }
}

main();
```
