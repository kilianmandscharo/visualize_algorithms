import { makeGridNode, getNeighbors, getWall } from "../Functional/Functions";
import { GridNode } from "../Functional/Interfaces";

export const dfsMaze = (inputGrid: GridNode[][]) => {
    const grid = [];
    const width = inputGrid[0].length;
    const height = inputGrid.length;
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const node = makeGridNode(i, j);
            node.wall = true;
            row.push(node);
        }
        grid.push(row);
    }

    const stack: any = [];
    const startingCoordinates = [
        [0, 0],
        [0, width - 1],
        [height - 1, 0],
        [height - 1, width - 1],
    ];
    const [row, col] =
        startingCoordinates[
            Math.floor(Math.random() * startingCoordinates.length)
        ];
    let currentNode: any = grid[row][col];

    while (stack) {
        stack.push(currentNode);
        if (currentNode) {
            currentNode.wall = false;
            currentNode.visited = true;
        }
        const neighbors = getNeighbors(currentNode, grid);
        if (neighbors.length === 0) {
            stack.pop();
            if (stack.length === 0) {
                break;
            } else {
                currentNode = stack.pop();
                continue;
            }
        } else {
            const neighbor =
                neighbors[Math.floor(Math.random() * neighbors.length)];
            const wallBetween = getWall(currentNode, neighbor, grid);
            wallBetween.wall = false;
            currentNode = neighbor;
        }
    }
    return grid;
};
