import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menuItem, setMenuItem] = useState(1);
  const [direction, setDirection] = useState("");
  const [visible, setVisible] = useState([1, 2]);

  const animate = (direction: "left" | "right") => {
    if (direction === "left") {
      setVisible([menuItem, menuItem === 1 ? 4 : menuItem - 1]);
      setDirection("-");
      setMenuItem((prev) => (prev > 1 ? prev - 1 : 4));
    }
    if (direction === "right") {
      setVisible([menuItem, menuItem === 4 ? 1 : menuItem + 1]);
      setDirection("+");
      setMenuItem((prev) => (prev < 4 ? prev + 1 : 1));
    }
  };

  const determineSelectorClass = (menuNumber: number) => {
    let name = "selector";
    if (direction !== "") {
      if (menuNumber === visible[0]) {
        name +=
          direction === "+"
            ? " selector-to-right-primary"
            : " selector-to-left-primary";
      }
      if (menuNumber === visible[1]) {
        name +=
          direction === "+"
            ? " selector-to-right-secondary"
            : " selector-to-left-secondary";
      }
    }
    return name;
  };

  return (
    <div>
      <h2 className="header">Visualizing Algorithms</h2>
      <div className="app-selection">
        <div className="left-selector" onClick={() => animate("left")}></div>
        <div className="right-selector" onClick={() => animate("right")}></div>
        {visible.includes(4) && (
          <Link to="/sudoku" style={{ textDecoration: "none" }}>
            <div className={determineSelectorClass(4)}>
              <h2 className="selector-label">Sudoku Solver</h2>
              <img src="/sudoku.png" className="image" alt="Sudoku logo" />
              <p className="selector-description">
                Input an unfinished Sudoku into the Sudoku solver and watch it
                search for a correct solution. It does so by utilizing the
                backtracking algorithm, that is, it searches through all
                possible number combinations until it finds a solution.
              </p>
            </div>
          </Link>
        )}
        {visible.includes(3) && (
          <Link to="/life" style={{ textDecoration: "none" }}>
            <div className={determineSelectorClass(3)}>
              <h2 className="selector-label">Conway's Game of Life</h2>
              <img src="/life.png" className="image" alt="Game of life logo" />
              <p className="selector-description">
                John Conway's famous Game of Life (1970) visualizes how a set of
                simple rules can lead to complex behavior. Input a certain state
                and observe how each evolutionary cycle transforms the current
                state of the cells.
              </p>
            </div>
          </Link>
        )}
        {visible.includes(2) && (
          <Link to="/sorter" style={{ textDecoration: "none" }}>
            <div className={determineSelectorClass(2)}>
              <h2 className="selector-label">Sorting Algorithms</h2>
              <img src="/sort.png" className="image" alt="Sorting Logo" />
              <p className="selector-description">
                Choose between different sorting algorithms – from the very
                simple bubble sort to the recursive quick sort – to see how
                these different algorithms go about sorting an array of numbers,
                with adjustable sorting speed.
              </p>
            </div>
          </Link>
        )}
        {visible.includes(1) && (
          <Link to="/Pathfinder" style={{ textDecoration: "none" }}>
            <div className={determineSelectorClass(1)}>
              <h2 className="selector-label">Pathfinding Algorithms</h2>
              <img src="/path.png" className="image" alt="Pathfinding Logo" />
              <p className="selector-description">
                Visualize different pathfinding algorithms on a grid. Generate
                mazes or draw the walls yourself to see how the algorithms deal
                with obstacles and how they differ in their approach to get from
                start to destination.
              </p>
            </div>
          </Link>
        )}
        <div className="indicator-section">
          <div
            className="indicator"
            style={{
              backgroundColor: menuItem === 1 ? "white" : "#3d405b",
            }}
          />
          <div
            className="indicator"
            style={{
              backgroundColor: menuItem === 2 ? "white" : "#3d405b",
            }}
          />
          <div
            className="indicator"
            style={{
              backgroundColor: menuItem === 3 ? "white" : "#3d405b",
            }}
          />
          <div
            className="indicator"
            style={{
              backgroundColor: menuItem === 4 ? "white" : "#3d405b",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
