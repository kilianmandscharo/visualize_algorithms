import { GridNode, DijkNode } from "../Functional/Interfaces";
import { makeDijkNode } from "../Functional/Functions";

export const dijkstra = (
    inputGrid: GridNode[][],
    start: number[],
    dest: number[],
    interDest: number[],
    interDestActive: boolean
) => {
    const grid: DijkNode[][] = [];
    for (let i = 0; i < inputGrid.length; i++) {
        let newRow = [];
        for (let j = 0; j < inputGrid[0].length; j++) {
            const node = inputGrid[i][j];
            const newNode = makeDijkNode(
                node.row,
                node.col,
                node.distance,
                node.weight,
                node.wall
            );
            newRow.push(newNode);
        }
        grid.push(newRow);
    }

    grid[start[0]][start[1]].distance = 0;
    const unvisited = getUnvisited(grid);
    const visitedNodes: DijkNode[] = [];

    if (!interDestActive) {
        while (unvisited.length > 0) {
            unvisited.sort((a, b) => a.distance - b.distance);
            const currentNode: any = unvisited.shift();
            currentNode.visited = true;
            visitedNodes.push(currentNode);
            if (currentNode.distance === Infinity) {
                return visitedNodes;
            }
            if (currentNode.row === dest[0] && currentNode.col === dest[1]) {
                return visitedNodes;
            }
            updateNeighbors(currentNode, grid);
        }
    } else {
        while (unvisited.length > 0) {
            unvisited.sort((a, b) => a.distance - b.distance);
            const currentNode: any = unvisited.shift();
            currentNode.visited = true;
            visitedNodes.push(currentNode);
            if (currentNode.distance === Infinity) {
                break;
            }
            if (
                currentNode.row === interDest[0] &&
                currentNode.col === interDest[1]
            ) {
                break;
            }
            updateNeighbors(currentNode, grid);
        }
        const newGrid: DijkNode[][] = [];
        for (let i = 0; i < inputGrid.length; i++) {
            let newRow = [];
            for (let j = 0; j < inputGrid[0].length; j++) {
                const node = inputGrid[i][j];
                const newNode = makeDijkNode(
                    node.row,
                    node.col,
                    node.distance,
                    node.weight,
                    node.wall
                );
                newRow.push(newNode);
            }
            newGrid.push(newRow);
        }

        newGrid[interDest[0]][interDest[1]].distance = 0;
        newGrid[interDest[0]][interDest[1]].predecessor =
            visitedNodes[visitedNodes.length - 1];
        const newUnvisited = getUnvisited(newGrid);

        while (newUnvisited.length > 0) {
            newUnvisited.sort((a, b) => a.distance - b.distance);
            const currentNode: any = newUnvisited.shift();
            currentNode.visited2 = true;
            visitedNodes.push(currentNode);
            if (currentNode.distance === Infinity) {
                return visitedNodes;
            }
            if (currentNode.row === dest[0] && currentNode.col === dest[1]) {
                return visitedNodes;
            }
            updateNeighbors(currentNode, newGrid);
        }
    }
};

const getUnvisited = (grid: DijkNode[][]) => {
    const unvisitedNodes = [];
    for (const row of grid) {
        for (const node of row) {
            unvisitedNodes.push(node);
        }
    }
    return unvisitedNodes;
};

const updateNeighbors = (currentNode: DijkNode, grid: DijkNode[][]) => {
    const neighbors = getNeighbors(currentNode.row, currentNode.col, grid);
    for (const neighbor of neighbors) {
        if (neighbor.wall) {
            continue;
        } else {
            if (currentNode.distance + neighbor.weight < neighbor.distance) {
                neighbor.predecessor = currentNode;
            }
            neighbor.distance = Math.min(
                currentNode.distance + neighbor.weight,
                neighbor.distance
            );
        }
    }
};

const getNeighbors = (row: number, col: number, grid: DijkNode[][]) => {
    const neighbors = [];
    if (row - 1 >= 0) neighbors.push(grid[row - 1][col]);
    if (row + 1 < grid.length) neighbors.push(grid[row + 1][col]);
    if (col - 1 >= 0) neighbors.push(grid[row][col - 1]);
    if (col + 1 < grid[0].length) neighbors.push(grid[row][col + 1]);
    return neighbors;
};
