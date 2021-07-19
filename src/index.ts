import Value from "./Value";
// import Module from "./Module";

function timer(func: () => void, label: string = "Timer") {
	console.time(label);
	func();
	console.timeEnd(label);
}

function performanceComparison() {
	const num1 = 10,
		num2 = 4;
	timer(() => {
		const a = new Value(num1);
		const b = new Value(num2);
		const c = a.add(b);
		c.backward();
	}, "With Backward");
	timer(() => {
		const a = new Value(num1);
		const b = new Value(num2);
		const c = a.add(b);
	}, "Without Backward");
}

function test(): boolean {
	/* Micrograd example from python
		a = Value(2)
		b = Value(1)
		m = Value(3)
		c = (a+b) * m
		c.backward()
		print(a)
		print(b)
		print(m)

		OUTPUT >>>
		Value(data=2, grad=3)
		Value(data=1, grad=3)
		Value(data=3, grad=3)
	 */
	const a = new Value(2);
	const b = new Value(1);
	const m = new Value(3);
	const c = a.add(b).multiply(m);
	c.backward();

	const dataCheck =
		a.data !== 2 || b.data !== 1 || m.data !== 3 || c.data !== 9;
	const gradsCheck =
		a.grad !== 3 || b.grad !== 3 || m.grad !== 3 || c.grad !== 1;
	if (dataCheck && gradsCheck) return false;

	// otherwise tests did not fail
	console.log("Tests Passed");
	return true;
}

function mainTest() {
	test() && performanceComparison();
}

const randNormal = () =>
	(Math.sqrt(-2 * Math.log(Math.random())) *
		Math.cos(2 * Math.PI * Math.random())) /
	5;
class Module {
	zeroGrad() {
		const p = this.parameters();
		for (let i = 0; i < p.length; i++) {
			p[i].grad = 0;
		}
	}
	parameters(): Value[] {
		return [];
	}
}
class Neuron extends Module {
	weights: Value[];
	bias: Value;
	constructor(numInputs: number) {
		super();
		this.weights = new Array(numInputs);
		for (let i = 0; i < numInputs; i++) {
			this.weights[i] = new Value(randNormal());
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
class Layer extends Module {
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
function main() {
	// Here I will develop the Neuron, Layer and Module
	// for something similar to pytorch, probably most like tinygrad due to base
	const input = [new Value(1)];
	const l1 = new Layer(1, 2);
	const output = l1.forward(input);
	console.log(l1.neurons);
	console.log(output);
}

main();
// mainTest();
