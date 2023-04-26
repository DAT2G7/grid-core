/// <reference lib="webworker" />

import { matrixVectorProduct } from "./lib";

// Declares type of self,
declare const self: DedicatedWorkerGlobalScope & {
    getData: () => Promise<unknown | never>;
    sendResult: (data: unknown) => Promise<void | never>;
    onDone: () => void;
};

interface TaskData {
    matrix: number[][];
    column: number[];
}

const run = async () => {
    // The example core will help compute a large matrix-matrix product.
    // In order to do this, it will receive a left-hand matrix (row-major), `matrix`, and a column of the right-hand matrix, `column`.
    // The matrix-vector product of these will then be the column in the resulting matrix-matrix product at the position of `column`.
    const taskData: TaskData = (await self.getData()) as TaskData;

    const product = matrixVectorProduct(taskData.matrix, taskData.column);

    await self.sendResult(product);
};

run().then(() => self.onDone());

export {};
