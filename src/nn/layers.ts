import { Value, Layer } from "../autodiff";

export abstract class FeedForward {
	abstract forward(X: Value[][]): Value[][];
	parameters(): Value[] {
		let params: Value[] = [];
		for (const [key, value] of Object.entries(this)) {
			if (value instanceof Layer || value instanceof FeedForward) {
				params.push(...value.parameters());
			}
		}
		return params;
	}
}
export abstract class Activation {
	abstract forward(X: Value[][]): Value[][];
}

export class Linear extends FeedForward {
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
}

export class Sequential extends FeedForward {
	layers: (FeedForward | Activation)[];
	constructor(...layers: (FeedForward | Activation)[]) {
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
			if (!(layer instanceof Activation)) {
				params = [...params, ...layer.parameters()];
			}
		});
		return params;
	}
}

export class ReLU extends Activation {
	forward(X: Value[][]) {
		const m = X.length,
			n = X[0].length;
		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				X[i][j] = X[i][j].relu();
			}
		}
		return X;
	}
}
