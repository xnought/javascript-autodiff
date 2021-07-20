import Value from "./Value";
const randNormal = () =>
	(Math.sqrt(-2 * Math.log(Math.random())) *
		Math.cos(2 * Math.PI * Math.random())) /
	5;
abstract class Module {
	abstract parameters(): Value[];
}
export class Neuron extends Module {
	weights: Value[];
	bias: Value;
	constructor(numInputs: number) {
		super();
		this.weights = new Array(numInputs);
		for (let i = 0; i < numInputs; i++) {
			this.weights[i] = new Value(randNormal());
			// this.weights[i] = new Value(randNormal());
		}
		this.bias = new Value(0);
	}
	forward(inputs: Value[]) {
		const { weights, bias } = this;
		let output = new Value(0);
		for (let i = 0; i < weights.length; i++) {
			const weight = weights[i],
				input = inputs[i];
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
export default class Layer extends Module {
	neurons: Neuron[];
	constructor(numInputs: number, numNeurons: number) {
		super();
		this.neurons = new Array(numNeurons);
		for (let i = 0; i < numNeurons; i++) {
			this.neurons[i] = new Neuron(numInputs);
		}
	}
	forward(inputs: Value[]) {
		return this.neurons.map((neuron) => neuron.forward(inputs));
	}
	parameters() {
		const { neurons } = this;
		let parameters: Value[] = [];
		for (let i = 0; i < neurons.length; i++) {
			const neuronParams = neurons[i].parameters();
			parameters = [...parameters, ...neuronParams];
		}
		return parameters;
	}
}
