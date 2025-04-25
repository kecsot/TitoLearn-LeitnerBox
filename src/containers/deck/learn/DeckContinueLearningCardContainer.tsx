import React from "react";
import {
    useCancelDeckLearningMutation,
    useGetRunningLearningOfDeckSuspenseQuery
} from "../../../api/queries/deckLearning";
import DeckContinueLearningCard from "../../../components/deck/learn/DeckContinueLearningCard";
import {useQueryRefetchableContextListener} from "../../../api/queries/refetch/useQueryRefetchableContextListener";
import {useGetDeckByIdSuspenseQuery} from "../../../api/queries/deck";


type Props = {
    deckId: number
    onLearningStarted: (learningId: number) => void
}

export default function DeckContinueLearningCardContainer({deckId, onLearningStarted}: Props) {
    const query = useGetRunningLearningOfDeckSuspenseQuery({deckId})
    const deckQuery = useGetDeckByIdSuspenseQuery({deckId})
    const {mutateAsync: cancelLearningMutation, isPending: isCancelPending} = useCancelDeckLearningMutation({deck: deckQuery.data})

    useQueryRefetchableContextListener([query, deckQuery])

    const learning = query.data
    if (!learning) return null

    const handleOnContinueLearning = () => onLearningStarted(learning.id)

    const handleOnCancelLearning = () => cancelLearningMutation({learningId: learning.id})

    return (
        <DeckContinueLearningCard
            learning={learning}
            onContinuePressed={handleOnContinueLearning}
            onCancelPressed={handleOnCancelLearning}
            isCancelLoading={isCancelPending}
        />
    );
}
