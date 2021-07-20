"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSE = void 0;
const autodiff_1 = require("../autodiff");
class Loss {
}
class MSE extends Loss {
    forward(outputs, labels) {
        const m = outputs.length;
        let totalLoss = new autodiff_1.Value(0);
        for (let i = 0; i < m; i++) {
            const output = outputs[i][0], label = labels[i][0];
            const diff = output.subtract(label);
            totalLoss = totalLoss.add(diff.multiply(diff.copy()));
        }
        totalLoss = totalLoss.multiply(new autodiff_1.Value(1 / m));
        return totalLoss;
    }
}
exports.MSE = MSE;
//# sourceMappingURL=losses.js.map