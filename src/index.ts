/// <reference lib="webworker" />

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

const matrixVectorProduct = (
    matrix: number[][],
    vector: number[]
): number[] => {
    let product = Array(matrix.length);

    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        if (row.length != vector.length) {
            throw `Mismatch in lengths of row ${i} of the matrix (length ${row.length}) and the vector (length ${vector.length})`;
        }

        let s = 0;

        for (let j = 0; j < row.length; j++) {
            s += row[j] * vector[j];
        }
        product[i] = s;
    }

    return product;
};

const run = async () => {
    // The example core will help compute a large matrix-matrix product.
    // In order to do this, it will receive a left-hand matrix (row-major), `matrix`, and a column of the right-hand matrix, `column`.
    // The matrix-vector product of these will then be the column in the resulting matrix-matrix product at the position of `column`.
    const { matrix, column } = (await self.getData()) as TaskData;

    const product = matrixVectorProduct(matrix, column);

    await self.sendResult(product);
};

run().then(() => self.onDone());

export {};
