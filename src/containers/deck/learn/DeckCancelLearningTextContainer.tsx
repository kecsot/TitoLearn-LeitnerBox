import React from "react";
import {
    useCancelDeckLearningMutation,
    useGetRunningLearningOfDeckSuspenseQuery
} from "../../../api/queries/deckLearning";
import DeckContinueLearningCard from "../../../components/deck/learn/DeckContinueLearningCard";
import {useQueryRefetchableContextListener} from "../../../api/queries/refetch/useQueryRefetchableContextListener";
import {useGetDeckByIdSuspenseQuery} from "../../../api/queries/deck";
import {Button, Dialog, PaperProvider, Portal, Text} from "react-native-paper";
import {useGetLearningByIdSuspenseQuery} from "../../../api/queries/learning";
import {useGetLearningCardWithAnswerStatsListSuspenseQuery} from "../../../api/queries/learningCardsWithAnswer";
import {View} from "react-native";


type Props = {
    learningId: number
    onCancelFinished: VoidFunction
}

export default function DeckCancelLearningTextContainer({learningId, onCancelFinished}: Props) {

    const learningQuery = useGetLearningByIdSuspenseQuery({learningId})
    const deckQuery = useGetDeckByIdSuspenseQuery({deckId: learningQuery.data.deck_id})
    const {mutateAsync: cancelLearningMutation, isPending: isCancelPending} = useCancelDeckLearningMutation({deck: deckQuery.data})

    useQueryRefetchableContextListener([deckQuery, learningQuery])

    const handleOnCancelLearning = () =>
        cancelLearningMutation({learningId})
            .then(onCancelFinished)

    if(!deckQuery.data.running_learning_id){
        return null
    }

    return (
        <Text onPress={handleOnCancelLearning} disabled={isCancelPending}>Cancel learning</Text>
    );
}
