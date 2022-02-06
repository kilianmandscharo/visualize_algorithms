import { Sort } from "./Sort";
import { useState } from "react";
import "../App.css";
import {
    BackButton,
    BackButtonSymbol,
    HelpMenuSection,
    Item,
    MenuPart,
    SmallBackButton,
    SmallMenu,
    SmallMenuItem,
} from "../UniversalComponents";
import { useWindowSize } from "../Pathfinding/Functional/Functions";
import { HelpIcon, MenuIcon } from "../images/icons";
import { breakPoint } from "../constants";

export const Sorter = (props: any) => {
    const [algorithm, setAlgorithm] = useState("Bubble Sort");
    const [algoMenu, setAlgoMenu] = useState(false);
    const [algoSelected, setAlgoSelected] = useState(false);
    const [smallMenuActive, setSmallMenuActive] = useState(false);
    const [helpActive, setHelpActive] = useState(false);

    const [width, height] = useWindowSize();

    return (
        <div className="sorter">
            <h1 className="sections-header">Sorting</h1>
            {/* Help */}
            <button className="help-button" onClick={() => setHelpActive(true)}>
                <HelpIcon />
            </button>
            {helpActive && (
                <div className="help" onClick={() => setHelpActive(false)}>
                    <BackButtonSymbol />
                    <HelpMenuSection name="How to play" twoColumns={false}>
                        <p className="help-explanation-text">
                            This part of the application demonstrates five
                            different sorting algorithms. Select the algorithm
                            through the menu, adjust the speed with the silder
                            and hit "Start" to start the animation.
                        </p>
                        <p className="help-explanation-text">
                            You can pause and then continue the animation or
                            reset to the beginning for a fresh start.
                        </p>
                    </HelpMenuSection>
                    <HelpMenuSection name="Algorithms" twoColumns={false}>
                        <p className="help-explanation-subheader">
                            Bubble Sort:
                        </p>
                        <p className="help-explanation-text">
                            The algorithm goes from one side to the other
                            repeatedly, constantly comparing the current number
                            with its right neighbor. If the number is bigger,
                            they change places. The next cycle goes only to the
                            second to last number, because the largest number
                            already reached the outermost place, etc.
                        </p>
                        <p className="help-explanation-subheader">
                            Gnome Sort:
                        </p>
                        <p className="help-explanation-text">
                            The algorithm is at the two leftmost numbers and
                            compares them. If the left one is already smaller,
                            it takes a step to the right. If not, the numbers
                            change places and the algorithm goes one step to the
                            left. Upon reaching the left side, the algorithms
                            goes one step to the right. If the algorithm reaches
                            the rightmost number, the sorting has finished.
                        </p>
                        <p className="help-explanation-subheader">
                            Selection Sort:
                        </p>
                        <p className="help-explanation-text">
                            The algorithm takes the smallest number in the array
                            and places it at the beginning. Then it takes the
                            smallest number in the array, except for the already
                            selected one, and places it in the second spot. This
                            ist repeated until the whole array is sorted.
                        </p>
                        <p className="help-explanation-subheader">
                            Insertion Sort:
                        </p>
                        <p className="help-explanation-text">
                            The sorting algorithm goes through the array step by
                            step. Each number is inserted into the correct spot
                            among the already visited numbers, meaning the array
                            between the insertion spot and the spot from where
                            the number was taken is shifted one to the right.
                        </p>
                        <p className="help-explanation-subheader">
                            Quick Sort:
                        </p>
                        <p className="help-explanation-text">
                            This algorithm splits the array into two lists, by
                            selecting a pivot-element and placing all numbers,
                            which are smaller than this element, on the left
                            side of the list, numbers bigger than the pivot end
                            up on the right side. Then each side of the list
                            gets recursively passed into the quick-sort
                            function, and so on, until all numbers are correctly
                            sorted.
                        </p>
                    </HelpMenuSection>
                </div>
            )}
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
                                <SmallBackButton />
                            </SmallMenu>
                        </div>
                    )}
                </div>
            )}
            <Sort algorithm={algorithm} />
        </div>
    );
};
