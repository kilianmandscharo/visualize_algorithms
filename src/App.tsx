import { Routes, Route } from "react-router-dom";
import { Pathfinder } from "./Pathfinding/Pathfinder";
import { Sorter } from "./Sorting/Sorter";
import { Life } from "./Life/Life";
import { Solver } from "./Sudoku/Solver";
import Menu from "./Menu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/pathfinder" element={<Pathfinder />} />
        <Route path="/sorter" element={<Sorter />} />
        <Route path="/life" element={<Life />} />
        <Route path="/sudoku" element={<Solver />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
