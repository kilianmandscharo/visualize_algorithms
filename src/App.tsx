import React from "react";
import "./App.css";
import { useState } from "react";
import { Pathfinder } from "./Pathfinding/Pathfinder";
import { Sorter } from "./Sorting/Sorter";
import { Life } from "./Life/Life";
import { Solver } from "./Sudoku/Solver";
import pathLogo from "./images/path.png";
import sortLogo from "./images/sort.png";
import lifeLogo from "./images/life.png";
import sudokuLogo from "./images/sudoku.png";

function App() {
    const [app, setApp] = useState("main");
    const [menuItem, setMenuItem] = useState(1);

    const setMain = () => {
        setApp("main");
    };

    return (
        <div className="App">
            {app === "main" && (
                <div>
                    <h2 className="header">Visualizing Algorithms</h2>
                    <div className="app-selection">
                        <div
                            className="left-selector"
                            onClick={() =>
                                setMenuItem((prev) => (prev > 1 ? prev - 1 : 4))
                            }
                        ></div>
                        <div
                            className="right-selector"
                            onClick={() =>
                                setMenuItem((prev) => (prev < 4 ? prev + 1 : 1))
                            }
                        ></div>
                        {menuItem === 1 && (
                            <div
                                className="path-selector selector"
                                onClick={() => setApp("Pathfinding")}
                            >
                                <h2 className="selector-label">
                                    Pathfinding Algorithms
                                </h2>
                                <img
                                    src={pathLogo}
                                    className="image"
                                    alt="Pathfinding Logo"
                                />
                                <p className="selector-description">
                                    Visualize different algorithms that try to
                                    find a path between two points in a grid.
                                    Generate mazes or draw the walls yourself to
                                    see how the algorithms deal with obstacles
                                    and how they differ in their approach to get
                                    from start to destination.
                                </p>
                            </div>
                        )}

                        {menuItem === 2 && (
                            <div
                                className="sort-selector selector"
                                onClick={() => setApp("Sorting")}
                            >
                                <h2 className="selector-label">
                                    Sorting Algorithms
                                </h2>
                                <img
                                    src={sortLogo}
                                    className="image"
                                    alt="Sorting Logo"
                                />
                                <p className="selector-description">
                                    Choose between different sorting algorithms
                                    – from bubble sort to quick sort – to see
                                    how these different algorithms go about
                                    sorting an array of numbers, with adjustable
                                    sorting speed.
                                </p>
                            </div>
                        )}
                        {menuItem === 3 && (
                            <div
                                className="life-selector selector"
                                onClick={() => setApp("Life")}
                            >
                                <h2 className="selector-label">
                                    Conway's Game of Life
                                </h2>
                                <img
                                    src={lifeLogo}
                                    className="image"
                                    alt="Game of life logo"
                                />
                                <p className="selector-description">
                                    John Conway's famous Game of Life (1970) – a
                                    cellular automaton – visualizes how a set of
                                    simple rules can lead to complex behavior.
                                    Input a certain state and observe how each
                                    evolutionary cycle transforms the current
                                    state of the cells.
                                </p>
                            </div>
                        )}
                        {menuItem === 4 && (
                            <div
                                className="sudoku-selector selector"
                                onClick={() => setApp("Sudoku")}
                            >
                                <h2 className="selector-label">
                                    Sudoku Solver
                                </h2>
                                <img
                                    src={sudokuLogo}
                                    className="image"
                                    alt="Sudoku logo"
                                />
                                <p className="selector-description">
                                    Input an unfinished Sudoku into the Sudoku
                                    solver and watch it search for a correct
                                    solution. It does so by utilizing the
                                    backtracking algorithm, that is, it searches
                                    for a solution by trial-and-error.
                                </p>
                            </div>
                        )}
                        <div className="indicator-section">
                            <div
                                className="indicator"
                                style={{
                                    backgroundColor:
                                        menuItem === 1 ? "white" : "#3d405b",
                                }}
                            />
                            <div
                                className="indicator"
                                style={{
                                    backgroundColor:
                                        menuItem === 2 ? "white" : "#3d405b",
                                }}
                            />
                            <div
                                className="indicator"
                                style={{
                                    backgroundColor:
                                        menuItem === 3 ? "white" : "#3d405b",
                                }}
                            />
                            <div
                                className="indicator"
                                style={{
                                    backgroundColor:
                                        menuItem === 4 ? "white" : "#3d405b",
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {app === "Pathfinding" && <Pathfinder handleClick={setMain} />}
            {app === "Sorting" && <Sorter handleClick={setMain} />}
            {app === "Life" && <Life handleClick={setMain} />}
            {app === "Sudoku" && <Solver handleClick={setMain} />}
        </div>
    );
}

export default App;
