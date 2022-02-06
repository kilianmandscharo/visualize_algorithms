export interface GridNode {
    row: number;
    col: number;
    visited: boolean;
    visited2: boolean;
    distance: number;
    weight: number;
    predecessor: null | GridNode;
    marked: boolean;
    wall: boolean;
}

export interface GridState {
    grid: GridNode[][];
    dest: number[];
    start: number[];
    interDest: number[];
    running: boolean;
    finished: boolean;
    dragging: boolean;
    startDragging: boolean;
    destDragging: boolean;
    iDestDragging: boolean;
    currentCell: [number, number];
}

export interface GridProps {
    algorithm: string;
    obstacle: string;
    maze: string;
    interDest: boolean;
}

export interface StarNode {
    row: number;
    col: number;
    f: number;
    g: number;
    h: number;
    predecessor: null | StarNode;
    weight: number;
    wall: boolean;
    visited: boolean;
    visited2: boolean;
}

export interface DijkNode {
    row: number;
    col: number;
    distance: number;
    weight: number;
    predecessor: DijkNode | null;
    wall: boolean;
    visited: boolean;
    visited2: boolean;
}
