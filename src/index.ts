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
			this.grad += other.data * out.grad;
			other.grad += this.data * out.grad;
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
	backward(): void {
		let topo: Value[] = [],
			visited = new Set();

		const buildTopo = (v: Value) => {
			if (!visited.has(v)) {
				visited.add(v);
				v._prev.forEach((child) => {
					buildTopo(child);
				});
				topo.push(v);
			}
		};
		buildTopo(this);

		this.grad = 1;
		topo.reverse().forEach((v) => {
			v._backward();
		});
	}
	print(): void {
		console.log(`Value(data=${this.data}, grad=${this.grad})`);
	}
}

const main = (): void => {
	/* Micrograd example
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

	let c = a.add(b);
	c = c.multiply(m);

	c.backward();
	a.print();
	b.print();
	m.print();
};

main();
