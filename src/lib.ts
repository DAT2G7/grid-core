export const matrixProduct = (
    matrixA: number[][],
    matrixB: number[][],
    saveRow: (index: number, row: number[]) => Promise<void>,
    startIndex: number,
    currentProduct: number[][] | undefined
): number[][] => {
    const product: number[][] = currentProduct || Array(matrixA.length);

    for (let i = startIndex; i < matrixA.length; i++) {
        product[i] = Array(matrixB[i].length);

        if (matrixA[i].length != matrixB.length) {
            throw `mismatched size between row ${i} of left matrix (${matrixA[i].length} columns) and right matrix (${matrixB.length} rows)`;
        }

        for (let j = 0; j < matrixB[i].length; j++) {
            product[i][j] = 0;

            for (let k = 0; k < matrixB.length; k++) {
                product[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
        saveRow(i, product[i]);
    }

    return product;
};
