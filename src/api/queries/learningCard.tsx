import {useSuspenseQuery} from "@tanstack/react-query";
import {getLearningCardList} from "../http/deckLearningCard";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

// v2 srv: limit maximum cards per learning to avoid big lists (on srv)
export const useGetLearningCardListSuspenseQuery = (params: { learningId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: ['learning', params.learningId, 'card', 'list'],
        queryFn: () => getLearningCardList(params.learningId),
        notifyOnChangeProps
    })
}