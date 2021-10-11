import React from "react";
// import "./Pathfinder.css";

// const height = 10;
// const width = 20;

// interface Node {
//     row: number;
//     col: number;
//     visited: boolean;
//     distance: number;
//     predecessor: null | Node;
//     marked: boolean;
//     wall: boolean;
// }

// interface State {
//     grid: Node[][];
//     destination: number[];
//     start: number[];
//     iter: any;
//     running: boolean;
//     finished: boolean;
//     dragging: boolean;
// }

// export class Pathfinder extends React.Component<{}, State> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             grid: this.makeGrid(height, width),
//             destination: [5, 17],
//             start: [5, 2],
//             iter: null,
//             running: false,
//             finished: false,
//             dragging: false,
//         };
//     }

//     onClickStartStop = () => {
//         if (this.state.running) {
//             this.setState({ running: false });
//             clearInterval(this.state.iter);
//         } else {
//             let unvisited = this.getUnvisited();
//             const startNode =
//                 this.state.grid[this.state.start[0]][this.state.start[1]];
//             startNode.distance = 0;
//             this.setState({
//                 iter: setInterval(() => this.iteration(unvisited), 10),
//                 running: true,
//             });
//         }
//     };

//     iteration = (unvisited: Node[]) => {
//         if (unvisited.length === 0) {
//             clearInterval(this.state.iter);
//             this.setState({ running: false });
//         }
//         unvisited.sort((a, b) => a.distance - b.distance);
//         const currentNode: any = unvisited.shift();
//         if (currentNode.distance === Infinity) {
//             clearInterval(this.state.iter);
//             this.setState({ running: false });
//         }
//         currentNode.visited = true;
//         if (
//             this.state.grid[this.state.destination[0]][
//                 this.state.destination[1]
//             ].visited
//         ) {
//             console.log("finished");
//             clearInterval(this.state.iter);
//             this.setState({ finished: true, running: false, iter: null });
//             const path = this.getPath(currentNode);
//             setTimeout(() => this.makePath(path), 1200);
//         }
//         this.updateNeighbors(currentNode);
//     };

//     makePath = (path: Node[]) => {
//         for (const currentNode of path) {
//             this.setState((prevState) => ({
//                 grid: prevState.grid.map((gridRow) =>
//                     gridRow.map((node) =>
//                         node.row === currentNode.row &&
//                         node.col === currentNode.col
//                             ? Object.assign(node, { marked: true })
//                             : node
//                     )
//                 ),
//             }));
//         }
//     };

//     getPath = (currentNode: Node) => {
//         const path = [];
//         while (currentNode.predecessor !== null) {
//             path.unshift(currentNode);
//             currentNode = currentNode.predecessor;
//         }
//         return path;
//     };

//     // getMinimumDistanceNode = (unvisitedNodes: Node[]) => {
//     //     let minimum = unvisitedNodes[0];
//     //     for (const node of unvisitedNodes) {
//     //         if (node.distance < minimum.distance) {
//     //             minimum = node;
//     //         }
//     //     }
//     //     console.log(minimum);
//     //     return minimum;
//     // };

//     // removeMinimumDistanceNode = (unvisitedNodes: Node[], currentNode: Node) => {
//     //     unvisitedNodes = unvisitedNodes.filter(
//     //         (node) =>
//     //             node.row !== currentNode.row && node.col !== currentNode.col
//     //     );
//     //     return unvisitedNodes;
//     // };

//     updateNeighbors = (currentNode: Node) => {
//         const row = currentNode.row;
//         const col = currentNode.col;
//         const dis = currentNode.distance;
//         for (let i = -1; i < 2; i++) {
//             for (let j = -1; j < 2; j++) {
//                 if (
//                     i + row < 0 ||
//                     i + row === height ||
//                     j + col < 0 ||
//                     j + col === width ||
//                     Math.abs(i) === Math.abs(j)
//                 ) {
//                     continue;
//                 } else {
//                     this.setState((prevState) => ({
//                         grid: prevState.grid.map((gridRow) =>
//                             gridRow.map((node) =>
//                                 node.visited === false &&
//                                 node.row === row + i &&
//                                 node.col === col + j &&
//                                 !node.wall
//                                     ? Object.assign(node, {
//                                           distance: Math.min(
//                                               node.distance,
//                                               dis + 1
//                                           ),
//                                           predecessor:
//                                               dis + 1 < node.distance
//                                                   ? currentNode
//                                                   : node.predecessor,
//                                       })
//                                     : node
//                             )
//                         ),
//                     }));
//                 }
//             }
//         }
//     };

