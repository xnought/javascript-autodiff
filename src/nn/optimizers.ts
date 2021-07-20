import { Value } from "../autodiff";

abstract class Optimizer {
	readonly parameters: Value[];
	constructor(parameters: Value[]) {
		this.parameters = parameters;
	}
	abstract step(): void;
}
export class SGD extends Optimizer {
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
