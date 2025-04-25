import {ReactNode, useMemo, useState} from "react";
import {QueryRefetchableContext, QueryRefreshableContextType} from "./QueryRefetchableContext";

export type Props = {
    children: ReactNode
}

export function QueryRefetchableContextProvider({children}: Props) {
    const [trigger, setTrigger] = useState(0)
    const [loadingCounter, setLoadingCounter] = useState(0)

    const broadcastRefetch = () => setTrigger(trigger + 1)

    const increaseLoadingCounter = () => setLoadingCounter((prev) => prev + 1)
    const decreaseLoadingCounter = () => setLoadingCounter((prev) => prev - 1)

    // v2: isLoadingra valamiféle debounce, mert pislog :)
    const values = useMemo(
        () => ({
            trigger,
            broadcastRefetch,
            increaseLoadingCounter,
            decreaseLoadingCounter,
            isLoading: loadingCounter !== 0
        } as QueryRefreshableContextType), [trigger, loadingCounter])

    return (
        <QueryRefetchableContext.Provider value={values}>
            {children}
        </QueryRefetchableContext.Provider>
    );
}