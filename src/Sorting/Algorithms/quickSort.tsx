import { swap } from "../Functional/functions";

export const quickSort = (numbers: number[]) => {
    numbers = [...numbers];
    const reVal: any = [];

    const qSort = (
        left: number,
        right: number,
        arr: number[],
        reVal: number[][]
    ) => {
        if (left <= right) {
            const sep = partition(left, right, arr, reVal);
            qSort(left, sep - 1, arr, reVal);
            qSort(sep + 1, right, arr, reVal);
        }
    };

    qSort(0, numbers.length - 1, numbers, reVal);
    return reVal;
};

const partition = (
    left: number,
    right: number,
    arr: number[],
    reVal: number[][]
): number => {
    let pivotIndex = left;
    let pivot = arr[right];
    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            swap(i, pivotIndex, arr);
            pivotIndex++;
            reVal.push([...arr]);
        }
    }
    swap(right, pivotIndex, arr);
    reVal.push([...arr]);
    return pivotIndex;
};
