import { swap } from "../Functional/functions";

export const gnomeSort = (numbers: number[]): number[][] => {
    numbers = [...numbers];
    let pos = 0;
    const reVal = [];
    while (pos < numbers.length - 1) {
        if (numbers[pos] < numbers[pos + 1]) {
            pos++;
        } else {
            swap(pos, pos + 1, numbers);
            reVal.push([...numbers]);
            if (pos > 0) {
                pos--;
            }
        }
    }
    return reVal;
};
