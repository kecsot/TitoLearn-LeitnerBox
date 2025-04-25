import React from "react";
import CardDetailCard from "../../components/card/CardDetailCard";
import {useGetCardByIdSuspenseQuery} from "../../api/queries/deckCard";
import {useQueryRefetchableContextListener} from "../../api/queries/refetch/useQueryRefetchableContextListener";
import CardPagesCard from "../../components/card/CardPagesCard";

type Props = {
    cardId: number
    deckId: number
    onShowImage: (url: string) => void
}

export default function CardDetailContainer({cardId, deckId, onShowImage}: Props) {

    const query = useGetCardByIdSuspenseQuery({deckId, cardId})
    useQueryRefetchableContextListener([query])

    if (!query.data) return null;

    return (
        <>
            <CardDetailCard
                item={query.data}/>
            <CardPagesCard
                item={query.data}
                onShowImage={onShowImage}/>
        </>
    );
}
