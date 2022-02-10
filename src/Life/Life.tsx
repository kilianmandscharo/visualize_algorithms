import {
    createTheme,
    Typography,
    ThemeProvider,
    Slider,
} from "@material-ui/core";
import { useState } from "react";
import { breakPoint } from "../constants";
import { HelpIcon, MenuIcon } from "../images/icons";
import { useWindowSize } from "../Pathfinding/Functional/Functions";
import {
    BackButton,
    BackButtonSymbol,
    HelpMenu,
    HelpMenuSection,
    SmallBackButton,
    SmallMenu,
} from "../UniversalComponents";
import { Grid } from "./Grid";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3d405b",
        },
        secondary: {
            main: "#823038",
        },
    },
});

export const Life = (props: any) => {
    const [speed, setSpeed] = useState(5);
    const [width, height] = useWindowSize();
    const [smallMenuActive, setSmallMenuActive] = useState(false);
    const [helpActive, setHelpActive] = useState(false);

    const onChangeSpeed = (event: any, newValue: number | number[]) => {
        setSpeed(newValue as number);
    };

    return (
        <div className="game-of-life">
            <h1 className="sections-header">
                {width < breakPoint ? "Game of Life" : "The Game of Life"}
            </h1>
            {/* Help */}
            <button className="help-button" onClick={() => setHelpActive(true)}>
                <HelpIcon />
            </button>
            {helpActive && (
                <HelpMenu setMenuInactive={() => setHelpActive(false)}>
                    <HelpMenuSection name="Explanation" twoColumns={false}>
                        <p className="help-explanation-text">
                            John Conway's Game of Life is a two-dimensional
                            cellular automaton, and demonstrates how complex
                            behavior can emerge from a simple set of elements
                            and rules, by which these elements behave. Conway's
                            Game of Life is Turing complete.
                        </p>
                    </HelpMenuSection>
                    <HelpMenuSection name="How to play" twoColumns={false}>
                        <p className="help-explanation-text">
                            Draw a certain shape on the grid and watch how your
                            creation behaves by pressing "Start". Pressing
                            "Fill" will fill the grid randomly with cells.
                            "Color" makes the cells colorful, with a cell, up to
                            a certain point, getting darker the longer it lives.
                            "Reset" resets the board to the state before you
                            pressed "Start", and "Clear" gives you an empty
                            grid.
                        </p>
                    </HelpMenuSection>
                    <HelpMenuSection name="Rules" twoColumns={false}>
                        <p className="help-explanation-text">
                            If a cell is dead (white cell), it is reborn in the
                            next cycle if it is surrounded exactly by three
                            living cells.
                        </p>
                        <p className="help-explanation-text">
                            If a cell is alive (black or green) and has less
                            than two or more than three living neighbors, it
                            dies in the next cycle.
                        </p>
                        <p className="help-explanation-text">
                            Thus, a living cell with two or three living
                            neighbor cells survives.
                        </p>
                    </HelpMenuSection>
                </HelpMenu>
            )}
            {width >= breakPoint && (
                <div className="menu-section">
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
                                <SmallBackButton />
                                <div className="small-menu-sp-slider-life">
                                    <ThemeProvider theme={theme}>
                                        <Typography id="small-menu-speed-slider-life">
                                            Speed
                                        </Typography>
                                        <Slider
                                            min={4}
                                            max={14}
                                            defaultValue={10}
                                            aria-labelledby="small-menu-speed-slider-life"
                                            onChangeCommitted={onChangeSpeed}
                                            orientation="vertical"
                                        />
                                    </ThemeProvider>
                                </div>
                            </SmallMenu>
                        </div>
                    )}
                </div>
            )}
            <Grid speed={speed} />
            {width >= breakPoint && (
                <div className="sp-slider-life">
                    <ThemeProvider theme={theme}>
                        <Typography id="speed-slider-life">Speed</Typography>
                        <Slider
                            min={4}
                            max={14}
                            defaultValue={10}
                            aria-labelledby="speed-slider-life"
                            onChangeCommitted={onChangeSpeed}
                        />
                    </ThemeProvider>
                </div>
            )}
        </div>
    );
};
