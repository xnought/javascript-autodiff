"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Value {
    constructor(data, children) {
        this.data = data;
        this.grad = 0;
        this._backward = () => { };
        this._prev = new Set(children);
    }
    add(other) {
        const out = new Value(this.data + other.data, [this, other]);
        const _backward = () => {
            this.grad += out.grad;
            other.grad += out.grad;
        };
        out._backward = _backward;
        return out;
    }
    subtract(other) {
        const out = new Value(this.data - other.data, [this, other]);
        const _backward = () => {
            this.grad += out.grad;
            other.grad += out.grad;
        };
        out._backward = _backward;
        return out;
    }
    multiply(other) {
        const out = new Value(this.data * other.data, [this, other]);
        const _backward = () => {
            this.grad += other.data * out.grad;
            other.grad += this.data * out.grad;
        };
        out._backward = _backward;
        return out;
    }
    relu() {
        const out = new Value(this.data > 0 ? this.data : 0, [this]);
        const _backward = () => {
            this.grad += (out.data > 0 ? 1 : 0) * out.grad;
        };
        out._backward = _backward;
        return out;
    }
    backward() {
        let topo = [], visited = new Set();
        const buildTopo = (v) => {
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
        for (let i = topo.length - 1; i >= 0; i--) {
            const v = topo[i];
            v._backward();
        }
    }
    copy() {
        return new Value(this.data);
    }
    print() {
        console.log(`Value(data=${this.data}, grad=${this.grad})`);
    }
}
exports.default = Value;
//# sourceMappingURL=Value.js.map