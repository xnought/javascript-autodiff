import Value from "./autodiff/Value";

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
	const a = new Value(2);
	const b = new Value(1);
	const m = new Value(3);

	let c = a.add(b);
	c = c.multiply(m);
	c.backward();

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
	if (a.data !== 2 || b.data !== 1 || m.data !== 3 || c.data !== 9)
		return false; // check data
	if (a.grad !== 3 || b.grad !== 3 || m.grad !== 3 || c.grad !== 1)
		return false; // check grads

	console.log("Tests Passed");
	return true;
}

function main() {
	test() && performanceComparison();
}

main();
