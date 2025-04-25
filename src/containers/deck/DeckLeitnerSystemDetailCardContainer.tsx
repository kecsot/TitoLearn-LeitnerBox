import React from "react";
import {useGetDeckByIdSuspenseQuery} from "../../api/queries/deck";
import {useGetLeitnerSystemByIdSuspenseQuery} from "../../api/queries/leitnerSystem";
import {LeitnerSystemDetailCard} from "../../components/leitner/LeitnerSystemDetailCard";
import {useQueryRefetchableContextListener} from "../../api/queries/refetch/useQueryRefetchableContextListener";


type Props = {
    deckId: number
    onEdit: (id: number) => void
}

export default function DeckLeitnerSystemDetailCardContainer({deckId, onEdit}: Props) {

    const deckQuery = useGetDeckByIdSuspenseQuery({deckId})
    const leitnerSystemQuery = useGetLeitnerSystemByIdSuspenseQuery({id: deckQuery.data.leitner_system_id})

    useQueryRefetchableContextListener([deckQuery, leitnerSystemQuery])

    const leitnerSystem = leitnerSystemQuery.data

    return (
        <>
            {leitnerSystem && <LeitnerSystemDetailCard
                item={leitnerSystem}
                onEdit={onEdit}
            />}
        </>
    );
}
