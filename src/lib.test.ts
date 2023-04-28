import { matrixProduct } from "./lib";

describe("matrixProduct", () => {
    test("correctly multiplies a matrix and a vector", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [[7], [8], [9]];

        expect(matrixProduct(matrix, vector)).toStrictEqual([[50], [122]]);
    });

    test("correctly multiplies two matrices", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [
            [7, 5],
            [8, 6],
            [9, 7]
        ];

        expect(matrixProduct(matrix, vector)).toStrictEqual([
            [50, 38],
            [122, 92]
        ]);
    });

    test("throws an error when dimension don't match", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [[7], [8], [9], [10]];

        expect(() => matrixProduct(matrix, vector)).toThrow();
    });
});
