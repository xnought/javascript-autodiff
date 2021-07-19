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

class Neuron {
	constructor() {}
}
class Layer {
	constructor() {}
}
class Module {
	constructor() {}
}
function main() {
	// Here I will develop the Neuron, Layer and Module
	// for something similar to pytorch, probably most like tinygrad due to base
}

main();
// mainTest();
