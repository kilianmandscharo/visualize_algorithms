import React from "react";
import "../App.css";
import { breakPoint, maxWidth } from "../constants";
import Cell from "./Cell";

const smallWidth = 14;
const smallHeight = 24;
const largeWidth = 30;
const largeHeight = 15;

export class Grid extends React.Component<
    {
        speed: number;
    },
    {
        grid: number[][];
        running: boolean;
        timer: any;
        previousGrid: number[][];
        reset: boolean;
        color: boolean;
        dragging: boolean;
        smallSize: boolean;
        currentCell: [number, number];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            grid: this.makeGrid(
                calculateCellsFromHeight(window.innerHeight),
                calculateCellsFromWidth(window.innerWidth),
                false
            ),
            running: false,
            timer: null,
            previousGrid: this.makeGrid(
                window.innerWidth < breakPoint ? smallHeight : largeHeight,
                window.innerWidth < breakPoint ? smallWidth : largeWidth,
                false
            ),
            reset: true,
            color: false,
            dragging: false,
            smallSize: window.innerWidth < breakPoint ? true : false,
            currentCell: [-1, -1],
        };
    }

    updateDimensions = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.setState({
            grid: this.makeGrid(
                calculateCellsFromHeight(height),
                calculateCellsFromWidth(width),
                false
            ),
        });
        if (this.state.smallSize && width >= breakPoint) {
            this.setState({
                smallSize: false,
            });
        }
        if (!this.state.smallSize && width < breakPoint) {
            this.setState({
                smallSize: true,
            });
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    makeGrid = (height: number, width: number, random: boolean) => {
        const arr = new Array(height);
        for (let i = 0; i < height; i++) {
            const row = new Array(width);
            for (let j = 0; j < width; j++) {
                row[j] = random ? Math.floor(2 * Math.random()) : 0;
            }
            arr[i] = row;
        }
        return arr;
    };

    copyArray = (grid: number[][]) => {
        let arr = [];
        for (let i = 0; i < grid.length; i++) {
            arr[i] = grid[i].slice();
        }
        return arr;
    };

    onClickStartStop = () => {
        if (!this.state.running) {
            const prevGrid = this.copyArray(this.state.grid);
            this.setState(() => ({
                previousGrid: prevGrid,
            }));
            const vel = (15 - this.props.speed) * 100;
            const myTimer = setInterval(() => this.updateGrid(), vel);
            this.setState(() => ({
                timer: myTimer,
                reset: false,
            }));
            this.setState({ running: true });
        } else {
            this.clearTimer();
        }
    };

    clearTimer = () => {
        clearInterval(this.state.timer);
        this.setState({ running: false });
    };

    onClickResetClear = () => {
        if (this.state.reset) {
            this.setState(() => ({
                grid: this.makeGrid(
                    this.state.grid.length,
                    this.state.grid[0].length,
                    false
                ),
                running: false,
            }));
        } else {
            let arr: number[][] = [];
            for (let i = 0; i < this.state.previousGrid.length; i++) {
                arr[i] = this.state.previousGrid[i].slice();
            }
            this.clearTimer();
            this.setState(() => ({
                grid: arr,
                reset: true,
            }));
        }
    };

    updateGrid = () => {
        if (this.checkGrid(this.state.grid)) {
            this.clearTimer();
            this.setState(() => ({ running: false }));
        }
        let newGrid = this.copyArray(this.state.grid);
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid[0].length; j++) {
                const value = this.state.grid[i][j];
                const neighbors = this.countNeighbors(i, j);
                if (value === 0 && neighbors === 3) {
                    newGrid[i][j] = 1;
                } else if (value >= 1 && (neighbors < 2 || neighbors > 3)) {
                    newGrid[i][j] = 0;
                } else if (value >= 1 && (neighbors === 2 || neighbors === 3)) {
                    newGrid[i][j]++;
                }
            }
        }
        this.setState(() => ({ grid: newGrid }));
    };

    checkGrid = (grid: number[][]) => {
        for (const row of grid) {
            for (const cell of row) {
                if (cell !== 0) {
                    return false;
                }
            }
        }
        return true;
    };

    countNeighbors = (row: number, col: number) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (
                    this.state.grid[
                        (row + i + this.state.grid.length) %
                            this.state.grid.length
                    ][
                        (col + j + this.state.grid[0].length) %
                            this.state.grid[0].length
                    ] >= 1
                ) {
                    sum++;
                }
            }
        }
        sum -= this.state.grid[row][col] >= 1 ? 1 : 0;
        return sum;
    };

    onClickFill = () => {
        if (this.state.running) {
            return;
        } else {
            const newGrid = this.makeGrid(
                this.state.grid.length,
                this.state.grid[0].length,
                true
            );

            this.setState(() => ({
                grid: newGrid,
                previousGrid: newGrid,
            }));
        }
    };

    onPointerDown = (currentRow: number, currentCol: number) => {
        if (!this.state.running) {
            this.setState({ dragging: true });
            this.changeGrid(currentRow, currentCol);
        }
    };

    onPointerUp = () => {
        this.setState({ dragging: false });
    };

    onMouseEnter = (currentRow: number, currentCol: number) => {
        if (!this.state.running && this.state.dragging) {
            this.changeGrid(currentRow, currentCol);
        }
    };

    handleTouchMove = (e: any) => {
        const x = e.touches["0"].pageX;
        const y = e.touches["0"].pageY;
        const element = document.elementFromPoint(x, y);
        if (element) {
            const name = element.className.split(" ")[0];
            if (Number.isNaN(parseInt(name.split("")[0]))) {
                return;
            }
            const row = parseInt(name.split("-")[0]);
            const col = parseInt(name.split("-")[1]);
            if (
                row === this.state.currentCell[0] &&
                col === this.state.currentCell[1]
            ) {
                return;
            }
            this.setState({ currentCell: [row, col] });
            this.onMouseEnter(row, col);
        }
    };

    changeGrid = (currentRow: number, currentCol: number) => {
        this.setState((prevState) => ({
            grid: prevState.grid.map((gridRow, rowIdx) =>
                gridRow.map((cell, cellIdx) =>
                    rowIdx === currentRow && cellIdx === currentCol
                        ? cell > 0
                            ? 0
                            : 1
                        : cell
                )
            ),
        }));
    };

    render() {
        return (
            <div onPointerUp={() => this.onPointerUp()}>
                <table
                    className="grid-life"
                    cellSpacing={0}
                    onTouchMove={this.handleTouchMove}
                >
                    <tbody>
                        {this.state.grid.map((row, rowIdx) => (
                            <tr key={rowIdx} className="row">
                                {row.map((cell, cellIdx) => (
                                    <td>
                                        <Cell
                                            row={rowIdx}
                                            col={cellIdx}
                                            color={this.state.color}
                                            cellValue={cell}
                                            handleMouseEnter={this.onMouseEnter}
                                            handlePointerDown={
                                                this.onPointerDown
                                            }
                                            handlePointerUp={this.onPointerUp}
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
                        onClick={() => this.onClickStartStop()}
                    >
                        {this.state.running ? "Stop" : "Start"}
                    </button>
                    <button
                        className="button"
                        onClick={() => this.onClickResetClear()}
                        disabled={this.state.running}
                    >
                        {this.state.reset ? "Clear" : "Reset"}
                    </button>
                    <button
                        className="button"
                        onClick={() => this.onClickFill()}
                        disabled={this.state.running}
                    >
                        Fill
                    </button>
                    <button
                        className="button"
                        onClick={() =>
                            this.setState({
                                color: this.state.color ? false : true,
                            })
                        }
                    >
                        Color
                    </button>
                </div>
            </div>
        );
    }
}

const calculateCellsFromWidth = (width: number) => {
    return width < maxWidth
        ? Math.floor(width / 20)
        : Math.floor(maxWidth / 20);
};

const calculateCellsFromHeight = (height: number) => {
    return Math.floor(height / 28);
};
