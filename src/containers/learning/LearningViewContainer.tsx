import React, {useState} from "react";
import {useGetLearningByIdSuspenseQuery} from "../../api/queries/learning";
import {
    useAnswerCardInLearningMutation,
    useGetLearningCardWithAnswerStatsListSuspenseQuery
} from "../../api/queries/learningCardsWithAnswer";
import {useGetDeckByIdSuspenseQuery} from "../../api/queries/deck";
import {useFinishDeckLearningMutation} from "../../api/queries/deckLearning";
import {AnswerType, CardType, LearningAnswer} from "../../types";
import LearningView from "../../components/learning/LearningView";


type Props = {
    learningId: number,
    onFinished: VoidFunction
}

export default function LearningViewContainer({learningId, onFinished}: Props) {

    const {data: learning} = useGetLearningByIdSuspenseQuery({learningId})
    const {data: cardsWithAnswerStats} = useGetLearningCardWithAnswerStatsListSuspenseQuery({learningId})
    const {data: deck} = useGetDeckByIdSuspenseQuery({deckId: learning.deck_id})

    const {mutateAsync: answerCardInLearningMutation, isPending: isAnswerLoading} = useAnswerCardInLearningMutation({
        learningId,
        deckId: deck?.id!
    })
    const {mutateAsync: finishLearningMutation} = useFinishDeckLearningMutation({deck: deck})

    const cardsToLearn = cardsWithAnswerStats?.filter(item => item.answers_stats.know === 0) ?? []
    const [index, setIndex] = useState(0)
    const currentCardWithStats = cardsToLearn.at(index)

    /**
     * Return with a boolean (is there any next move?)
     * @param answer
     */
    const calculateNextIndex = (answer: AnswerType) => {
        const isKnownAnswer = answer.answer === LearningAnswer.KNOW
        const isThereMoreCardToLearn = cardsToLearn.length !== 0
        const isLastKnownStep = isKnownAnswer && (cardsToLearn.length === 1);

        if (!isThereMoreCardToLearn || isLastKnownStep) {
            return false;
        } else {
            let nextIndex = 0;

            if (isKnownAnswer) {
                if (index === cardsToLearn.length) {
                    nextIndex = 0;
                }
            } else {
                if ((index + 1) < cardsToLearn.length) {
                    nextIndex = index + 1;
                }
            }
            setIndex(nextIndex)
        }
        return true;
    }

    const handleOnAnswerPressed = (answer: LearningAnswer, card: CardType) =>
        answerCardInLearningMutation({
            cardId: card.id,
            answer
        })
            .then((answer) => calculateNextIndex(answer))
            .then((isThereMoreAnswer) => {
                if (!isThereMoreAnswer) {
                    return finishLearningMutation().then(() => onFinished())
                }
            })

    const countOfRemainingCards = cardsToLearn.length ?? 0
    const countOfFinishedCards = (cardsWithAnswerStats?.length ?? 0) - countOfRemainingCards

    if (!currentCardWithStats) return null

    return (
        <LearningView
            numberOfRemainingCards={countOfRemainingCards}
            numberOfFinishedCards={countOfFinishedCards}
            card={currentCardWithStats.card}
            isAnswering={isAnswerLoading}
            handleOnAnswerPressed={handleOnAnswerPressed}/>
    )

}