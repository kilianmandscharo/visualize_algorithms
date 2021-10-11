import { maxWidth } from "../../constants";
import { Cell } from "./interfaces";

export const swap = (x: number, y: number, arr: number[] | Cell[]) => {
    const temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    return arr;
};

export const makeCell = (value: number) => {
    return {
        val: value,
        mark1: false,
        mark2: false,
    };
};

export const copyArray = (arr: Cell[]) => {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push({ ...arr[i] });
    }
    return newArray;
};

export const evaluateClassName = (cell: any): string => {
    let reVal = "bar";
    if (cell.mark1) {
        reVal += " mark1";
    }
    if (cell.mark2) {
        reVal += " mark2";
    }
    return reVal;
};

export const calculateBarsFromWidth = (width: number) => {
    return width < maxWidth ? Math.floor(width / 8) : Math.floor(maxWidth / 8);
};

export const calculateBarsFromHeight = (height: number) => {
    return Math.floor(height / 9);
};
