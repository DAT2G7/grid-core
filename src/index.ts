/// <reference lib="webworker" />

import { matrixProduct } from "./lib";

// Declares type of self,
declare const self: DedicatedWorkerGlobalScope & {
    getData: () => Promise<unknown | never>;
    sendResult: (data: unknown) => Promise<void | never>;
    onDone: () => void;
};

interface TaskData {
    matrixA: number[][];
    matrixB: number[][];
}

const run = async () => {
    // The example core will help compute a large chain matrix-matrix products.
    // In order to do this, it will receive two matrices (row-major), `matrixA` and `matrixB`, and compute the product between the two.
    // This product can then be multiplied together with another matrix, which could be the result of another grid computation.
    const taskData: TaskData = (await self.getData()) as TaskData;

    const product = matrixProduct(taskData.matrixA, taskData.matrixB);

    await self.sendResult(product);
};

run().then(() => self.onDone());

export {};
