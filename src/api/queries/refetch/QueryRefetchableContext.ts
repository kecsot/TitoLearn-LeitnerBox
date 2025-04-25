import {createContext} from "react";

export type QueryRefreshableContextType = {
    trigger: number
    broadcastRefetch: () => void
    increaseLoadingCounter: () => void
    decreaseLoadingCounter: () => void
    isLoading: boolean
}

export const QueryRefetchableContext = createContext<QueryRefreshableContextType>({
    trigger: 0,
    broadcastRefetch: () => {},
    increaseLoadingCounter: () => {},
    decreaseLoadingCounter: () => {},
    isLoading: false
});