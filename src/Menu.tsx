import React, { useState } from "react";
import { Link } from "react-router-dom";
import pathLogo from "./images/path.png";
import sortLogo from "./images/sort.png";
import lifeLogo from "./images/life.png";
import sudokuLogo from "./images/sudoku.png";

const Menu = () => {
    const [menuItem, setMenuItem] = useState(1);
    return (
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
                    <Link to="/Pathfinder" style={{ textDecoration: "none" }}>
                        <div className="selector">
                            <h2 className="selector-label">
                                Pathfinding Algorithms
                            </h2>
                            <img
                                src={pathLogo}
                                className="image"
                                alt="Pathfinding Logo"
                            />
                            <p className="selector-description">
                                Visualize different algorithms that try to find
                                a path between two points in a grid. Generate
                                mazes or draw the walls yourself to see how the
                                algorithms deal with obstacles and how they
                                differ in their approach to get from start to
                                destination.
                            </p>
                        </div>
                    </Link>
                )}

                {menuItem === 2 && (
                    <Link to="/sorter" style={{ textDecoration: "none" }}>
                        <div className="selector">
                            <h2 className="selector-label">
                                Sorting Algorithms
                            </h2>
                            <img
                                src={sortLogo}
                                className="image"
                                alt="Sorting Logo"
                            />
                            <p className="selector-description">
                                Choose between different sorting algorithms –
                                from bubble sort to quick sort – to see how
                                these different algorithms go about sorting an
                                array of numbers, with adjustable sorting speed.
                            </p>
                        </div>
                    </Link>
                )}
                {menuItem === 3 && (
                    <Link to="/life" style={{ textDecoration: "none" }}>
                        <div className="selector">
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
                                simple rules can lead to complex behavior. Input
                                a certain state and observe how each
                                evolutionary cycle transforms the current state
                                of the cells.
                            </p>
                        </div>
                    </Link>
                )}
                {menuItem === 4 && (
                    <Link to="/sudoku" style={{ textDecoration: "none" }}>
                        <div className="selector">
                            <h2 className="selector-label">Sudoku Solver</h2>
                            <img
                                src={sudokuLogo}
                                className="image"
                                alt="Sudoku logo"
                            />
                            <p className="selector-description">
                                Input an unfinished Sudoku into the Sudoku
                                solver and watch it search for a correct
                                solution. It does so by utilizing the
                                backtracking algorithm, that is, it searches for
                                a solution by trial-and-error.
                            </p>
                        </div>
                    </Link>
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
    );
};

export default Menu;
