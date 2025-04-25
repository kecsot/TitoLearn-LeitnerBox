import React from "react";
import DeckDetailCard from "../../components/deck/DeckDetailCard";
import {useGetDeckByIdSuspenseQuery} from "../../api/queries/deck";
import {useQueryRefetchableContextListener} from "../../api/queries/refetch/useQueryRefetchableContextListener";


type Props = {
    id: number
}

export default function DeckDetailCardContainer({id}: Props) {

    const query = useGetDeckByIdSuspenseQuery({deckId: id})
    useQueryRefetchableContextListener([query])

    return (
        <>
            {query.data && <DeckDetailCard item={query.data}/>}
        </>
    );
}
