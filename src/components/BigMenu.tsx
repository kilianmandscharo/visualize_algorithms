import { Link } from "react-router-dom";

interface BigMenuSectionProps {
    menuName: string;
    menuActive: boolean;
    setObjectMenu: React.Dispatch<React.SetStateAction<boolean>>;
    objectType: string;
    objectName: string;
    objectSelected: boolean;
    children?: any;
}

export const BigMenuSection = (props: BigMenuSectionProps) => {
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

interface BigMenuItemProps {
    name: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    setObjectMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setObjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BigMenuItem = (props: BigMenuItemProps) => {
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

export const BigBackButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <button className="menu-button">Back to menu</button>
        </Link>
    );
};
