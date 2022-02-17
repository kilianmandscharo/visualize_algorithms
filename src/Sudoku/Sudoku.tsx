import React from "react";
import "../App.css";
import { useState } from "react";
import {
    testInput,
    createBoard,
    getNextCell,
    checkSolvable,
    copyBoard,
    createDisplayBoard,
    makeDisplayCell,
    DisplayCell,
    copyDisplayBoard,
} from "./functions";
import { EnterBoard } from "./Board";

export const Sudoku = (props: any) => {
    const [board, setBoard] = useState(createBoard());
    const [prevBoard, setPrevBoard] = useState(createBoard());
    const [displayBoard, setDisplayBoard] = useState(createDisplayBoard());
    const [prevDisplayBoard, setPrevDisplayBoard] = useState(
        createDisplayBoard()
    );
    const [solved, setSolved] = useState(false);
    const [running, setRunning] = useState(false);
    const [solvable, setSolvable] = useState(true);
    const [reset, setReset] = useState(false);

    const changeBoard = (
        y: number,
        x: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        const value = (event.target as HTMLInputElement).value;
        if (value.charCodeAt(0) < 47 || value.charCodeAt(0) > 58) {
            return;
        }
        let v = value === "" ? -1 : parseInt(value);
        if (v === 0) {
            v = -1;
        }
        updateBoard(y, x, v);
        updateDisplayBoard(y, x, { value: v });
        setSolved(false);
    };

    const updateBoard = (row: number, col: number, value: number) => {
        setBoard((board) =>
            board.map((boardRow, rowIdx) =>
                boardRow.map((boardCell, colIdx) =>
                    row === rowIdx && col === colIdx ? value : boardCell
                )
            )
        );
    };

    const updateDisplayBoard = (row: number, col: number, obj: any) => {
        setDisplayBoard((board) =>
            board.map((boardRow, rowIdx) =>
                boardRow.map((boardCell, colIdx) =>
                    row === rowIdx && col === colIdx
                        ? Object.assign(boardCell, obj)
                        : boardCell
                )
            )
        );
    };

    const onClickReset = () => {
        if (reset) {
            setBoard(createBoard());
            setDisplayBoard(createDisplayBoard());
            setSolved(false);
            setSolvable(true);
        } else {
            setBoard(prevBoard);
            setDisplayBoard(prevDisplayBoard);
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    updateDisplayBoard(i, j, { wrong: false });
                }
            }
            setSolved(false);
            setSolvable(true);
            setReset(true);
        }
    };

    const solve = (s: number[][], list: any) => {
        const [row, col] = getNextCell(s);
        if (row == null || col == null) {
            return true;
        }
        for (let num = 1; num < 10; num++) {
            if (testInput(row, col, num, s)) {
                s[row][col] = num;
                list.push(makeDisplayCell(row, col, num, true, false));
                if (solve(s, list)) {
                    return true;
                }
            }
            s[row][col] = -1;
            list.push(makeDisplayCell(row, col, -1, false, true));
        }
        return false;
    };

    const onClickSolve = () => {
        if (running) {
            setRunning(false);
        } else {
            setPrevBoard(copyBoard(board));
            setPrevDisplayBoard(copyDisplayBoard(displayBoard));
            const tempBoard = copyBoard(board);
            setReset(false);
            const iterations: DisplayCell[] = [];
            const errors: any = checkSolvable(tempBoard);
            if (errors.length === 0) {
                setRunning(true);
                solve(tempBoard, iterations);
                setBoard(tempBoard);
                if (props.animation) {
                    animateSolve(iterations, tempBoard);
                } else {
                    setSolved(true);
                    setRunning(false);
                    const newDisplayBoard = [];
                    for (let i = 0; i < 9; i++) {
                        const newRow = [];
                        for (let j = 0; j < 9; j++) {
                            newRow.push(
                                makeDisplayCell(
                                    i,
                                    j,
                                    tempBoard[i][j],
                                    false,
                                    false
                                )
                            );
                        }
                        newDisplayBoard.push(newRow);
                    }
                    setDisplayBoard(newDisplayBoard);
                }
            } else {
                setSolvable(false);
                for (const error of errors) {
                    if (error[0] === "row") {
                        for (let i = 0; i < 9; i++) {
                            updateDisplayBoard(error[1], i, { wrong: true });
                        }
                    }
                    if (error[0] === "col") {
                        for (let i = 0; i < 9; i++) {
                            updateDisplayBoard(i, error[1], { wrong: true });
                        }
                    }
                    if (error[0] === "block") {
                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < 3; j++) {
                                updateDisplayBoard(i + error[2], j + error[1], {
                                    wrong: true,
                                });
                            }
                        }
                    }
                }
            }
        }
    };

    const animateSolve = (iterations: any, tempBoard: number[][]) => {
        let i = 0;
        let animator = setInterval(() => {
            // if (!running) {
            //     clearInterval(animator);
            // }
            if (i === iterations.length) {
                clearInterval(animator);
                setSolved(true);
                setRunning(false);
            } else {
                const cell: DisplayCell = iterations[i];
                updateDisplayBoard(cell.row, cell.col, {
                    value: cell.value,
                    correct: cell.correct,
                    wrong: cell.wrong,
                });
                i++;
            }
        }, 1);
    };

    return (
        <div>
            <EnterBoard
                changeHandler={changeBoard}
                board={displayBoard}
                solvable={solvable}
                solved={solved}
            />
            <div className="button-section">
                <button className="button" onClick={() => onClickSolve()}>
                    {/* {running ? "Stop" : "Solve"} */}
                    Solve
                </button>
                <button
                    className="button"
                    onClick={onClickReset}
                    disabled={running}
                >
                    {reset ? "Clear" : "Reset"}
                </button>
            </div>
        </div>
    );
};
