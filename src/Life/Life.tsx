import {
    createTheme,
    Typography,
    ThemeProvider,
    Slider,
} from "@material-ui/core";
import { useState } from "react";
import { breakPoint } from "../constants";
import { MenuIcon } from "../images/icons";
import { useWindowSize } from "../Pathfinding/Functional/Functions";
import { BackButton, SmallMenu } from "../UniversalComponents";
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

    const onChangeSpeed = (event: any, newValue: number | number[]) => {
        setSpeed(newValue as number);
    };

    return (
        <div className="game-of-life">
            <h1 className="sections-header">The Game of Life</h1>
            {width >= breakPoint && (
                <div className="menu-section">
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
                            <SmallMenu name="Actions">
                                <button
                                    className="small-menu-item"
                                    onClick={() => props.handleClick()}
                                >
                                    Back to menu
                                </button>
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
