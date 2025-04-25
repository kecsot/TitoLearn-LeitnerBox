import React from "react";
import {CardType} from "../../types";
import CardList from "../../components/card/CardList";
import {useGetCardSuspenseInfiniteQuery} from "../../api/queries/deckCard";
import {useGetLeitnerSystemByIdSuspenseQuery} from "../../api/queries/leitnerSystem";
import {useGetDeckByIdSuspenseQuery} from "../../api/queries/deck";
import {RefreshControl} from "react-native";

type Props = {
    deckId: number
    onItemViewDetailPressed: (item: CardType) => void
}

export default function CardListCardContainer({deckId, onItemViewDetailPressed}: Props) {

    const {data: deck} = useGetDeckByIdSuspenseQuery({deckId})
    const {
        data: cardList,
        isFetching: isCardListFetching,
        isRefetching: isCardListRefetching,
        fetchNextPage: fetchCardNextPage,
        refetch: refetchCardList
    } = useGetCardSuspenseInfiniteQuery({deckId})

    const {
        data: leitner,
        isFetching: isLeitnerSystemFetching,
        refetch: refetchLeitnerSystem,
    } = useGetLeitnerSystemByIdSuspenseQuery({id: deck.leitner_system_id})

    const refetchAll = () => {
        void refetchCardList()
        void refetchLeitnerSystem()
    }

    const paginatedData: CardType[] = (cardList ?? []).pages.map(page => page.data).flat()

    return (
        <CardList
            items={paginatedData}
            onItemViewDetailPressed={onItemViewDetailPressed}
            leitnerSystem={leitner}
            refreshControl={
                <RefreshControl
                    refreshing={isCardListFetching || isLeitnerSystemFetching}
                    onRefresh={refetchAll}/>
            }
            onEndReached={() => {
                if(!isCardListRefetching){
                    return fetchCardNextPage()
                }
            }}
        />
    );
}