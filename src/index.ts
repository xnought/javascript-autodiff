import Value from "./Value";
import Layer from "./Module";

class Linear {
	readonly layer: Layer;
	constructor(numInputs: number, numNeurons: number) {
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

function main() {
	const n = 15;
	const xTrain = toValues(rangeLinear(n));
	const yTrain = toValues(rangeLinear(n));

	const epochs = 100;
	const lr = 0.02;
	const l1 = new Linear(1, 1);
	const loss = new MSE();
	const optim = new SGD(l1.parameters(), lr);

	for (let epoch = 0; epoch < epochs; epoch++) {
		// forward
		const outputs = l1.forward(xTrain);
		let totalLoss = loss.forward(outputs, yTrain);

		//backward then grad descent
		optim.zeroGrad();
		totalLoss.backward();
		optim.step();

		console.log(`Epoch=${epoch + 1} \t Loss=${totalLoss.data}`);
	}
	print(l1.forward(xTrain));
}

main();
