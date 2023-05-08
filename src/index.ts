/// <reference lib="webworker" />

import { matrixProduct } from "./lib";

import { DBSchema, IDBPDatabase, openDB } from "idb";

// Declares type of self,
declare const self: DedicatedWorkerGlobalScope & {
    getData: () => Promise<unknown | never>;
    sendResult: (data: unknown) => Promise<void | never>;
    onDone: () => void;
};

interface Db extends DBSchema {
    currentRow: {
        key: string;
        value: number;
    };
    rows: {
        key: number;
        value: number[];
    };
}

interface TaskData {
    matrixA: number[][];
    matrixB: number[][];
}

const run = async () => {
    // The example core will help compute a large chain matrix-matrix products.
    // In order to do this, it will receive two matrices (row-major), `matrixA` and `matrixB`, and compute the product between the two.
    // This product can then be multiplied together with another matrix, which could be the result of another grid computation.
    const taskData: TaskData = (await self.getData()) as TaskData;

    // Ideally this would contain the core id
    const db = await openDB<Db>("coreMatMul", 1, {
        upgrade(db) {
            db.createObjectStore("currentRow");
            db.createObjectStore("rows");
        }
    });

    const startIndex = (await db.get("currentRow", "currentRow")) || 0;

    const saved: number[][] = Array(startIndex);
    let cursor = await db.transaction("rows").store.openCursor();

    while (cursor) {
        saved[cursor.key] = cursor.value;
        cursor = await cursor.continue();
    }

    const product = matrixProduct(
        taskData.matrixA,
        taskData.matrixB,
        saveRowFunction(db, "rows", "currentRow"),
        startIndex,
        saved
    );

    await self.sendResult(product);
};

type ObjectStore = Parameters<IDBPDatabase<Db>["put"]>[0];

const saveRowFunction = (
    db: IDBPDatabase<Db>,
    rowsObjectStore: ObjectStore,
    currentRowObjectStore: ObjectStore
): ((index: number, row: number[]) => Promise<void>) => {
    return async (index: number, row: number[]) => {
        await db.put(rowsObjectStore, row, index);
        await db.put(currentRowObjectStore, index, "currentRow");
    };
};

run().then(() => self.onDone());

export {};
