import React from "react";
// import "./Pathfinder.css";
// import { dijkstra } from "../Diskstra";
// import { makeGrid, evaluateCellClasses } from "../Functions";
// import { useState } from "react";

// const height = 15;
// const width = 25;

// export interface Node {
//     row: number;
//     col: number;
//     visited: boolean;
//     distance: number;
//     predecessor: null | Node;
//     marked: boolean;
//     wall: boolean;
// }

// export const Pathfinder = () => {
//     const [grid, setGrid] = useState(makeGrid(height, width));
//     const [destination, setDestination] = useState([7, 22]);
//     const [start, setStart] = useState([7, 22]);
//     const [running, setRunning] = useState(false);
//     const [finished, setFinished] = useState(false);
//     const [dragging, setDragging] = useState(false);

//     const onClickStart = () => {
//         const visitedNodes = dijkstra(grid, start, destination);
//         if (visitedNodes) {
//             setRunning(true);
//             setFinished(false);
//             let i = 0;
//             const repeat = setInterval(() => {
//                 if (i === visitedNodes.length) {
//                     clearInterval(repeat);
//                     makePath(visitedNodes);
//                 } else {
//                     console.log("working");
//                     updateGrid(
//                         visitedNodes[i].row,
//                         visitedNodes[i].col,
//                         "visited",
//                         true
//                     );
//                     i++;
//                 }
//             }, 15);
//         }
//     };

//     const makePath = (visitedNodes: Node[]) => {
//         for (const node of visitedNodes) {
//             if (node.row === destination[0] && node.col === destination[1]) {
//                 setFinished(true);
//             }
//             if (finished) {
//                 const path = getPath(visitedNodes[visitedNodes.length - 1]);
//                 setTimeout(() => {
//                     let i = 0;
//                     const repeat = setInterval(() => {
//                         if (i === path.length) {
//                             clearInterval(repeat);
//                         } else {
//                             updateGrid(
//                                 path[i].row,
//                                 path[i].col,
//                                 "marked",
//                                 true
//                             );
//                             i++;
//                         }
//                     }, 50);
//                     setRunning(false);
//                 }, 400);
//             }
//         }
//     };

//     const getPath = (currentNode: Node) => {
//         const path = [];
//         while (currentNode.predecessor !== null) {
//             path.unshift(currentNode);
//             currentNode = currentNode.predecessor;
//         }
//         return path;
//     };

//     const onClickReset = () => {
//         setGrid(makeGrid(height, width));
//     };

//     const mouseDown = (currentRow: number, currentCol: number) => {
//         setDragging(true);
//         if (
//             (currentRow === destination[0] && currentCol === destination[1]) ||
//             (currentRow === start[0] && currentCol === start[1])
//         ) {
//             return;
//         } else {
//             if (grid[currentRow][currentCol].wall) {
//                 updateGrid(currentRow, currentCol, "wall", false);
//             } else {
//                 updateGrid(currentRow, currentCol, "wall", true);
//             }
//         }
//     };

//     const mouseUp = () => {
//         setDragging(false);
//     };

//     const mouseEnter = (currentRow: number, currentCol: number) => {
//         if (
//             (currentRow === destination[0] && currentCol === destination[1]) ||
//             (currentRow === start[0] && currentCol === start[1])
//         ) {
//             return;
//         } else {
//             if (dragging) {
//                 if (grid[currentRow][currentCol].wall) {
//                     updateGrid(currentRow, currentCol, "wall", false);
//                 } else {
//                     updateGrid(currentRow, currentCol, "wall", true);
//                 }
//             }
//         }
//     };

//     const updateGrid = (
//         currentRow: number,
//         currentCol: number,
//         attribute: string,
//         bool: boolean
//     ) => {
//         let obj: any;
//         switch (attribute) {
//             case "visited":
//                 obj = { visited: bool ? true : false };
//                 break;
//             case "marked":
//                 obj = { marked: bool ? true : false };
//                 break;
//             case "wall":
//                 obj = { wall: bool ? true : false };
//                 break;
//         }

//         setGrid((prevGrid) =>
//             prevGrid.map((gridRow) =>
//                 gridRow.map((node) =>
//                     node.row === currentRow && node.col === currentCol
//                         ? Object.assign(node, obj)
//                         : node
//                 )
//             )
//         );
//         // this.setState((prevState) => ({
//         //     grid: prevState.grid.map((gridRow) =>
//         //         gridRow.map((node) =>
//         //             node.row === currentRow && node.col === currentCol
//         //                 ? Object.assign(node, obj)
//         //                 : node
//         //         )
//         //     ),
//         // }));
//     };

//     return (
//         <div>
//             <div className="grid">
//                 {grid.map((row, rowIdx) => (
//                     <div key={rowIdx} className="row">
//                         {row.map((cell, colIdx) => (
//                             <div
//                                 className="container"
//                                 key={`container-${rowIdx}-${colIdx}`}
//                             >
//                                 <div
//                                     key={`node-${rowIdx}-${colIdx}`}
//                                     className={evaluateCellClasses(
//                                         rowIdx,
//                                         colIdx,
//                                         grid,
//                                         start,
//                                         destination
//                                     )}
//                                     onMouseDown={() =>
//                                         mouseDown(rowIdx, colIdx)
//                                     }
//                                     onMouseUp={() => mouseUp()}
//                                     onMouseEnter={() =>
//                                         mouseEnter(rowIdx, colIdx)
//                                     }
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//             <button
//                 className="start-button"
//                 onClick={() => onClickStart()}
//                 disabled={running ? true : false}
//             >
//                 Start
//             </button>
//             <button
//                 className="reset-button"
//                 onClick={() => onClickReset()}
//                 disabled={running ? true : false}
//             >
//                 Reset
//             </button>
//         </div>
//     );
// };
