import {useContext, useEffect} from "react";
import {QueryRefetchableContext} from "./QueryRefetchableContext";
import {UseQueryResult, UseSuspenseQueryResult} from "@tanstack/react-query";

export function useQueryRefetchableContextListener(queries: (UseQueryResult|UseSuspenseQueryResult)[]) {
    const context = useContext(QueryRefetchableContext)


    const handleRefetch = () => {
        queries.forEach(query => {
            context.increaseLoadingCounter()
            query.refetch()
                .then(() => context.decreaseLoadingCounter())
                .catch(() => context.decreaseLoadingCounter())
        })
    }

    useEffect(() => {
        if (context.trigger !== 0) {
            handleRefetch();
        }
    }, [context.trigger]);

}