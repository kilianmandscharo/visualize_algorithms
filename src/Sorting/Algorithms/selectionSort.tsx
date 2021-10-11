import { copyArray, makeCell, swap } from "../Functional/functions";
import { Cell } from "../Functional/interfaces";

export const selectionSort = (numbers: number[]): number[][] => {
    // const nums = [];
    const nums = [...numbers];
    // for (let i = 0; i < numbers.length; i++) {
    //     nums.push(makeCell(numbers[i]));
    // }
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
    // let lastCell = null;
    for (let i = 0; i < numbers.length; i++) {
        // if (lastCell) {
        //     lastCell.mark1 = false;
        //     lastCell.mark2 = false;
        // }
        if (numbers[i] < smallestNumber) {
            smallestNumber = numbers[i];
            smallestIndex = i;
            // numbers[i].mark1 = true;
            // lastCell = numbers[i];
        } else {
            // numbers[i].mark2 = true;
            // lastCell = numbers[i];
        }
        // reVal.push(copyArray(numbers));
    }
    return smallestIndex;
};
