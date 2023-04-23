import { matrixVectorProduct } from "./lib";

describe("matrixVectorProduct", () => {
    test("correctly multiplies a matrix and a vector", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [7, 8, 9];

        expect(matrixVectorProduct(matrix, vector)).toStrictEqual([50, 122]);
    });

    test("throws an error when dimension don't match", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [7, 8, 9, 10];

        expect(() => matrixVectorProduct(matrix, vector)).toThrow();
    });
});
