import Value from "./Value";
import Layer from "./Module";

abstract class FeedForward {
	abstract forward(X: Value[][]): Value[][];
	abstract parameters(): Value[];
}
class Linear extends FeedForward {
	readonly layer: Layer;
	constructor(numInputs: number, numNeurons: number) {
		super();
		this.layer = new Layer(numInputs, numNeurons);
	}
	forward(X: Value[][]) {
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
	forward(outputs: Value[][], labels: Value[][]) {
		const m = outputs.length;
		let totalLoss = new Value(0);
		for (let i = 0; i < m; i++) {
			const output = outputs[i][0],
				label = labels[i][0];
			const diff = output.subtract(label);
			totalLoss = totalLoss.add(diff.multiply(diff.copy()));
		}
		totalLoss = totalLoss.multiply(new Value(1 / m));
		return totalLoss;
	}
}
abstract class Optimizer {
	readonly parameters: Value[];
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
		parameters.forEach((p) => {
			p.data -= learningRate * p.grad;
		});
	}
	zeroGrad() {
		this.parameters.forEach((p) => (p.grad = 0));
	}
}

function toValues(arr: number[]) {
	return arr.map((num) => [new Value(num)]);
}
function toNumbers(arr: Value[]) {
	return arr.map((value) => value.data);
}
function print(data: Value[][]) {
	let a = [];
	for (const value of data) {
		a.push(value[0].data);
	}
	console.log(a);
}
const rangeLinear = (length: number) =>
	new Array(length).fill(0).map((_, i) => i);

abstract class Module {
	abstract forward(X: Value[][]): Value[][];
	abstract parameters(): Value[];
}

class Sequential extends FeedForward {
	layers: FeedForward[];
	constructor(...layers: FeedForward[]) {
		super();
		this.layers = layers;
	}
	forward(X: Value[][]) {
		this.layers.forEach((layer) => {
			X = layer.forward(X);
		});
		return X;
	}
	parameters() {
		let params: Value[] = [];
		this.layers.forEach((layer) => {
			params = [...params, ...layer.parameters()];
		});
		return params;
	}
}
class LinReg extends FeedForward {
	oneNeuron: FeedForward;
	constructor() {
		super();
		this.oneNeuron = new Sequential(new Linear(1, 1));
	}
	forward(X: Value[][]) {
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

	const epochs = 100;
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
