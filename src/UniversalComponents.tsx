import { Link } from "react-router-dom";

interface ItemProps {
    name: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    setObjectMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setObjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Item = (props: ItemProps) => {
    return (
        <button
            key={props.name}
            className="item"
            onClick={() => {
                props.setObject(props.name);
                props.setObjectMenu(false);
                props.setObjectSelected(true);
            }}
        >
            {props.name}
        </button>
    );
};

interface MenuProps {
    menuName: string;
    menuActive: boolean;
    setObjectMenu: React.Dispatch<React.SetStateAction<boolean>>;
    objectType: string;
    objectName: string;
    objectSelected: boolean;
    children?: any;
}

export const MenuPart = (props: MenuProps) => {
    return (
        <div className={`menu-part ${props.menuName}`}>
            <button
                className="menu-button"
                onClick={() => props.setObjectMenu(!props.menuActive)}
            >
                {!props.objectSelected
                    ? props.objectType
                    : props.menuActive
                    ? props.objectType
                    : props.objectName}
                <div
                    className="arrow"
                    style={{
                        transform: props.menuActive
                            ? "rotate(-90deg)"
                            : "rotate(0deg)",
                    }}
                />
            </button>
            {props.children}
        </div>
    );
};

interface SmallMenuItem {
    name: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selected: boolean;
}

export const SmallMenuItem = (props: SmallMenuItem) => {
    return (
        <button
            key={props.name}
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

interface SmallMenuProps {
    name: string;
    children?: any;
}

export const SmallMenu = (props: SmallMenuProps) => {
    return (
        <div className="small-menu-part">
            <p className="small-menu-header">{props.name}</p>
            {props.children}
        </div>
    );
};

export const BackButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <button className="menu-button">Back to menu</button>
        </Link>
    );
};
