import React from "react";
import { bubbleSort } from "./Algorithms/bubbleSort";
import { selectionSort } from "./Algorithms/selectionSort";
import { quickSort } from "./Algorithms/quickSort";
import "../App.css";
import { insertionSort } from "./Algorithms/insertionsSort";
import { gnomeSort } from "./Algorithms/gnomeSort";
import {
  calculateBarsFromHeight,
  calculateBarsFromWidth,
} from "./Functional/functions";
import { breakPoint, maxWidth } from "../constants";
import { ThemeProvider, createTheme, Typography, Slider } from "@mui/material";

export class Sort extends React.Component<
  {
    algorithm: string;
  },
  {
    numbers: number[];
    running: boolean;
    speed: number;
    width: number;
    smallSize: boolean;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      numbers: this.shuffle(
        this.makeArray(
          window.innerWidth < breakPoint
            ? calculateBarsFromHeight(window.innerHeight)
            : calculateBarsFromWidth(window.innerWidth),
        ),
      ),
      running: false,
      speed: 20,
      width: window.innerWidth,
      smallSize: window.innerWidth < breakPoint ? true : false,
    };
  }

  updateDimensions = () => {
    const width = window.innerWidth;
    if (width > breakPoint && width < maxWidth) {
      this.setState({
        numbers: this.shuffle(this.makeArray(calculateBarsFromWidth(width))),
        width: width,
      });
    }
    if (this.state.smallSize && width >= breakPoint) {
      this.setState({
        smallSize: false,
        width: width,
      });
    }
    if (!this.state.smallSize && width < breakPoint) {
      this.setState({
        smallSize: true,
        numbers: this.shuffle(
          this.makeArray(calculateBarsFromHeight(window.innerHeight)),
        ),
        width: width,
      });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  makeArray = (length: number) => {
    const reVal = [];
    for (let i = 1; i < length; i++) {
      reVal.push(i / 10);
    }
    return reVal;
  };

  shuffle = (numbers: number[]) => {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = x;
    }
    return numbers;
  };

  start = () => {
    this.setState({ running: true });
    let iterations: any;
    if (this.props.algorithm === "Bubble Sort") {
      iterations = bubbleSort(this.state.numbers);
    } else if (this.props.algorithm === "Gnome Sort") {
      iterations = gnomeSort(this.state.numbers);
    } else if (this.props.algorithm === "Selection Sort") {
      iterations = selectionSort(this.state.numbers);
    } else if (this.props.algorithm === "Quick Sort") {
      iterations = quickSort(this.state.numbers);
    } else if (this.props.algorithm === "Insertion Sort") {
      iterations = insertionSort(this.state.numbers);
    }
    let i = 0;
    const iter = setInterval(() => {
      if (i === iterations.length - 1 || !this.state.running) {
        clearInterval(iter);
        this.setState({ running: false });
      } else {
        this.setState(() => ({ numbers: iterations[i] }));
        i++;
      }
    }, 55 - this.state.speed);
  };

  onChangeSpeed = (_: any, newValue: number | number[]) => {
    this.setState(() => ({ speed: newValue as number }));
  };

  theme = createTheme({
    palette: {
      primary: {
        main: "#3d405b",
      },
      secondary: {
        main: "#823038",
      },
    },
  });

  render() {
    return (
      <div className="sort-section">
        <div className="bar-section">
          {this.state.numbers.map((cell, idx) => (
            <div
              key={idx}
              className="bar"
              style={
                this.state.smallSize
                  ? {
                      width: (cell * window.innerWidth) / 9.8,
                    }
                  : { height: cell * 25 }
              }
            ></div>
          ))}
        </div>
        <div className="sp-slider-sorter">
          <ThemeProvider theme={this.theme}>
            <Typography id="speed-slider-sorter">Speed</Typography>
            <Slider
              min={1}
              max={45}
              defaultValue={20}
              aria-labelledby="speed-slider-sort"
              onChangeCommitted={this.onChangeSpeed}
              disabled={this.state.running}
            />
          </ThemeProvider>
        </div>
        <div className="button-section">
          <button
            className="button"
            onClick={() => this.start()}
            disabled={this.state.running}
          >
            Start
          </button>
          <button
            className="button"
            onClick={() => this.setState(() => ({ running: false }))}
            disabled={!this.state.running}
          >
            Stop
          </button>
          <button
            className="button"
            onClick={() =>
              this.setState(() => ({
                numbers: this.shuffle(
                  this.makeArray(
                    window.innerWidth < breakPoint
                      ? calculateBarsFromHeight(window.innerHeight)
                      : calculateBarsFromWidth(window.innerWidth),
                  ),
                ),
              }))
            }
            disabled={this.state.running}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}
