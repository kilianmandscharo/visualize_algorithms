export const insertionSort = (numbers: number[]) => {
    numbers = [...numbers];
    const reVal = [];

    for (let i = 1; i < numbers.length; i++) {
        const index = getIndex(numbers, i);
        const num = numbers[i];
        numbers.splice(i, 1);
        numbers.splice(index, 0, num);
        reVal.push([...numbers]);
    }

    return reVal;
};

const getIndex = (numbers: number[], numIdx: number) => {
    for (let i = 0; i < numIdx; i++) {
        if (numbers[numIdx] <= numbers[i]) {
            return i;
        }
    }
    return numIdx;
};
