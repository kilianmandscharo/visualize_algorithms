import { makeStarNode } from "../Functional/Functions";
import { GridNode, StarNode } from "../Functional/Interfaces";

export const aAstar = (
    inputGrid: GridNode[][],
    start: number[],
    destination: number[],
    interDest: number[],
    interDestActive: boolean
) => {
    const grid = [];
    for (let i = 0; i < inputGrid.length; i++) {
        const newRow = [];
        for (let j = 0; j < inputGrid[0].length; j++) {
            const newNode = makeStarNode(
                i,
                j,
                inputGrid[i][j].weight,
                interDestActive ? interDest : destination,
                inputGrid[i][j].wall
            );
            newRow.push(newNode);
        }
        grid.push(newRow);
    }

    const open = [];
    const closed = [];

    const startNode = grid[start[0]][start[1]];
    startNode.g = 0;
    open.push(startNode);

    const visitedNodes: StarNode[] = [];

    if (!interDestActive) {
        while (open.length > 0) {
            open.sort((a, b) => a.f - b.f);
            const currentNode: any = open.shift();
            currentNode.visited = true;
            visitedNodes.push(currentNode);
            if (
                currentNode.row === destination[0] &&
                currentNode.col === destination[1]
            ) {
                return visitedNodes;
            }
            closed.push(currentNode);
            updateNeighbors(currentNode, grid, closed, open);
        }
        return visitedNodes;
    } else {
        while (open.length > 0) {
            open.sort((a, b) => a.f - b.f);
            const currentNode: any = open.shift();
            currentNode.visited = true;
            visitedNodes.push(currentNode);
            if (
                currentNode.row === interDest[0] &&
                currentNode.col === interDest[1]
            ) {
                break;
            }
            closed.push(currentNode);
            updateNeighbors(currentNode, grid, closed, open);
        }
        const newGrid = [];
        for (let i = 0; i < inputGrid.length; i++) {
            const newRow = [];
            for (let j = 0; j < inputGrid[0].length; j++) {
                const newNode = makeStarNode(
                    i,
                    j,
                    inputGrid[i][j].weight,
                    destination,
                    inputGrid[i][j].wall
                );
                newRow.push(newNode);
            }
            newGrid.push(newRow);
        }

        const newOpen = [];
        const newClosed = [];

        const startNode: any = newGrid[interDest[0]][interDest[1]];
        startNode.g = 0;
        startNode.predecessor = visitedNodes[visitedNodes.length - 1];
        newOpen.push(startNode);

        while (newOpen.length > 0) {
            newOpen.sort((a, b) => a.f - b.f);
            const currentNode: any = newOpen.shift();
            currentNode.visited2 = true;
            visitedNodes.push(currentNode);
            if (
                currentNode.row === destination[0] &&
                currentNode.col === destination[1]
            ) {
                return visitedNodes;
            }
            newClosed.push(currentNode);
            updateNeighbors(currentNode, newGrid, newClosed, newOpen);
        }
        return visitedNodes;
    }
};

const updateNeighbors = (
    currentNode: StarNode,
    grid: StarNode[][],
    closed: StarNode[],
    open: StarNode[]
) => {
    const neighbors = getNeighbors(currentNode.row, currentNode.col, grid);
    for (const neighbor of neighbors) {
        if (!checkList(neighbor.row, neighbor.col, closed) && !neighbor.wall) {
            const newG = currentNode.g + neighbor.weight;
            if (
                !checkList(neighbor.row, neighbor.col, open) ||
                newG < neighbor.g
            ) {
                neighbor.predecessor = currentNode;
                neighbor.g = newG;
                neighbor.f = newG + neighbor.h;
                if (!checkList(neighbor.row, neighbor.col, open)) {
                    open.push(neighbor);
                }
            }
        }
    }
};

export const getNeighbors = (row: number, col: number, grid: StarNode[][]) => {
    const neighbors = [];
    if (row - 1 >= 0) neighbors.push(grid[row - 1][col]);
    if (row + 1 < grid.length) neighbors.push(grid[row + 1][col]);
    if (col - 1 >= 0) neighbors.push(grid[row][col - 1]);
    if (col + 1 < grid[0].length) neighbors.push(grid[row][col + 1]);
    return neighbors;
};

export const checkList = (row: number, col: number, list: StarNode[]) => {
    for (const node of list) {
        if (node.row === row && node.col === col) {
            return true;
        }
    }
    return false;
};
