export const matrixVectorProduct = (
    matrix: number[][],
    vector: number[]
): number[] => {
    const product = Array(matrix.length);

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
