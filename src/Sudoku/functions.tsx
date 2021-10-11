export const testInput = (y: number, x: number, n: number, s: number[][]) => {
    //Horizontal
    const horizArr = [];
    for (let i = 0; i < 9; i++) {
        horizArr.push(s[y][i]);
    }
    if (horizArr.includes(n)) {
        return false;
    }

    //Vertical
    const vertArr = [];
    for (let i = 0; i < 9; i++) {
        vertArr.push(s[i][x]);
    }
    if (vertArr.includes(n)) {
        return false;
    }

    //Blocks
    const blockArr = [];
    const xDir = Math.floor(x / 3) * 3;
    const yDir = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            blockArr.push(s[i + yDir][j + xDir]);
        }
    }
    if (blockArr.includes(n)) {
        return false;
    }

    return true;
};

export const createBoard = () => {
    const b = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(-1);
        }
        b.push(row);
    }
    return b;
};

export const createDisplayBoard = () => {
    const b = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(makeDisplayCell(i, j, -1, false, false));
        }
        b.push(row);
    }
    return b;
};

export const getNextCell = (s: number[][]) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (s[i][j] === -1) {
                return [i, j];
            }
        }
    }
    return [null, null];
};

export const checkSolvable = (board: number[][]) => {
    const errors = [];
    for (let i = 0; i < 9; i++) {
        if (!checkNumbers(board[i])) {
            errors.push(["row", i]);
        }
    }

    for (let i = 0; i < 9; i++) {
        const col = [];
        for (let j = 0; j < 9; j++) {
            col.push(board[j][i]);
        }
        if (!checkNumbers(col)) {
            errors.push(["col", i]);
        }
    }

    for (let x = 0; x < 7; x += 3) {
        for (let i = 0; i < 7; i += 3) {
            const block = [];
            for (let j = 0; j < 3; j++) {
                for (let k = 0 + x; k < 3 + x; k++) {
                    block.push(board[j + i][k]);
                }
            }
            if (!checkNumbers(block)) {
                errors.push(["block", x, i]);
            }
        }
    }
    return errors;
};

const checkNumbers = (numbers: number[]) => {
    for (const num of numbers) {
        if (num === -1) {
            continue;
        }
        let count = 0;
        for (const n of numbers) {
            if (n === num) count++;
        }
        if (count > 1) {
            return false;
        }
    }
    return true;
};

export const copyBoard = (board: number[][]) => {
    const newBoard = [];
    for (let i = 0; i < 9; i++) {
        const newRow = [...board[i]];
        newBoard.push(newRow);
    }
    return newBoard;
};

export const copyDisplayBoard = (board: DisplayCell[][]) => {
    const newBoard = [];
    for (let i = 0; i < 9; i++) {
        const newRow = [];
        for (let j = 0; j < 9; j++) {
            newRow.push({ ...board[i][j] });
        }
        newBoard.push(newRow);
    }
    return newBoard;
};

export interface DisplayCell {
    row: number;
    col: number;
    value: number;
    correct: boolean;
    wrong: boolean;
}

export const makeDisplayCell = (
    row: number,
    col: number,
    value: number,
    correct: boolean,
    wrong: boolean
): DisplayCell => {
    return {
        row: row,
        col: col,
        value: value,
        correct: correct,
        wrong: wrong,
    };
};
