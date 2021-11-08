import { Grid } from "./Grid";
import { useState } from "react";
import "../App.css";
import {
    BackButton,
    Item,
    MenuPart,
    SmallMenu,
    SmallMenuItem,
} from "../UniversalComponents";
import { MenuIcon } from "../images/icons";
import { useWindowSize } from "./Functional/Functions";
import { breakPoint } from "../constants";

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

    return (
        <div className="pathfinder">
            <h1 className="sections-header">Pathfinding</h1>
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
                    {smallMenuActive && (
                        <div
                            onClick={() => setSmallMenuActive(false)}
                            className="small-menu"
                        >
                            <SmallMenu name="Algorithms">
                                {["Dijkstra", "A*", "Greedy BFS"].map(
                                    (name) => (
                                        <SmallMenuItem
                                            name={name}
                                            setObject={setAlgorithm}
                                            setMenu={setSmallMenuActive}
                                            selected={name === algorithm}
                                        />
                                    )
                                )}
                            </SmallMenu>
                            <SmallMenu name="Obstacles">
                                {["Wall", "Weight"].map((name) => (
                                    <SmallMenuItem
                                        name={name}
                                        setObject={setObstacle}
                                        setMenu={setSmallMenuActive}
                                        selected={name === obstacle}
                                    />
                                ))}
                            </SmallMenu>
                            <SmallMenu name="Mazes">
                                {["Prim", "DFS"].map((name) => (
                                    <SmallMenuItem
                                        name={name}
                                        setObject={setMaze}
                                        setMenu={setSmallMenuActive}
                                        selected={name === maze}
                                    />
                                ))}
                            </SmallMenu>
                            <SmallMenu name="Actions">
                                <button
                                    className="small-menu-item"
                                    onClick={() => props.handleClick()}
                                >
                                    Back to menu
                                </button>
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
