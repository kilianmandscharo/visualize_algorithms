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

interface SmallMenuItemProps {
    name: string;
    setObject: React.Dispatch<React.SetStateAction<string>>;
    setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    selected: boolean;
}

export const SmallMenuItem = (props: SmallMenuItemProps) => {
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

export const SmallBackButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="small-menu-item">Back to menu</div>
        </Link>
    );
};

interface HelpMenuSectionProps {
    name: string;
    twoColumns: boolean;
    children: any;
}

export const HelpMenuSection = (props: HelpMenuSectionProps) => {
    return (
        <section className="help-section">
            <p className="help-section-header">{props.name}</p>
            <div
                className="help-section-content"
                style={
                    props.twoColumns ? { gridTemplateColumns: "1fr 1fr" } : {}
                }
            >
                {props.children}
            </div>
        </section>
    );
};

export const BackButtonSymbol = () => {
    return (
        <div className="back-button-symbol">
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    x1="0.646447"
                    y1="18.7886"
                    x2="18.3241"
                    y2="1.11091"
                    stroke="white"
                    strokeOpacity="0.9"
                />
                <line
                    x1="1.35355"
                    y1="0.646447"
                    x2="19.0312"
                    y2="18.3241"
                    stroke="white"
                    strokeOpacity="0.9"
                />
            </svg>
        </div>
    );
};

export default BackButton;
