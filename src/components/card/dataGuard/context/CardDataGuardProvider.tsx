import {ReactNode, useMemo, useState} from "react";
import CardDataGuardContext, {CardDataGuardContextType} from "./CardDataGuardContext";
import {CardDataGuardVisibility} from "../type";

export type Props = {
    children: ReactNode
}

export function CardDataGuardProvider({children}: Props) {
    const [visibility, setVisibility] = useState(CardDataGuardVisibility.HIDDEN)

    const value = useMemo(
        () => ({
            visibility,
            setVisibility
        } as CardDataGuardContextType), [visibility])

    return (
        <CardDataGuardContext.Provider value={value}>
            {children}
        </CardDataGuardContext.Provider>
    );
}