import React, {useEffect, useState} from "react";
import {useGetDeckByIdSuspenseQuery} from "../../../api/queries/deck";
import {
    useCalculateDeckLearningQuery,
    useGetRunningLearningOfDeckSuspenseQuery,
    useStartDeckLearningMutation
} from "../../../api/queries/deckLearning";
import DeckPrepareLearningCard from "../../../components/deck/learn/DeckPrepareLearningCard";
import {LearningCalculationFilters} from "../../../types";
import {useQueryRefetchableContextListener} from "../../../api/queries/refetch/useQueryRefetchableContextListener";


type Props = {
    deckId: number
    onLearningStarted: (learningId: number) => void
}

export default function DeckPrepareLearningCardContainer({deckId, onLearningStarted}: Props) {

    // v2: async storage-ban tárolni az unMount miatt
    const [calculationFilters, setCalculationFilters] = useState<LearningCalculationFilters>({
        thresholdInMinutes: 0
    })

    const deckQuery = useGetDeckByIdSuspenseQuery({deckId})
    const learningQuery = useGetRunningLearningOfDeckSuspenseQuery({deckId})
    const calculateDeckLearningQuery = useCalculateDeckLearningQuery({
        deckId: deckId,
        filters: calculationFilters
    })

    useQueryRefetchableContextListener([deckQuery, learningQuery, calculateDeckLearningQuery])

    const {
        data: learningCalculation,
        isLoading: isCalculateLearningLoading,
        isFetching: isCalculateLearningFetching,
        refetch: refetchCalculation,
    } = calculateDeckLearningQuery;

    const {
        mutateAsync: startLearningMutation,
        isPending: isStartLearningLoading
    } = useStartDeckLearningMutation({
        deckId: deckId,
        filters: calculationFilters
    })

    const handleOnCalculationFiltersChanged = (filters: LearningCalculationFilters) => {
        if(filters.thresholdInMinutes != calculationFilters.thresholdInMinutes){
            setCalculationFilters(filters)
            void refetchCalculation()
        }
    }

    const handleOnStartLearning = () => startLearningMutation().then(result => onLearningStarted(result.id))

    const deck = deckQuery.data
    const learning = learningQuery.data

    if (!deck) return null
    if (learning) return null

    return (
        <DeckPrepareLearningCard
            deck={deck}
            numberOfWillPickedCards={learningCalculation?.count_of_cards_to_learn ?? 0}
            onStartPressed={handleOnStartLearning}
            isStartLearningLoading={isStartLearningLoading}
            onCalculationChanged={handleOnCalculationFiltersChanged}
            isCalculateLearningLoading={isCalculateLearningFetching || isCalculateLearningLoading}
        />
    );
}
