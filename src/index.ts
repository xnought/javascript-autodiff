import { Value } from "./autodiff";
import * as nn from "./nn";

function toValues(arr: number[]) {
	return arr.map((num) => [new Value(num)]);
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

class LinReg extends nn.layers.FeedForward {
	oneNeuron: nn.layers.FeedForward;
	constructor() {
		super();
		this.oneNeuron = new nn.layers.Sequential(new nn.layers.Linear(1, 1));
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

	const epochs = 10;
	const lr = 0.02;
	const model = new LinReg();
	const loss = new nn.losses.MSE();
	const optim = new nn.optimizers.SGD(model.parameters(), lr);

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

// test();

main();
