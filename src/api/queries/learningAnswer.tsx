import {useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {getLearningAnswerList} from "../http/deckLearningCard";
import {getBaseNextPageParam, getBasePreviousPageParam} from "./util";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const LEARNING_ANSWER_QUERY_KEYS = {
    list: (learningId: number) =>
        ['learning', 'item', learningId, 'answer', 'list'] as const,
}

export const useGetLearningCardAnswerSuspenseInfiniteQuery = (params: {
    learningId: number
}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseInfiniteQuery({
        queryKey: LEARNING_ANSWER_QUERY_KEYS.list(params.learningId),
        queryFn: ({pageParam}) => getLearningAnswerList(params.learningId, pageParam),
        initialPageParam: 1,
        getNextPageParam: getBaseNextPageParam,
        getPreviousPageParam: getBasePreviousPageParam,
        notifyOnChangeProps
    })
}