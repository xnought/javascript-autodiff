"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SGD = void 0;
class Optimizer {
    constructor(parameters) {
        this.parameters = parameters;
    }
}
class SGD extends Optimizer {
    constructor(parameters, learningRate = 0.001) {
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
exports.SGD = SGD;
//# sourceMappingURL=optimizers.js.map