"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Value_1 = __importDefault(require("./Value"));
const Module_1 = __importDefault(require("./Module"));
class FeedForward {
}
class Linear extends FeedForward {
    constructor(numInputs, numNeurons) {
        super();
        this.layer = new Module_1.default(numInputs, numNeurons);
    }
    forward(X) {
        const outputs = X.map((inputs) => {
            return this.layer.forward(inputs);
        });
        return outputs;
    }
    parameters() {
        return this.layer.parameters();
    }
}
class MSE {
    forward(outputs, labels) {
        const m = outputs.length;
        let totalLoss = new Value_1.default(0);
        for (let i = 0; i < m; i++) {
            const output = outputs[i][0], label = labels[i][0];
            const diff = output.subtract(label);
            totalLoss = totalLoss.add(diff.multiply(diff.copy()));
        }
        totalLoss = totalLoss.multiply(new Value_1.default(1 / m));
        return totalLoss;
    }
}
class Optimizer {
    constructor(parameters) {
        this.parameters = parameters;
    }
}
class SGD extends Optimizer {
    constructor(parameters, learningRate = 0.001) {
        super(parameters);
        this.learningRate = learningRate;
    }
    step() {
        const { learningRate, parameters } = this;
        parameters.forEach((p) => {
            p.data -= learningRate * p.grad;
        });
    }
    zeroGrad() {
        this.parameters.forEach((p) => (p.grad = 0));
    }
}
function toValues(arr) {
    return arr.map((num) => [new Value_1.default(num)]);
}
function toNumbers(arr) {
    return arr.map((value) => value.data);
}
function print(data) {
    let a = [];
    for (const value of data) {
        a.push(value[0].data);
    }
    console.log(a);
}
const rangeLinear = (length) => new Array(length).fill(0).map((_, i) => i);
class Module {
}
class Sequential extends FeedForward {
    constructor(...layers) {
        super();
        this.layers = layers;
    }
    forward(X) {
        this.layers.forEach((layer) => {
            X = layer.forward(X);
        });
        return X;
    }
    parameters() {
        let params = [];
        this.layers.forEach((layer) => {
            if (!(layer instanceof Activation)) {
                params = [...params, ...layer.parameters()];
            }
        });
        return params;
    }
}
class Activation {
}
class ReLU extends Activation {
    forward(X) {
        const m = X.length, n = X[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                X[i][j] = X[i][j].relu();
            }
        }
        return X;
    }
}
class Lin extends Activation {
    forward(X) {
        return X;
    }
}
class LinReg extends FeedForward {
    constructor() {
        super();
        this.oneNeuron = new Sequential(new Linear(1, 1));
    }
    forward(X) {
        return this.oneNeuron.forward(X);
    }
    parameters() {
        return this.oneNeuron.parameters();
    }
}
function main() {
    const n = 15;
    const xTrain = toValues(rangeLinear(n));
    const yTrain = toValues(rangeLinear(n));
    const epochs = 205000;
    const lr = 0.02;
    const model = new LinReg();
    const loss = new MSE();
    const optim = new SGD(model.parameters(), lr);
    for (let epoch = 0; epoch < epochs; epoch++) {
        // forward pass
        const outputs = model.forward(xTrain);
        let totalLoss = loss.forward(outputs, yTrain);
        // backprop then optimize
        optim.zeroGrad();
        totalLoss.backward();
        optim.step(); // grad descent
        console.log(`Epoch=${epoch + 1} \t Loss=${totalLoss.data}`);
    }
    print(model.forward(xTrain));
}
function test() {
    let a = new Sequential(new Linear(1, 2));
}
// test();
main();
//# sourceMappingURL=index.js.map