import {useSuspenseQuery} from "@tanstack/react-query";
import {getLearningById} from "../http/deckLearningCard";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const LEARNING_QUERY_KEYS = {
    all:
        ['learning'],
    details: () =>
        ['learning', 'item'] as const,
    detail: (learningId: number) =>
        ['learning', 'item', learningId] as const,
}

export const useGetLearningByIdSuspenseQuery = (params: { learningId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: LEARNING_QUERY_KEYS.detail(params.learningId),
        queryFn: () => getLearningById(params.learningId),
        notifyOnChangeProps
    })
}
