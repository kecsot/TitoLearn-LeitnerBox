import React from "react";
import {Drawer} from "expo-router/drawer";
import LearningAnswerHistoryListContainer
    from "../../../../../../../../src/containers/learning/deck/history/LearningAnswerHistoryListContainer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import {CardType} from "../../../../../../../../src/types";
import {router} from "expo-router";

type SearchParamsType = {
    id: number
    deckId: number
}

export default function History() {
    const {id, deckId} = useLocalSearchParamsAsNumber<SearchParamsType>();

    const handleOnCardPressed = (item: CardType) => router.push({
        pathname: '/(app)/(root)/(drawer)/home/card/detail/(tabs)/general/[id]',
        params: {
            id: item.id,
            deckId: deckId,
            mutable: 'false'
        }
    })

    return (
        <>
            <Drawer.Screen
                options={{
                    title: `Answers`,
                }}
            />
            <ScreenViewQueryBoundaries>
                <LearningAnswerHistoryListContainer
                    learningId={id}
                    onCardPressed={handleOnCardPressed}/>
            </ScreenViewQueryBoundaries>
        </>
    );
}

