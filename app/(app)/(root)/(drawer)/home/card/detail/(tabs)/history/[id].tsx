import React from "react";
import CardBoxHistoryListContainer
    from "../../../../../../../../../src/containers/card/history/CardBoxHistoryListContainer";
import {
    ScreenViewQueryBoundaries
} from "../../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type SearchParamType = {
    id: number
    deckId: number
}

export default function Page() {
    const {id, deckId} = useLocalSearchParamsAsNumber<SearchParamType>();

    return (
        <ScreenViewQueryBoundaries>
            <CardBoxHistoryListContainer
                deckId={deckId}
                cardId={id}/>
        </ScreenViewQueryBoundaries>
    );
}