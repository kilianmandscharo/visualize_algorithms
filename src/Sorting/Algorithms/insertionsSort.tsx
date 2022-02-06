export const insertionSort = (numbers: number[]) => {
    numbers = [...numbers];
    const reVals = [];

    for (let i = 1; i < numbers.length; i++) {
        const index = getIndex(numbers, i);
        if (index === i) {
            continue;
        }
        const num = numbers[i];
        numbers.splice(i, 1);
        numbers.splice(index, 0, num);
        reVals.push([...numbers]);
    }
    return reVals;
};

const getIndex = (numbers: number[], numIdx: number) => {
    for (let i = 0; i < numIdx; i++) {
        if (numbers[numIdx] <= numbers[i]) {
            return i;
        }
    }
    return numIdx;
};
