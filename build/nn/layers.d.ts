import { Value, Layer } from "../autodiff";
export declare abstract class FeedForward {
    abstract forward(X: Value[][]): Value[][];
    parameters(): Value[];
}
export declare abstract class Activation {
    abstract forward(X: Value[][]): Value[][];
}
export declare class Linear extends FeedForward {
    readonly layer: Layer;
    constructor(numInputs: number, numNeurons: number);
    forward(X: Value[][]): Value[][];
}
export declare class Sequential extends FeedForward {
    layers: (FeedForward | Activation)[];
    constructor(...layers: (FeedForward | Activation)[]);
    forward(X: Value[][]): Value[][];
    parameters(): Value[];
}
export declare class ReLU extends Activation {
    forward(X: Value[][]): Value[][];
}
