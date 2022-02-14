interface CellProps {
    row: number;
    col: number;
    color: boolean;
    cellValue: number;
    handlePointerDown: (currentRow: number, currentCol: number) => void;
    handlePointerUp: () => void;
    handleMouseEnter: (currentRow: number, currentCol: number) => void;
}

const Cell = ({
    row,
    col,
    color,
    cellValue,
    handlePointerDown,
    handlePointerUp,
    handleMouseEnter,
}: CellProps) => {
    const returnLifecycleColor = (
        lifecycle: number,
        row: number,
        col: number
    ) => {
        let reVal = `${row}-${col} cell`;
        if (color) {
            if (lifecycle === 0) reVal += " dead";
            if (lifecycle === 1) reVal += " first";
            if (lifecycle === 2) reVal += " second";
            if (lifecycle === 3) reVal += " third";
            if (lifecycle === 4) reVal += " fourth";
            if (lifecycle === 5) reVal += " fifth";
            if (lifecycle > 5) reVal += " higher";
            return reVal;
        } else {
            if (lifecycle === 0) {
                reVal += " dead";
            } else {
                reVal += " alive";
            }
            return reVal;
        }
    };
    return (
        <div
            key={col}
            className={returnLifecycleColor(cellValue, row, col)}
            onPointerDown={() => handlePointerDown(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onPointerUp={() => handlePointerUp()}
        ></div>
    );
};

export default Cell;
