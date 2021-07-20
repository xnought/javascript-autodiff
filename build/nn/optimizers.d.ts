import { Value } from "../autodiff";
declare abstract class Optimizer {
    readonly parameters: Value[];
    constructor(parameters: Value[]);
    abstract step(): void;
}
export declare class SGD extends Optimizer {
    learningRate: number;
    constructor(parameters: Value[], learningRate?: number);
    step(): void;
    zeroGrad(): void;
}
export {};
