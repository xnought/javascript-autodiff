import Value from "./Value";
import Layer, { Module } from "./Module";

class Linear {
	private layer: Layer;
	constructor(numInputs: number, numNeurons: number) {
		this.layer = new Layer(numInputs, numNeurons);
	}
	forward(X: Value[][]) {
		let outputs: Value[][] = [];
		for (const inputs of X) {
			const output = this.layer.forward(inputs);
			outputs.push(output);
		}
		return outputs;
	}
	zeroGrad() {
		this.layer.zeroGrad();
	}
}

function main() {
	const input = [[new Value(1)], [new Value(2)]];
	const l1 = new Linear(1, 2);
	const l2 = new Linear(2, 1);
	console.log(l2.forward(l1.forward(input)));
	// const l1 = new Layer(1, 2);
	// const l2 = new Layer(2, 1);
	// const output = l2.forward(l1.forward(input));
	// console.log(output);
}

main();
