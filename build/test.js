"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Value_1 = __importDefault(require("./Value"));
function timer(func, label = "Timer") {
    console.time(label);
    func();
    console.timeEnd(label);
}
function performanceComparison() {
    const num1 = 10, num2 = 4;
    timer(() => {
        const a = new Value_1.default(num1);
        const b = new Value_1.default(num2);
        const c = a.add(b);
        c.backward();
    }, "With Backward");
    timer(() => {
        const a = new Value_1.default(num1);
        const b = new Value_1.default(num2);
        const c = a.add(b);
    }, "Without Backward");
}
function test() {
    /* Micrograd example from python
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
    const a = new Value_1.default(2);
    const b = new Value_1.default(1);
    const m = new Value_1.default(3);
    const c = a.add(b).multiply(m);
    c.backward();
    const dataCheck = a.data !== 2 || b.data !== 1 || m.data !== 3 || c.data !== 9;
    const gradsCheck = a.grad !== 3 || b.grad !== 3 || m.grad !== 3 || c.grad !== 1;
    if (dataCheck && gradsCheck)
        return false;
    // otherwise tests did not fail
    console.log("Tests Passed");
    return true;
}
function mainTest() {
    test() && performanceComparison();
}
//# sourceMappingURL=test.js.map