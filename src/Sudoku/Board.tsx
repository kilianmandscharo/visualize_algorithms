import React from "react";
import "../App.css";
import { DisplayCell } from "./functions";

interface EnterProps {
    board: DisplayCell[][];
    changeHandler: (
        y: number,
        x: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    solved: boolean;
    solvable: boolean;
}

interface DisplayProps {
    board: DisplayCell[][];
    solvable: boolean;
    solved: boolean;
}

export const EnterBoard = (props: EnterProps) => {
    const board = props.board;

    const createTable = (number: number) => {
        const helperArray = new Array(3)
            .fill(0)
            .map((_) => new Array(3).fill(0).map((_, idx) => idx));

        const xOff = (number % 3) * 3;
        const yOff = Math.floor(number / 3) * 3;

        return (
            <table cellSpacing={0} cellPadding={0} className="sudoku-part">
                <tbody>
                    {helperArray.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((num) => (
                                <td
                                    key={`td ${num}`}
                                    className="cell-container"
                                >
                                    <input
                                        key={`ta ${num}`}
                                        maxLength={1}
                                        className={evaluateClass(
                                            board[rowIdx + yOff][num + xOff]
                                        )}
                                        value={
                                            board[rowIdx + yOff][num + xOff]
                                                .value === -1
                                                ? ""
                                                : board[rowIdx + yOff][
                                                      num + xOff
                                                  ].value
                                        }
                                        onChange={(e) =>
                                            props.changeHandler(
                                                rowIdx + yOff,
                                                num + xOff,
                                                e
                                            )
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <table
            className={
                props.solved
                    ? "solved-sudoku-board"
                    : props.solvable
                    ? "sudoku-board"
                    : "unsolvable-sudoku-board"
            }
            cellSpacing={0}
            cellPadding={0}
        >
            {/* {props.board.map((row, rowIdx) => (
                <div key={rowIdx} className="board-row">
                    {row.map((cell, cellIdx) => (
                        <textarea
                            maxLength={1}
                            key={cellIdx}
                            className="enter-board-cell"
                            value={cell.value === -1 ? "" : cell.value}
                            onChange={(e) =>
                                props.changeHandler(rowIdx, cellIdx, e)
                            }
                        ></textarea>
                    ))}
                </div>
            ))} */}
            <tbody>
                <tr>
                    <td>{createTable(0)}</td>
                    <td>{createTable(1)}</td>
                    <td>{createTable(2)}</td>
                </tr>
                <tr>
                    <td>{createTable(3)}</td>
                    <td>{createTable(4)}</td>
                    <td>{createTable(5)}</td>
                </tr>
                <tr>
                    <td>{createTable(6)}</td>
                    <td>{createTable(7)}</td>
                    <td>{createTable(8)}</td>
                </tr>
            </tbody>
        </table>
    );
};

export const DisplayBoard = (props: DisplayProps) => {
    const board = props.board;

    const createTable = (number: number) => {
        const helperArray = new Array(3)
            .fill(0)
            .map((_) => new Array(3).fill(0).map((_, idx) => idx));

        const xOff = (number % 3) * 3;
        const yOff = Math.floor(number / 3) * 3;

        return (
            <table cellSpacing={0} className="sudoku-section">
                <tbody>
                    {helperArray.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {row.map((num) => (
                                <td
                                    key={num}
                                    className={evaluateClass(
                                        board[rowIdx + yOff][num + xOff]
                                    )}
                                >
                                    {board[rowIdx + yOff][num + xOff].value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <table
            className={
                props.solved
                    ? "solved-display-board"
                    : props.solvable
                    ? "display-board"
                    : "unsolvable-display-board"
            }
            cellSpacing={0}
            cellPadding={0}
        >
            <tbody>
                {/* {props.board.map((row, rowIdx) => (
                <div key={rowIdx} className="board-row">
                    {row.map((cell, cellIdx) => (
                        <div key={cellIdx} className={evaluateClass(cell)}>
                            {cell.value}
                        </div>
                    ))}
                </div>
            ))} */}
                <tr>
                    <td>{createTable(0)}</td>
                    <td>{createTable(1)}</td>
                    <td>{createTable(2)}</td>
                </tr>
                <tr>
                    <td>{createTable(3)}</td>
                    <td>{createTable(4)}</td>
                    <td>{createTable(5)}</td>
                </tr>
                <tr>
                    <td>{createTable(6)}</td>
                    <td>{createTable(7)}</td>
                    <td>{createTable(8)}</td>
                </tr>
            </tbody>
        </table>
    );
};

const evaluateClass = (cell: DisplayCell) => {
    // let reVal = "display-board-cell";
    let reVal = "sudoku-cell";
    if (cell.value === -1) reVal += cell.wrong ? " wrong-opaque" : " opaque";
    if (cell.correct) reVal += " correct";
    if (cell.wrong) reVal += " wrong";
    return reVal;
};
