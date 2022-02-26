import { useState } from "react";
import { Link } from "react-router-dom";
import BackButtonSymbol from "./BackButtonSymbol";

interface SmallMenuProps {
    children: any;
    closeMenu: () => void;
}

export const SmallMenu = (props: SmallMenuProps) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
            props.closeMenu();
        }, 300);
    };
    return (
        <div
            onClick={handleClick}
            className={clicked ? "small-menu-clicked" : "small-menu"}
        >
            <BackButtonSymbol />
            {props.children}
        </div>
    );
};

interface SmallMenuSectionProps {
    name: string;
    children?: any;
}

export const SmallMenuSection = (props: SmallMenuSectionProps) => {
    return (
        <div className="small-menu-part">
            <p className="small-menu-header">{props.name}</p>
            {props.children}
        </div>
    );
};

interface SmallMenuItemProps {
    i: number;
    name: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selected: boolean;
}

export const SmallMenuItem = (props: SmallMenuItemProps) => {
    return (
        <button
            key={`${props.i} ${props.name}`}
            className={
                props.selected ? "small-menu-item-selected" : "small-menu-item"
            }
            onClick={() => {
                props.setObject(props.name);
                props.setMenu(false);
            }}
        >
            {props.name}
        </button>
    );
};

export const SmallBackButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="small-menu-item">Back to menu</div>
        </Link>
    );
};
