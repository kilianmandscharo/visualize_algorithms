import { Grid } from "./Grid";
import { useState } from "react";
import "../App.css";
import { HelpIcon, MenuIcon } from "../components/icons";
import { breakPoint } from "../constants";
import useWindowWidth from "../hooks/useWindowWidth";
import { HelpMenu, HelpMenuSection } from "../components/HelpMenu";
import {
    SmallBackButton,
    SmallMenu,
    SmallMenuItem,
    SmallMenuSection,
} from "../components/SmallMenu";
import {
    BigBackButton,
    BigMenuItem,
    BigMenuSection,
} from "../components/BigMenu";

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

    const width = useWindowWidth();
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
                <HelpMenu closeMenu={() => setHelpActive(false)}>
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
                <div className="menu">
                    {/* Algorithm Menu */}
                    <BigMenuSection
                        menuName="path-a-menu"
                        menuActive={algoMenu}
                        setObjectMenu={setAlgoMenu}
                        objectType="Algorithms"
                        objectName={algorithm}
                        objectSelected={algoSelected}
                    >
                        {algoMenu &&
                            ["Dijkstra", "A*", "Greedy BFS"].map((name) => (
                                <BigMenuItem
                                    name={name}
                                    setObject={setAlgorithm}
                                    setObjectMenu={setAlgoMenu}
                                    setObjectSelected={setAlgoSelected}
                                />
                            ))}
                    </BigMenuSection>

                    {/* Obstacle menu  */}
                    <BigMenuSection
                        menuName="path-o-menu"
                        menuActive={obsMenu}
                        setObjectMenu={setObsMenu}
                        objectType="Obstacles"
                        objectName={obstacle}
                        objectSelected={obsSelected}
                    >
                        {obsMenu &&
                            ["Wall", "Weight"].map((name) => (
                                <BigMenuItem
                                    name={name}
                                    setObject={setObstacle}
                                    setObjectMenu={setObsMenu}
                                    setObjectSelected={setObsSelected}
                                />
                            ))}
                    </BigMenuSection>

                    {/* Maze menu  */}
                    <BigMenuSection
                        menuName="path-m-menu"
                        menuActive={mazeMenu}
                        setObjectMenu={setMazeMenu}
                        objectType="Mazes"
                        objectName={maze}
                        objectSelected={mazeSelected}
                    >
                        {mazeMenu &&
                            ["Prim", "DFS"].map((name) => (
                                <BigMenuItem
                                    name={name}
                                    setObject={setMaze}
                                    setObjectMenu={setMazeMenu}
                                    setObjectSelected={setMazeSelected}
                                />
                            ))}
                    </BigMenuSection>
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
                    <BigBackButton />
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
                        <SmallMenu closeMenu={() => setSmallMenuActive(false)}>
                            <SmallMenuSection name="Algorithms">
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
                            </SmallMenuSection>
                            <SmallMenuSection name="Obstacles">
                                {["Wall", "Weight"].map((name, i) => (
                                    <SmallMenuItem
                                        i={i}
                                        name={name}
                                        setObject={setObstacle}
                                        setMenu={setSmallMenuActive}
                                        selected={name === obstacle}
                                    />
                                ))}
                            </SmallMenuSection>
                            <SmallMenuSection name="Mazes">
                                {["Prim", "DFS"].map((name, i) => (
                                    <SmallMenuItem
                                        i={i}
                                        name={name}
                                        setObject={setMaze}
                                        setMenu={setSmallMenuActive}
                                        selected={name === maze}
                                    />
                                ))}
                            </SmallMenuSection>
                            <SmallMenuSection name="Actions">
                                <SmallBackButton />
                                <button
                                    className="small-menu-item"
                                    onClick={() => setInterDest(!interDest)}
                                >
                                    {interDest
                                        ? "Remove destination"
                                        : "Add destination"}
                                </button>
                            </SmallMenuSection>
                        </SmallMenu>
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
