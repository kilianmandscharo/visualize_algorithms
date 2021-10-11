import { makeStarNode } from "../Functional/Functions";
import { GridNode } from "../Functional/Interfaces";
import { checkList, getNeighbors } from "./A-star";

export const gbfs = (
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
            newRow.push(
                makeStarNode(
                    i,
                    j,
                    inputGrid[i][j].weight,
                    interDestActive ? interDest : destination,
                    inputGrid[i][j].wall
                )
            );
        }
        grid.push(newRow);
    }

    const open = [];
    const closed = [];
    const visitedNodes = [];
    open.push(grid[start[0]][start[1]]);

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
            const neighbors = getNeighbors(
                currentNode.row,
                currentNode.col,
                grid
            );
            closed.push(currentNode);
            for (const neighbor of neighbors) {
                if (
                    !checkList(neighbor.row, neighbor.col, closed) &&
                    !neighbor.wall
                ) {
                    if (!checkList(neighbor.row, neighbor.col, open)) {
                        open.push(neighbor);
                        neighbor.f = neighbor.h + neighbor.weight;
                        neighbor.predecessor = currentNode;
                    }
                }
            }
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
            const neighbors = getNeighbors(
                currentNode.row,
                currentNode.col,
                grid
            );
            closed.push(currentNode);
            for (const neighbor of neighbors) {
                if (
                    !checkList(neighbor.row, neighbor.col, closed) &&
                    !neighbor.wall
                ) {
                    if (!checkList(neighbor.row, neighbor.col, open)) {
                        open.push(neighbor);
                        neighbor.f = neighbor.h + neighbor.weight;
                        neighbor.predecessor = currentNode;
                    }
                }
            }
        }

        const newGrid = [];
        for (let i = 0; i < inputGrid.length; i++) {
            const newRow = [];
            for (let j = 0; j < inputGrid[0].length; j++) {
                newRow.push(
                    makeStarNode(
                        i,
                        j,
                        inputGrid[i][j].weight,
                        destination,
                        inputGrid[i][j].wall
                    )
                );
            }
            newGrid.push(newRow);
        }

        const newOpen = [];
        const newClosed = [];
        const startNode = newGrid[interDest[0]][interDest[1]];
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
            const neighbors = getNeighbors(
                currentNode.row,
                currentNode.col,
                newGrid
            );
            newClosed.push(currentNode);
            for (const neighbor of neighbors) {
                if (
                    !checkList(neighbor.row, neighbor.col, newClosed) &&
                    !neighbor.wall
                ) {
                    if (!checkList(neighbor.row, neighbor.col, newOpen)) {
                        newOpen.push(neighbor);
                        neighbor.f = neighbor.h + neighbor.weight;
                        neighbor.predecessor = currentNode;
                    }
                }
            }
        }
        return visitedNodes;
    }
};
