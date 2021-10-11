import { Sort } from "./Sort";
import { useState } from "react";
import "../App.css";
import {
    BackButton,
    Item,
    MenuPart,
    SmallMenu,
    SmallMenuItem,
} from "../UniversalComponents";
import { useWindowSize } from "../Pathfinding/Functional/Functions";
import { MenuIcon } from "../images/icons";
import { breakPoint } from "../constants";

export const Sorter = (props: any) => {
    const [algorithm, setAlgorithm] = useState("Bubble Sort");
    const [algoMenu, setAlgoMenu] = useState(false);
    const [algoSelected, setAlgoSelected] = useState(false);
    const [smallMenuActive, setSmallMenuActive] = useState(false);

    const [width, height] = useWindowSize();

    return (
        <div className="sorter">
            <h1 className="sections-header">Sorting</h1>
            {width >= breakPoint && (
                <div className="menu-section">
                    <MenuPart
                        menuName="sorter-a-menu"
                        menuActive={algoMenu}
                        setObjectMenu={setAlgoMenu}
                        objectType="Algorithms"
                        objectName={algorithm}
                        objectSelected={algoSelected}
                    >
                        {algoMenu &&
                            [
                                "Bubble Sort",
                                "Gnome Sort",
                                "Selection Sort",
                                "Insertion Sort",
                                "Quick Sort",
                            ].map((name) => (
                                <Item
                                    name={name}
                                    setObject={setAlgorithm}
                                    setObjectMenu={setAlgoMenu}
                                    setObjectSelected={setAlgoSelected}
                                />
                            ))}
                    </MenuPart>
                    <BackButton handleClick={props.handleClick} />
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
                                {[
                                    "Bubble Sort",
                                    "Gnome Sort",
                                    "Selection Sort",
                                    "Insertion Sort",
                                    "Quick Sort",
                                ].map((name) => (
                                    <SmallMenuItem
                                        name={name}
                                        setObject={setAlgorithm}
                                        setMenu={setSmallMenuActive}
                                        selected={name === algorithm}
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
                            </SmallMenu>
                        </div>
                    )}
                </div>
            )}
            <Sort algorithm={algorithm} />
        </div>
    );
};
