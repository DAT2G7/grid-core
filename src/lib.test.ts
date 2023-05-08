import { matrixProduct } from "./lib";

describe("matrixProduct", () => {
    test("correctly multiplies a matrix and a vector", () => {
        const saveFunction = jest.fn();

        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [[7], [8], [9]];

        expect(
            matrixProduct(matrix, vector, saveFunction, 0, undefined)
        ).toStrictEqual([[50], [122]]);
        expect(saveFunction).toBeCalledTimes(2);
    });

    test("correctly multiplies two matrices", () => {
        const saveFunction = jest.fn();

        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [
            [7, 5],
            [8, 6],
            [9, 7]
        ];

        expect(
            matrixProduct(matrix, vector, saveFunction, 0, undefined)
        ).toStrictEqual([
            [50, 38],
            [122, 92]
        ]);
        expect(saveFunction).toBeCalledTimes(2);
    });

    test("throws an error when dimension don't match", () => {
        const saveFunction = jest.fn();

        const matrix = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const vector = [[7], [8], [9], [10]];

        expect(() =>
            matrixProduct(matrix, vector, saveFunction, 0, undefined)
        ).toThrow();
        expect(saveFunction).not.toBeCalled();
    });

    test("correctly resumes computation", () => {
        const saveFunction = jest.fn();

        const matrixA = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const matrixB = [
            [7, 5],
            [8, 6],
            [9, 7]
        ];

        const saved = [[50, 38]];

        expect(
            matrixProduct(matrixA, matrixB, saveFunction, 1, saved)
        ).toStrictEqual([
            [50, 38],
            [122, 92]
        ]);
        expect(saveFunction).toBeCalledTimes(1);
    });
});
