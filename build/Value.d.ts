export default class Value {
    data: number;
    grad: number;
    private _backward;
    private _prev;
    constructor(data: number, children?: Value[]);
    add(other: Value): Value;
    subtract(other: Value): Value;
    multiply(other: Value): Value;
    relu(): Value;
    backward(): void;
    copy(): Value;
    print(): void;
}
