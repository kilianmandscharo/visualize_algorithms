import { swap } from "../Functional/functions";

export const bubbleSort = (numbers: number[]): number[][] => {
    numbers = [...numbers];
    let swapped = true;
    let size = numbers.length;
    const reVal = [];
    while (swapped) {
        swapped = false;
        for (let i = 0; i < size - 1; i++) {
            if (numbers[i] > numbers[i + 1]) {
                swap(i, i + 1, numbers);
                swapped = true;
                reVal.push([...numbers]);
            }
        }
        size--;
    }
    return reVal;
};
