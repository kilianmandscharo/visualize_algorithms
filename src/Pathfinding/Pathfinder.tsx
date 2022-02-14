import { Grid } from "./Grid";
import { useState } from "react";
import "../App.css";
import {
    BackButton,
    BackButtonSymbol,
    HelpMenu,
    HelpMenuSection,
    Item,
    MenuPart,
    SmallBackButton,
    SmallMenu,
    SmallMenuItem,
} from "../UniversalComponents";
import { HelpIcon, MenuIcon } from "../images/icons";
import { useWindowSize } from "./Functional/Functions";
import { breakPoint } from "../constants";

const symbols = [
    { name: "Start", color: "#9e1eac", borderRadius: "25%" },
    { name: "Destination", color: "#1eac9e", borderRadius: "25%" },
    { name: "Intermediate dest.", color: "orange", borderRadius: "25%" },
    { name: "Path", color: "rgb(213, 52, 95)", borderRadius: "25%" },
    { name: "Wall", color: "black" },
    { name: "Weight", color: "cyan" },
    { name: "Visited", color: "rgb(81, 215, 134)" },
    { name: "Visited as 2. dest.", color: "rgb(148, 81, 215)" },
];

export const Pathfinder = (props: any) => {
    const [algorithm, setAlgorithm] = useState("Dijkstra");
    const [algoMenu, setAlgoMenu] = useState(false);
    const [algoSelected, setAlgoSelected] = useState(false);
    const [obstacle, setObstacle] = useState("Wall");
    const [obsMenu, setObsMenu] = useState(false);
    const [obsSelected, setObsSelected] = useState(false);
    const [maze, setMaze] = useState("Prim");
    const [mazeMenu, setMazeMenu] = useState(false);
    const [mazeSelected, setMazeSelected] = useState(false);
    const [interDest, setInterDest] = useState(false);

    const [width, height] = useWindowSize();
    const [smallMenuActive, setSmallMenuActive] = useState(false);
    const [helpActive, setHelpActive] = useState(false);

    return (
        <div className="pathfinder">
            <h1 className="sections-header">Pathfinding</h1>
            {/* Help */}
            <button className="help-button" onClick={() => setHelpActive(true)}>
                <HelpIcon />
            </button>
            {helpActive && (
                <HelpMenu setMenuInactive={() => setHelpActive(false)}>
                    <HelpMenuSection name="How to play" twoColumns={false}>
                        <p className="help-explanation-text">
                            Click on and drag the start and destination nodes.
                            Activate an intermediate destination in the menu.
                            Click and drag anywhere else to either draw a wall
                            or a weight, depending on the settings in the
                            obstacle menu. A wall blocks the algorithm, a weight
                            increases the cost for going to that node. You can
                            also generate a maze for the algorithm to traverse.
                            Changing the algorithm for pathfinding as well as
                            for generating the maze happens through the menu.
                        </p>
                        <p className="help-explanation-text">
                            Press "Start" to kick off the animation of the
                            shortest path between the nodes. After the animation
                            has finished, you can drag either of the nodes to
                            update the path and the visited nodes in real time.
                            You can also change the pathfinding-algorithm at
                            that point to see how another algorithm handles the
                            same configuration of nodes and obstacles. Press
                            "Reset" to reset the whole grid.
                        </p>
                    </HelpMenuSection>
                    <HelpMenuSection name="Symbols" twoColumns={true}>
                        {symbols.map((s) => (
                            <div className="help-symbol-container">
                                <div
                                    className="help-symbol-node"
                                    style={{
                                        backgroundColor: s.color,
                                        borderRadius: s.borderRadius,
                                    }}
                                ></div>
                                <p className="help-symbol-name">= {s.name}</p>
                            </div>
                        ))}
                    </HelpMenuSection>
                </HelpMenu>
            )}
            {width >= breakPoint && (
                <div className="menu-section">
                    {/* Algorithm Menu */}
                    <MenuPart
                        menuName="path-a-menu"
                        menuActive={algoMenu}
                        setObjectMenu={setAlgoMenu}
                        objectType="Algorithms"
                        objectName={algorithm}
                        objectSelected={algoSelected}
                    >
                        {algoMenu &&
                            ["Dijkstra", "A*", "Greedy BFS"].map((name) => (
                                <Item
                                    name={name}
                                    setObject={setAlgorithm}
                                    setObjectMenu={setAlgoMenu}
                                    setObjectSelected={setAlgoSelected}
                                />
                            ))}
                    </MenuPart>

                    {/* Obstacle menu  */}
                    <MenuPart
                        menuName="path-o-menu"
                        menuActive={obsMenu}
                        setObjectMenu={setObsMenu}
                        objectType="Obstacles"
                        objectName={obstacle}
                        objectSelected={obsSelected}
                    >
                        {obsMenu &&
                            ["Wall", "Weight"].map((name) => (
                                <Item
                                    name={name}
                                    setObject={setObstacle}
                                    setObjectMenu={setObsMenu}
                                    setObjectSelected={setObsSelected}
                                />
                            ))}
                    </MenuPart>

                    {/* Maze menu  */}
                    <MenuPart
                        menuName="path-m-menu"
                        menuActive={mazeMenu}
                        setObjectMenu={setMazeMenu}
                        objectType="Mazes"
                        objectName={maze}
                        objectSelected={mazeSelected}
                    >
                        {mazeMenu &&
                            ["Prim", "DFS"].map((name) => (
                                <Item
                                    name={name}
                                    setObject={setMaze}
                                    setObjectMenu={setMazeMenu}
                                    setObjectSelected={setMazeSelected}
                                />
                            ))}
                    </MenuPart>
                    <div className="dest-adder">
                        <button
                            className="menu-button inter-dest-button"
                            onClick={() => setInterDest(!interDest)}
                        >
                            {interDest
                                ? "Remove destination"
                                : "Add destination"}
                        </button>
                    </div>
                    <BackButton />
                </div>
            )}
            {width < breakPoint && (
                <div>
                    <button
                        onClick={() => setSmallMenuActive(!smallMenuActive)}
                        className="small-menu-button"
                    >
                        <MenuIcon />
                    </button>

                    {/* Small menu */}
                    {smallMenuActive && (
                        <div
                            onClick={() => setSmallMenuActive(false)}
                            className="small-menu"
                        >
                            <SmallMenu name="Algorithms">
                                {["Dijkstra", "A*", "Greedy BFS"].map(
                                    (name, i) => (
                                        <SmallMenuItem
                                            i={i}
                                            name={name}
                                            setObject={setAlgorithm}
                                            setMenu={setSmallMenuActive}
                                            selected={name === algorithm}
                                        />
                                    )
                                )}
                            </SmallMenu>
                            <SmallMenu name="Obstacles">
                                {["Wall", "Weight"].map((name, i) => (
                                    <SmallMenuItem
                                        i={i}
                                        name={name}
                                        setObject={setObstacle}
                                        setMenu={setSmallMenuActive}
                                        selected={name === obstacle}
                                    />
                                ))}
                            </SmallMenu>
                            <SmallMenu name="Mazes">
                                {["Prim", "DFS"].map((name, i) => (
                                    <SmallMenuItem
                                        i={i}
                                        name={name}
                                        setObject={setMaze}
                                        setMenu={setSmallMenuActive}
                                        selected={name === maze}
                                    />
                                ))}
                            </SmallMenu>
                            <SmallMenu name="Actions">
                                <SmallBackButton />
                                <button
                                    className="small-menu-item"
                                    onClick={() => setInterDest(!interDest)}
                                >
                                    {interDest
                                        ? "Remove destination"
                                        : "Add destination"}
                                </button>
                            </SmallMenu>
                        </div>
                    )}
                </div>
            )}
            <Grid
                algorithm={algorithm}
                obstacle={obstacle}
                maze={maze}
                interDest={interDest}
            />
        </div>
    );
};
