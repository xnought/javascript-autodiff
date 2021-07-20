"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReLU = exports.Sequential = exports.Linear = exports.FeedForward = void 0;
const autodiff_1 = require("../autodiff");
class FeedForward {
}
exports.FeedForward = FeedForward;
class Activation {
}
class Linear extends FeedForward {
    constructor(numInputs, numNeurons) {
        super();
        this.layer = new autodiff_1.Layer(numInputs, numNeurons);
    }
    forward(X) {
        const outputs = X.map((inputs) => {
            return this.layer.forward(inputs);
        });
        return outputs;
    }
    parameters() {
        return this.layer.parameters();
    }
}
exports.Linear = Linear;
class Sequential extends FeedForward {
    constructor(...layers) {
        super();
        this.layers = layers;
    }
    forward(X) {
        this.layers.forEach((layer) => {
            X = layer.forward(X);
        });
        return X;
    }
    parameters() {
        let params = [];
        this.layers.forEach((layer) => {
            if (!(layer instanceof Activation)) {
                params = [...params, ...layer.parameters()];
            }
        });
        return params;
    }
}
exports.Sequential = Sequential;
class ReLU extends Activation {
    forward(X) {
        const m = X.length, n = X[0].length;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                X[i][j] = X[i][j].relu();
            }
        }
        return X;
    }
}
exports.ReLU = ReLU;
//# sourceMappingURL=layers.js.map