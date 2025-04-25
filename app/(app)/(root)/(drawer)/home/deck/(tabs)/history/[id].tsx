import {useRouter} from "expo-router";
import React from "react";
import {LearningType} from "../../../../../../../../src/types";
import LearningDeckHistoryListContainer
    from "../../../../../../../../src/containers/learning/deck/history/LearningDeckHistoryListContainer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../../../../../src/components/base/ScreenView";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type SearchParamsType = {
    id: number
}

export default function History() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnViewLearningHistoryDetail = (learning: LearningType) => router.push({
        pathname: "/(app)/(root)/(drawer)/home/learning/history/answers/[id]",
        params: {
            id: learning.id,
            deckId: id
        }
    })

    return (
        <ScreenView
            fullHeight
            forFlatList>
            <ScreenViewQueryBoundaries>
                <LearningDeckHistoryListContainer
                    deckId={id}
                    onItemPressed={handleOnViewLearningHistoryDetail}/>
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}

