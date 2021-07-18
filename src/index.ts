class Value {
	data: number;
	grad: number;
	private _backward: () => void;
	private _prev: Set<Value>;
	constructor(data: number, children?: Value[]) {
		this.data = data;
		this.grad = 0;
		this._backward = () => {};
		this._prev = new Set(children);
	}
	add(other: Value): Value {
		const out = new Value(this.data + other.data, [this, other]);
		console.log(out._prev);
		const _backward = () => {
			this.grad += out.grad;
			other.grad += out.grad;
		};
		out._backward = _backward;
		return out;
	}
	multiply(other: Value): Value {
		const out = new Value(this.data * other.data, [this, other]);
		const _backward = () => {
			this.grad += other.grad * out.grad;
			other.grad += this.grad * out.grad;
		};
		out._backward = _backward;
		return out;
	}
	relu(): Value {
		const out = new Value(this.data > 0 ? this.data : 0, [this]);
		const _backward = () => {
			this.grad += (out.data > 0 ? 1 : 0) * out.grad;
		};
		out._backward = _backward;
		return out;
	}
	print(): void {
		console.log(`Value=${this.data}, grad=${this.grad}`);
	}
}

const main = (): void => {
	const a = new Value(10);
	const zero = new Value(0);
	const b = a.add(a);
	const c = b.multiply(a).add(b).multiply(zero);
	c.print();
};

main();
