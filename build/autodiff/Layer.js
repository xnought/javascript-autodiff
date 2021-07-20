"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neuron = void 0;
const Value_1 = __importDefault(require("./Value"));
const randNormal = () => (Math.sqrt(-2 * Math.log(Math.random())) *
    Math.cos(2 * Math.PI * Math.random())) /
    5;
class Module {
}
class Neuron extends Module {
    constructor(numInputs) {
        super();
        this.weights = new Array(numInputs);
        for (let i = 0; i < numInputs; i++) {
            this.weights[i] = new Value_1.default(randNormal());
            // this.weights[i] = new Value(randNormal());
        }
        this.bias = new Value_1.default(0);
    }
    forward(inputs) {
        const { weights, bias } = this;
        let output = new Value_1.default(0);
        for (let i = 0; i < weights.length; i++) {
            const weight = weights[i], input = inputs[i];
            output = output.add(input.multiply(weight));
        }
        return output.add(bias);
    }
    parameters() {
        return [...this.weights, this.bias];
    }
    print() {
        console.log(`Neuron(${this.weights.length})`);
    }
}
exports.Neuron = Neuron;
class Layer extends Module {
    constructor(numInputs, numNeurons) {
        super();
        this.neurons = new Array(numNeurons);
        for (let i = 0; i < numNeurons; i++) {
            this.neurons[i] = new Neuron(numInputs);
        }
    }
    forward(inputs) {
        return this.neurons.map((neuron) => neuron.forward(inputs));
    }
    parameters() {
        const { neurons } = this;
        let parameters = [];
        for (let i = 0; i < neurons.length; i++) {
            const neuronParams = neurons[i].parameters();
            parameters = [...parameters, ...neuronParams];
        }
        return parameters;
    }
}
exports.default = Layer;
//# sourceMappingURL=Layer.js.map