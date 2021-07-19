import Value from "./Value";
import Layer, { Module } from "./Module";

class Linear {
	private layer: Layer;
	constructor(numInputs: number, numNeurons: number) {
		this.layer = new Layer(numInputs, numNeurons);
	}
	forward(X: Value[][]) {
		const outputs = X.map((inputs) => this.layer.forward(inputs));
		return outputs;
	}
	zeroGrad() {
		this.layer.zeroGrad();
	}
	parameters() {
		return this.layer.parameters();
	}
}
class LinearRegression {
	l1: Linear;
	constructor() {
		this.l1 = new Linear(1, 1);
	}
	forward(X: any) {
		X = this.l1.forward(X);
		return X;
	}
	zeroGrad() {
		this.l1.zeroGrad();
	}
	parameters() {
		return this.l1.parameters();
	}
}
class MSE {
	forward(outputs: Value[][], labels: Value[][]): Value {
		return new Value(0);
	}
}
abstract class Optimizer {
	parameters: Value[];
	constructor(parameters: Value[]) {
		this.parameters = parameters;
	}
	abstract step(): void;
}
class SGD extends Optimizer {
	learningRate: number;
	constructor(parameters: Value[], learningRate: number = 0.001) {
		super(parameters);
		this.learningRate = learningRate;
	}
	step() {
		const { learningRate, parameters } = this;
		for (const value of parameters) {
			value.data -= learningRate * value.grad;
		}
	}
}

function toValues(arr: number[]) {
	return arr.map((num) => [new Value(num)]);
}
function toNumbers(arr: Value[]) {
	return arr.map((value) => value.data);
}
function main() {
	const n = 15;
	const rangeLinear = (length: number) =>
		new Array(length).fill(0).map((_, i) => i);
	const X = rangeLinear(n);
	const y = rangeLinear(n);
	const xTrain = toValues(X);
	const yTrain = toValues(y);
	console.log("X:", X, "y:", y);

	const loss = new MSE();
	const model = new LinearRegression();
	console.log(model.parameters());
	console.log(model.forward(xTrain));
}

main();