//     getUnvisited = () => {
//         const unvisited = [];
//         for (let i = 0; i < height; i++) {
//             for (let j = 0; j < width; j++) {
//                 const currentNode = this.state.grid[i][j];
//                 if (!currentNode.visited) {
//                     unvisited.push(currentNode);
//                 }
//             }
//         }
//         return unvisited;
//     };

//     makeGrid = (height: number, width: number) => {
//         const newGrid = [];
//         for (let i = 0; i < height; i++) {
//             const row = [];
//             for (let j = 0; j < width; j++) {
//                 row.push(this.makeNode(i, j));
//             }
//             newGrid.push(row);
//         }
//         return newGrid;
//     };

//     makeNode = (row: number, col: number) => {
//         return {
//             row: row,
//             col: col,
//             visited: false,
//             distance: Infinity,
//             predecessor: null,
//             marked: false,
//             wall: false,
//         };
//     };

//     evaluateCellClasses = (row: number, col: number) => {
//         let reVal = "node";
//         if (
//             row === this.state.destination[0] &&
//             col === this.state.destination[1]
//         ) {
//             reVal += " dest";
//         } else if (row === this.state.start[0] && col === this.state.start[1]) {
//             reVal += " start";
//         } else if (this.state.grid[row][col].wall) {
//             reVal += " wall";
//         } else if (this.state.grid[row][col].visited) {
//             reVal += " visited";
//             if (this.state.grid[row][col].marked) {
//                 reVal += " marked";
//             }
//         }
//         return reVal;
//     };

//     makeWall = (currentRow: number, currentCol: number) => {
//         if (
//             (currentRow === this.state.start[0] &&
//                 currentCol === this.state.start[1]) ||
//             (currentRow === this.state.destination[0] &&
//                 currentCol === this.state.destination[1])
//         ) {
//             return;
//         } else {
//             if (this.state.grid[currentRow][currentCol].wall) {
//                 this.setState((prevState) => ({
//                     grid: prevState.grid.map((gridRow) =>
//                         gridRow.map((node) =>
//                             node.row === currentRow && node.col === currentCol
//                                 ? Object.assign(node, {
//                                       wall: false,
//                                   })
//                                 : node
//                         )
//                     ),
//                 }));
//             } else {
//                 this.setState((prevState) => ({
//                     grid: prevState.grid.map((gridRow) =>
//                         gridRow.map((node) =>
//                             node.row === currentRow && node.col === currentCol
//                                 ? Object.assign(node, {
//                                       wall: true,
//                                   })
//                                 : node
//                         )
//                     ),
//                 }));
//             }
//         }
//     };

//     onClickReset = () => {
//         this.setState({ grid: this.makeGrid(height, width) });
//     };

//     mouseDown = (currentRow: number, currentCol: number) => {
//         this.setState((prevState) => ({
//             dragging: true,
//             grid: prevState.grid.map((gridRow) =>
//                 gridRow.map((node) =>
//                     node.row === currentRow && node.col === currentCol
//                         ? Object.assign(node, { wall: true })
//                         : node
//                 )
//             ),
//         }));
//     };

//     mouseUp = () => {
//         this.setState({ dragging: false });
//     };

//     mouseEnter = (currentRow: number, currentCol: number) => {
//         if (this.state.dragging) {
//             this.setState((prevState) => ({
//                 dragging: true,
//                 grid: prevState.grid.map((gridRow) =>
//                     gridRow.map((node) =>
//                         node.row === currentRow && node.col === currentCol
//                             ? Object.assign(node, { wall: true })
//                             : node
//                     )
//                 ),
//             }));
//         }
//     };

//     render() {
//         return (
//             <div>
//                 <div className="grid">
//                     {this.state.grid.map((row, rowIdx) => (
//                         <div key={rowIdx} className="row">
//                             {row.map((cell, colIdx) => (
//                                 <div
//                                     className="container"
//                                     key={`container-${rowIdx}-${colIdx}`}
//                                 >
//                                     <div
//                                         key={`node-${rowIdx}-${colIdx}`}
//                                         className={this.evaluateCellClasses(
//                                             rowIdx,
//                                             colIdx
//                                         )}
//                                         onMouseDown={() =>
//                                             this.mouseDown(rowIdx, colIdx)
//                                         }
//                                         onMouseUp={() => this.mouseUp()}
//                                         onMouseEnter={() =>
//                                             this.mouseEnter(rowIdx, colIdx)
//                                         }
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     className="start-button"
//                     onClick={() => this.onClickStartStop()}
//                 >
//                     {this.state.running ? "Stop" : "Start"}
//                 </button>
//                 <button
//                     className="reset-button"
//                     onClick={() => this.onClickReset()}
//                     disabled={this.state.running ? true : false}
//                 >
//                     Reset
//                 </button>
//             </div>
//         );
//     }
// }
