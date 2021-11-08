import { useState } from "react";
import { Sudoku } from "./Sudoku";
import "../App.css";
import { BackButton, SmallMenu } from "../UniversalComponents";
import { useWindowSize } from "../Pathfinding/Functional/Functions";
import { MenuIcon } from "../images/icons";
import { breakPoint } from "../constants";

export const Solver = (props: any) => {
    const [animation, setAnimation] = useState(true);
    const [width, height] = useWindowSize();
    const [smallMenuActive, setSmallMenuActive] = useState(false);

    return (
        <div>
            <h1 className="sections-header">
                {width < breakPoint ? "Sudoku" : "Sudoku-Solver"}
            </h1>
            {width >= breakPoint && (
                <div className="menu-section">
                    <button
                        className="menu-button a-button-sudoku"
                        onClick={() => setAnimation(!animation)}
                    >
                        {animation ? "Animation: on" : "Animation: off"}
                    </button>
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
                            <SmallMenu name="Actions">
                                <button
                                    className="small-menu-item"
                                    onClick={() => props.handleClick()}
                                >
                                    Back to menu
                                </button>
                                <button
                                    className="small-menu-item"
                                    onClick={() => setAnimation(!animation)}
                                >
                                    {animation
                                        ? "Animation: on"
                                        : "Animation: off"}
                                </button>
                            </SmallMenu>
                        </div>
                    )}
                </div>
            )}
            <Sudoku animation={animation} />
        </div>
    );
};
