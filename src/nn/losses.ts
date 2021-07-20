import { Value } from "../autodiff";

abstract class Loss {
	abstract forward(outputs: Value[][], labels: Value[][]): Value;
}
export class MSE extends Loss {
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
