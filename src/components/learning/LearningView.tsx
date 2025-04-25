import {ScrollView} from "react-native";
import React from "react";
import {CardType, LearningAnswer} from "../../types";
import LearningStatisticsHeader, {LearningStatisticsHeaderProps} from "./LearningStatisticsHeader";
import {ActivityIndicator, Divider} from "react-native-paper";
import LearningCardView from "./LearningCardView";
import LearningAnswerButtons from "./LearningAnswerButtons";


type Props = LearningStatisticsHeaderProps & {
    card: CardType
    isAnswering: boolean
    handleOnAnswerPressed: (answer: LearningAnswer, card: CardType) => void
}

export default function LearningView({
                                         card,
                                         isAnswering,
                                         numberOfFinishedCards,
                                         numberOfRemainingCards,
                                         handleOnAnswerPressed,
                                     }: Props) {
    return (
        <>
            <LearningStatisticsHeader
                numberOfFinishedCards={numberOfFinishedCards}
                numberOfRemainingCards={numberOfRemainingCards}/>

            <Divider/>

            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {!isAnswering && (
                    <LearningCardView
                        card={card}/>
                )}
                {isAnswering && (
                    <ActivityIndicator/>
                )}
            </ScrollView>

            <Divider/>

            <LearningAnswerButtons
                isAnswering={isAnswering}
                onAnswerPressed={answer => handleOnAnswerPressed(answer, card)}/>
        </>
    )

}