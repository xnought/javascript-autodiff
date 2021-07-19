import Value from "./Value";
import Layer from "./Module";

function main() {
	const input = [new Value(1)];
	const l1 = new Layer(1, 2);
	const output = l1.forward(input);
	console.log(l1.neurons);
	console.log(output);
}

main();
