import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getLearningCardWithAnswerStatsList, postAnswer} from "../http/deckLearningCard";
import {CardWithAnswerStats, LearningAnswer} from "../../types";
import {produce} from "immer";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const LEARNING_CARDS_WITH_ANSWER_QUERY_KEYS = {
    list: (learningId: number) =>
        ['learning', learningId, 'card-with-answer-stats', 'list'] as const,

}

export const useGetLearningCardWithAnswerStatsListSuspenseQuery = (params: { learningId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()
    return useSuspenseQuery({
        queryKey: LEARNING_CARDS_WITH_ANSWER_QUERY_KEYS.list(params.learningId),
        queryFn: () => getLearningCardWithAnswerStatsList(params.learningId),
        notifyOnChangeProps
    })
}

export const useAnswerCardInLearningMutation = (params: { learningId: number, deckId: number }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (args: {
            cardId: number,
            answer: LearningAnswer
        }) => postAnswer(params.learningId, args.cardId, args.answer),
        onSettled: (newData) => {
            if (newData) {

                const queryKey = LEARNING_CARDS_WITH_ANSWER_QUERY_KEYS.list(params.learningId);
                queryClient.setQueryData<CardWithAnswerStats[] | undefined>(queryKey, (data) => {
                    return data?.map(item => {
                        return produce(item, (draft) => {
                            if (item.card.id == newData.card_id) {
                                if (newData.answer === LearningAnswer.KNOW) draft.answers_stats.know += 1
                                if (newData.answer === LearningAnswer.DONT_KNOW) draft.answers_stats.dont_know += 1
                                if (newData.answer === LearningAnswer.REPEAT) draft.answers_stats.repeat += 1
                            }
                        })
                    })
                })
            }
        }
    })
}