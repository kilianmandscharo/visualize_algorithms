import React from "react";
import "../App.css";
import { dijkstra } from "./Algorithms/Dijkstra";
import { makeGrid, evaluateCellClasses } from "./Functional/Functions";
import { prim } from "./Algorithms/Prim";
import {
    GridNode,
    GridProps,
    GridState,
    StarNode,
} from "./Functional/Interfaces";
import { aAstar } from "./Algorithms/A-star";
import { gbfs } from "./Algorithms/GBFS";
import { dfsMaze } from "./Algorithms/DFS";
import { maxWidth } from "../constants";

export class Grid extends React.Component<GridProps, GridState> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: makeGrid(
                calculateCellsFromHeight(window.innerHeight),
                calculateCellsFromWidth(window.innerWidth)
            ),
            dest: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                calculateCellsFromWidth(window.innerWidth) - 3,
            ],

            start: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                2,
            ],
            interDest: [
                2,
                Math.floor(calculateCellsFromWidth(window.innerWidth) / 2),
            ],
            running: false,
            finished: false,
            dragging: false,
            startDragging: false,
            destDragging: false,
            iDestDragging: false,
        };
    }

    updateDimensions = () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        this.setState({
            grid: makeGrid(
                calculateCellsFromHeight(height),
                calculateCellsFromWidth(width)
            ),
            dest: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                calculateCellsFromWidth(window.innerWidth) - 3,
            ],

            start: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                2,
            ],
            interDest: [
                2,
                Math.floor(calculateCellsFromWidth(window.innerWidth) / 2),
            ],
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    onClickStart = () => {
        const visitedNodes = this.fetchNodes(
            this.state.grid,
            this.state.start,
            this.state.dest,
            this.state.interDest,
            this.props.interDest
        );
        if (visitedNodes) {
            this.setState({ running: true, finished: false });
            let i = 0;
            const repeat = setInterval(() => {
                if (i === visitedNodes.length) {
                    clearInterval(repeat);
                    this.makePath(visitedNodes);
                } else {
                    if (visitedNodes[i].visited) {
                        this.updateGrid(
                            visitedNodes[i].row,
                            visitedNodes[i].col,
                            {
                                visited: true,
                            }
                        );
                    } else {
                        this.updateGrid(
                            visitedNodes[i].row,
                            visitedNodes[i].col,
                            {
                                visited2: true,
                            }
                        );
                    }

                    i++;
                }
            }, 25);
        }
    };

    fetchNodes = (
        grid: GridNode[][],
        start: number[],
        dest: number[],
        interDest: number[],
        interDestActive: boolean
    ) => {
        let reVal: any;
        if (this.props.algorithm === "Dijkstra") {
            reVal = dijkstra(grid, start, dest, interDest, interDestActive);
        } else if (this.props.algorithm === "A*") {
            reVal = aAstar(grid, start, dest, interDest, interDestActive);
        } else if (this.props.algorithm === "Greedy BFS") {
            reVal = gbfs(grid, start, dest, interDest, interDestActive);
        }
        return reVal;
    };

    makePath = (visitedNodes: GridNode[] | StarNode[]) => {
        let targetNodeExists = false;
        for (const node of visitedNodes) {
            if (
                node.row === this.state.dest[0] &&
                node.col === this.state.dest[1]
            ) {
                targetNodeExists = true;
            }
        }
        if (targetNodeExists) {
            const path = this.getPath(visitedNodes[visitedNodes.length - 1]);
            setTimeout(() => {
                let i = 0;
                const repeat = setInterval(() => {
                    if (i === path.length) {
                        clearInterval(repeat);
                    } else {
                        this.updateGrid(path[i].row, path[i].col, {
                            marked: true,
                        });
                        i++;
                    }
                }, 30);
            }, 400);
            setTimeout(
                () => this.setState({ finished: true, running: false }),
                1000 + path.length * 35
            );
        } else {
            setTimeout(
                () => this.setState({ finished: true, running: false }),
                1000
            );
        }
    };

    getPath = (currentNode: GridNode | StarNode) => {
        const path = [];
        while (currentNode.predecessor !== null) {
            path.unshift(currentNode);
            currentNode = currentNode.predecessor;
        }
        return path;
    };

    updatePathDragging = (
        start: number[],
        dest: number[],
        interDest: number[]
    ) => {
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[0].length; j++) {
                this.updateGrid(i, j, {
                    visited: false,
                    visited2: false,
                    marked: false,
                });
            }
        }
        const nodes = this.fetchNodes(
            this.state.grid,
            start,
            dest,
            interDest,
            this.props.interDest
        );
        if (nodes) {
            for (const node of nodes) {
                if (node.visited) {
                    this.updateGrid(node.row, node.col, { visited: true });
                } else {
                    this.updateGrid(node.row, node.col, { visited2: true });
                }
            }
            const path = this.getPath(nodes[nodes.length - 1]);
            for (const node of path) {
                this.updateGrid(node.row, node.col, { marked: true });
            }
        }
    };

    onClickReset = () => {
        this.setState({
            grid: makeGrid(
                calculateCellsFromHeight(window.innerHeight),
                calculateCellsFromWidth(window.innerWidth)
            ),
            dest: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                calculateCellsFromWidth(window.innerWidth) - 3,
            ],

            start: [
                Math.floor(calculateCellsFromHeight(window.innerHeight) / 2),
                2,
            ],
            interDest: [
                2,
                Math.floor(calculateCellsFromWidth(window.innerWidth) / 2),
            ],
            finished: false,
        });
    };

    onClickMaze = () => {
        let maze: any;
        if (this.props.maze === "DFS") {
            maze = dfsMaze(this.state.grid, this.state.start);
        } else if (this.props.maze === "Prim") {
            maze = prim(this.state.grid, this.state.start);
        }
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[0].length; j++) {
                const mazeNode = maze[i][j];
                const s = this.state.start;
                const d = this.state.dest;
                const b = this.state.interDest;
                if (
                    (i === s[0] && j === s[1]) ||
                    (i === d[0] && j === d[1]) ||
                    (i === b[0] && j === b[1])
                ) {
                    continue;
                } else {
                    this.updateGrid(i, j, { wall: mazeNode.wall });
                }
            }
        }
    };

    mouseDown = (e: any, row: number, col: number) => {
        console.log("down");
        const start = this.state.start;
        const dest = this.state.dest;
        const inter = this.state.interDest;
        if (this.state.running) {
            return;
        }
        if (row === start[0] && col === start[1]) {
            this.setState({ startDragging: true });
        } else if (row === dest[0] && col === dest[1]) {
            this.setState({ destDragging: true });
        } else if (row === inter[0] && col === inter[1]) {
            this.setState({ iDestDragging: true });
        } else {
            this.setState({
                dragging: true,
            });
            if (this.props.obstacle === "Weight") {
                this.updateGrid(row, col, {
                    weight: this.state.grid[row][col].weight > 1 ? 1 : 3,
                });
            } else {
                this.updateGrid(row, col, {
                    wall: !this.state.grid[row][col].wall,
                });
            }
        }
    };

    mouseUp = () => {
        console.log("up");
        this.setState({
            dragging: false,
            startDragging: false,
            destDragging: false,
            iDestDragging: false,
        });
    };

    mouseEnter = (e: any, row: number, col: number) => {
        const start = this.state.start;
        const dest = this.state.dest;
        const inter = this.state.interDest;
        if (this.state.running) {
            return;
        }
        if (
            this.state.startDragging &&
            !this.state.grid[row][col].wall &&
            !(row === dest[0] && col === dest[1]) &&
            !(row === inter[0] && col === inter[1])
        ) {
            this.setState(() => ({ start: [row, col] }));
            if (this.state.finished) {
                this.updatePathDragging([row, col], dest, inter);
            }
        } else if (
            this.state.destDragging &&
            !this.state.grid[row][col].wall &&
            !(row === start[0] && col === start[1]) &&
            !(row === inter[0] && col === inter[1])
        ) {
            this.setState(() => ({
                dest: [row, col],
            }));
            if (this.state.finished) {
                this.updatePathDragging(start, [row, col], inter);
            }
        } else if (
            this.state.iDestDragging &&
            !this.state.grid[row][col].wall &&
            !(row === start[0] && col === start[1]) &&
            !(row === dest[0] && col === dest[1])
        ) {
            this.setState(() => ({
                interDest: [row, col],
            }));
            if (this.state.finished) {
                this.updatePathDragging(start, dest, [row, col]);
            }
        } else {
            if (this.state.dragging) {
                if (
                    (row === start[0] && col === start[1]) ||
                    (row === dest[0] && col === dest[1])
                ) {
                    return;
                } else {
                    if (this.props.obstacle === "Weight") {
                        this.updateGrid(row, col, {
                            weight:
                                this.state.grid[row][col].weight > 1 ? 1 : 3,
                        });
                    } else {
                        this.updateGrid(row, col, {
                            wall: !this.state.grid[row][col].wall,
                        });
                    }
                }
            }
        }
    };

    updateGrid = (currentRow: number, currentCol: number, obj: any) => {
        this.setState((prevState) => ({
            grid: prevState.grid.map((gridRow) =>
                gridRow.map((node) =>
                    node.row === currentRow && node.col === currentCol
                        ? Object.assign(node, obj)
                        : node
                )
            ),
        }));
    };

    render() {
        return (
            <div className="main-section">
                <table
                    className="grid-pathfinder"
                    onMouseUp={() => this.mouseUp()}
                    cellSpacing={0}
                >
                    <tbody>
                        {this.state.grid.map((row, rowIdx) => (
                            <tr key={rowIdx} className="row">
                                {row.map((cell, colIdx) => (
                                    <td
                                        className="pathfinder-container"
                                        key={`container-${rowIdx}-${colIdx}`}
                                    >
                                        <div
                                            key={`node-${rowIdx}-${colIdx}`}
                                            className={evaluateCellClasses(
                                                cell,
                                                this.state.start,
                                                this.state.dest,
                                                this.state.finished,
                                                this.state.interDest,
                                                this.props.interDest
                                            )}
                                            // onTouchStart={(e) => this.touch(e)}
                                            // onTouchEnd={() => this.mouseUp()}
                                            // onTouchMove={(e) =>
                                            //     this.mouseEnter(
                                            //         e,
                                            //         rowIdx,
                                            //         colIdx
                                            //     )
                                            // }
                                            // onMouseDown={(e) =>
                                            //     this.mouseDown(
                                            //         e,
                                            //         rowIdx,
                                            //         colIdx
                                            //     )
                                            // }
                                            // onMouseUp={() => this.mouseUp()}
                                            // onMouseEnter={(e) =>
                                            //     this.mouseEnter(
                                            //         e,
                                            //         rowIdx,
                                            //         colIdx
                                            //     )
                                            // }
                                            // onTouchStart={(e) =>
                                            //     this.mouseDown(
                                            //         e,
                                            //         rowIdx,
                                            //         colIdx
                                            //     )
                                            // }
                                            onPointerDown={(e) =>
                                                this.mouseDown(
                                                    e,
                                                    rowIdx,
                                                    colIdx
                                                )
                                            }
                                            onPointerEnter={(e) =>
                                                this.mouseEnter(
                                                    e,
                                                    rowIdx,
                                                    colIdx
                                                )
                                            }
                                            onPointerUp={() => this.mouseUp}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-section">
                    <button
                        className="button"
                        onClick={() => this.onClickStart()}
                        disabled={
                            this.state.running || this.state.finished
                                ? true
                                : false
                        }
                    >
                        Start
                    </button>
                    <button
                        className="button"
                        onClick={() => this.onClickReset()}
                        disabled={this.state.running ? true : false}
                    >
                        Reset
                    </button>
                    <button
                        className="button"
                        onClick={() => this.onClickMaze()}
                        disabled={
                            this.state.running || this.state.finished
                                ? true
                                : false
                        }
                    >
                        Generate Maze
                    </button>
                </div>
            </div>
        );
    }
}

const calculateCellsFromHeight = (height: number) => {
    return Math.floor(height / 38);
};

const calculateCellsFromWidth = (width: number) => {
    return width > maxWidth
        ? Math.floor(maxWidth / 37)
        : Math.floor(width / 37);
};
