import { Value } from "../autodiff";
declare abstract class Loss {
    abstract forward(outputs: Value[][], labels: Value[][]): Value;
}
export declare class MSE extends Loss {
    forward(outputs: Value[][], labels: Value[][]): Value;
}
export {};
