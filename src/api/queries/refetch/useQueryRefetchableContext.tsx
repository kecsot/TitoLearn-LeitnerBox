import {useContext} from "react";
import {QueryRefetchableContext} from "./QueryRefetchableContext";


export const useQueryRefetchableContext = () => {
    const context = useContext(QueryRefetchableContext);
    if (!context) {
        throw new Error("Missing provider for QueryRefetchableContext");
    }
    return context;
};