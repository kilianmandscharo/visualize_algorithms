import { useState } from "react";
import { Sudoku } from "./Sudoku";
import "../App.css";
import { HelpIcon, MenuIcon } from "../components/icons";
import { breakPoint } from "../constants";
import useWindowWidth from "../hooks/useWindowWidth";
import { HelpMenu, HelpMenuSection } from "../components/HelpMenu";
import { BigBackButton } from "../components/BigMenu";
import {
  SmallBackButton,
  SmallMenu,
  SmallMenuSection,
} from "../components/SmallMenu";

export const Solver = () => {
  const [animation, setAnimation] = useState(true);
  const width = useWindowWidth();
  const [smallMenuActive, setSmallMenuActive] = useState(false);
  const [helpActive, setHelpActive] = useState(false);

  return (
    <div className="sudoku-solver">
      <h1 className="sections-header">
        {width < breakPoint ? "Sudoku" : "Sudoku-Solver"}
      </h1>
      {/* Help */}
      <button className="help-button" onClick={() => setHelpActive(true)}>
        <HelpIcon />
      </button>
      {helpActive && (
        <HelpMenu closeMenu={() => setHelpActive(false)}>
          <HelpMenuSection name="Explanation" twoColumns={false}>
            <p className="help-explanation-text">
              A sudoku is a logical riddle, in which you have to complete a 9 by
              9 grid, where each number between 1 and 9 is allowed exactly once
              in each row, column or block.
            </p>
          </HelpMenuSection>
          <HelpMenuSection name="How to play" twoColumns={false}>
            <p className="help-explanation-text">
              Enter the starting numbers of any sudoku and press "Start" to see
              how the backtracking-algorithm solves the sudoku with lightning
              speed. "Reset" to the starting numbers you entered and "Clear" for
              an empty grid. Be careful, a hard sudoku can require so many steps
              to solve, that it is recommended to turn off the animation in the
              menu, meaning that you just get the result the algorithm comes up
              with instead of a step by step animation.
            </p>
          </HelpMenuSection>
        </HelpMenu>
      )}
      {width >= breakPoint && (
        <div className="menu">
          <button
            className="menu-button a-button-sudoku"
            onClick={() => setAnimation(!animation)}
          >
            {animation ? "Animation: on" : "Animation: off"}
          </button>
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
          {smallMenuActive && (
            <SmallMenu closeMenu={() => setSmallMenuActive(false)}>
              <SmallMenuSection name="Actions">
                <SmallBackButton />
                <button
                  className="small-menu-item"
                  onClick={() => setAnimation(!animation)}
                >
                  {animation ? "Animation: on" : "Animation: off"}
                </button>
              </SmallMenuSection>
            </SmallMenu>
          )}
        </div>
      )}
      <Sudoku animation={animation} />
    </div>
  );
};
