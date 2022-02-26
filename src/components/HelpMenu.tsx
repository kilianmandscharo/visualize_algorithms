import { useState } from "react";
import BackButtonSymbol from "./BackButtonSymbol";

interface HelpMenuProps {
    closeMenu: () => void;
    children: any;
}

export const HelpMenu = (props: HelpMenuProps) => {
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
            className={clicked ? "help-clicked" : "help"}
            onClick={handleClick}
        >
            <BackButtonSymbol />
            {props.children}
        </div>
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
