import { GridNode, DijkNode } from "./Interfaces";

export const makeGrid = (height: number, width: number) => {
    const newGrid = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(makeGridNode(i, j));
        }
        newGrid.push(row);
    }
    return newGrid;
};

export const makeGridNode = (row: number, col: number): GridNode => {
    return {
        row: row,
        col: col,
        visited: false,
        visited2: false,
        distance: Infinity,
        weight: 1,
        predecessor: null,
        marked: false,
        wall: false,
    };
};

export const makeDijkNode = (
    row: number,
    col: number,
    distance: number,
    weight: number,
    wall: boolean
): DijkNode => {
    return {
        row: row,
        col: col,
        distance: distance,
        weight: weight,
        predecessor: null,
        wall: wall,
        visited: false,
        visited2: false,
    };
};

export const makeStarNode = (
    row: number,
    col: number,
    weight: number,
    destination: number[],
    wall: boolean
) => {
    return {
        row: row,
        col: col,
        f: Infinity,
        g: Infinity,
        h: Math.abs(destination[0] - row) + Math.abs(destination[1] - col),
        predecessor: null,
        weight: weight,
        wall: wall,
        visited: false,
        visited2: false,
    };
};

export const getNeighbors = (currentNode: GridNode, grid: GridNode[][]) => {
    const row = currentNode.row;
    const col = currentNode.col;
    const neighbors = [];
    const height = grid.length;
    const width = grid[0].length;

    if (row - 2 >= 0 && !grid[row - 2][col].visited)
        neighbors.push(grid[row - 2][col]);
    if (row + 2 < height && !grid[row + 2][col].visited)
        neighbors.push(grid[row + 2][col]);
    if (col - 2 >= 0 && !grid[row][col - 2].visited)
        neighbors.push(grid[row][col - 2]);
    if (col + 2 < width && !grid[row][col + 2].visited)
        neighbors.push(grid[row][col + 2]);

    return neighbors;
};

export const getWall = (
    currentNode: GridNode,
    neighbor: GridNode,
    grid: GridNode[][]
) => {
    let row, col;
    if (currentNode.row === neighbor.row) {
        row = currentNode.row;
        col = Math.max(currentNode.col, neighbor.col) - 1;
    } else {
        col = currentNode.col;
        row = Math.max(currentNode.row, neighbor.row) - 1;
    }
    return grid[row][col];
};

export const evaluateCellClasses = (
    cell: GridNode,
    start: number[],
    dest: number[],
    finished: boolean,
    interDest: number[],
    interDestActive: boolean
) => {
    let reVal = `${cell.row}-${cell.col} node`;
    const row = cell.row;
    const col = cell.col;
    if (row === dest[0] && col === dest[1]) {
        reVal += " dest";
    } else if (row === start[0] && col === start[1]) {
        reVal += " start";
    } else if (
        row === interDest[0] &&
        col === interDest[1] &&
        interDestActive
    ) {
        reVal += " inter-dest";
    } else if (cell.wall) {
        reVal += " wall";
    } else if (cell.marked) {
        reVal += finished ? " marked-f" : " marked";
    } else if (cell.weight > 1) {
        reVal += " weight";
    } else if (cell.visited2) {
        reVal += finished ? " visited-2-f" : " visited-2";
    } else if (cell.visited) {
        reVal += finished ? " visited-f" : " visited";
    } else {
        reVal += " plain";
    }
    return reVal;
};
