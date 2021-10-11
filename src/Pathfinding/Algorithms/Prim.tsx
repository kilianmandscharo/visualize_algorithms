import { makeGridNode } from "../Functional/Functions";
import { GridNode } from "../Functional/Interfaces";
import { getNeighbors, getWall } from "../Functional/Functions";

export const prim = (inputGrid: GridNode[][], start: number[]) => {
    let unvisited: GridNode[] = [];
    const grid = [];
    for (let i = 0; i < inputGrid.length; i++) {
        const row = [];
        for (let j = 0; j < inputGrid[0].length; j++) {
            const node = makeGridNode(i, j);
            node.wall = true;
            node.weight = Math.random() * 10;
            row.push(node);
            unvisited.push(node);
        }
        grid.push(row);
    }

    const visited: any = [];
    const startNode: any = unvisited.shift();
    startNode.wall = false;
    startNode.visited = true;
    visited.push(startNode);
    while (unvisited) {
        let minimum = Infinity;
        let minNode: any;
        let minNeighbor: any;
        let minWall: any;
        for (const node of visited) {
            const neighbors = getNeighbors(node, grid);
            if (neighbors.length > 0) {
                for (const neighbor of neighbors) {
                    const wall = getWall(node, neighbor, grid);
                    if (wall.weight < minimum) {
                        minimum = wall.weight;
                        minNode = node;
                        minNeighbor = neighbor;
                        minWall = wall;
                    }
                }
            }
        }
        if (!minNeighbor) {
            break;
        }
        visited.push(minNeighbor);
        minNeighbor.visited = true;
        unvisited = unvisited.filter((node) => {
            if (node.row === minNeighbor.row && node.col === minNeighbor.col) {
                return false;
            } else {
                return true;
            }
        });
        grid[minNode.row][minNode.col].wall = false;
        grid[minWall.row][minWall.col].wall = false;
        grid[minNeighbor.row][minNeighbor.col].wall = false;
    }
    return grid;
};
