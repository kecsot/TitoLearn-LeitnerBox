import {useContext} from "react";
import CardDataGuardContext from "./CardDataGuardContext";

export const useCardDataGuardContext = () => {
    const context = useContext(CardDataGuardContext);
    if (!context) {
        throw new Error("useCardDataGuardContext can only be used inside CardDataGuardProvider");
    }
    return context;
};