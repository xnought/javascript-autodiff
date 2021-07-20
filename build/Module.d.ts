import Value from "./Value";
declare abstract class Module {
    abstract parameters(): Value[];
}
export declare class Neuron extends Module {
    weights: Value[];
    bias: Value;
    constructor(numInputs: number);
    forward(inputs: Value[]): Value;
    parameters(): Value[];
    print(): void;
}
export default class Layer extends Module {
    neurons: Neuron[];
    constructor(numInputs: number, numNeurons: number);
    forward(inputs: Value[]): Value[];
    parameters(): Value[];
}
export {};
