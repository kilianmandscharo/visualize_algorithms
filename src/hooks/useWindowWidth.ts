import { useLayoutEffect, useState } from "react";

export default function useWindowWidth() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth);
        };
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}
