import {createContext} from "react"
import {CardDataGuardVisibility} from "../type";

export type CardDataGuardContextType = {
    visibility: CardDataGuardVisibility,
    setVisibility: (visibility: CardDataGuardVisibility) => void
}

const CardDataGuardContext = createContext<CardDataGuardContextType | null>(null)
export default CardDataGuardContext;