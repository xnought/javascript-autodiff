class Value {
	data: number;
	constructor(data: number) {
		this.data = data;
	}
	add(other: Value): Value {
		const output = this.data + other.data;
		return new Value(output);
	}
	subtract(other: Value): Value {
		const output = this.data - other.data;
		return new Value(output);
	}
	multiply(other: Value): Value {
		const output = this.data * other.data;
		return new Value(output);
	}
	divide(other: Value): Value {
		const output = this.data / other.data;
		return new Value(output);
	}
	relu(): Value {
		const output = this.data > 0 ? this.data : 0;
		return new Value(output);
	}
	print(): void {
		console.log(`Value=${this.data}`);
	}
}

const main = (): void => {
	const a = new Value(10);
	const zero = new Value(0);
	const b = a.add(a);
	b.multiply(a)
		.add(b)
		.relu()
		.multiply(zero)
		.relu()
		.subtract(a)
		.divide(a)
		.print();
};

main();
