import { swap } from "../Functional/functions";

export const selectionSort = (numbers: number[]): number[][] => {
    const nums = [...numbers];
    const reVal: any = [];
    for (let i = 0; i < nums.length; i++) {
        const index = getSmallestIndex(nums.slice(i)) + i;
        swap(i, index, nums);
        reVal.push([...nums]);
    }
    return reVal;
};

const getSmallestIndex = (numbers: number[]) => {
    let smallestNumber = Infinity;
    let smallestIndex = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < smallestNumber) {
            smallestNumber = numbers[i];
            smallestIndex = i;
        } else {
        }
    }
    return smallestIndex;
};
