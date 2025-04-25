import {RefreshControl} from "react-native";
import React from "react";
import {useGetCardBoxHistorySuspenseInfiniteQuery} from "../../../api/queries/deckCardBoxHistory";
import {CardBoxHistoryType} from "../../../types";
import ItemSeparatorWithDivider from "../../../components/base/list/ItemSeparatorWithDivider";
import CardBoxHistoryListItem from "../../../components/card/history/CardBoxHistoryListItem";
import BaseFlatList from "../../../components/base/list/BaseFlatList";
import ListEmptyAnimatedCardContent from "../../../components/base/list/ListEmptyAnimatedCardContent";

type Props = {
    cardId: number
    deckId: number
}

export default function CardBoxHistoryListContainer({deckId, cardId}: Props) {

    const {data, isFetching, refetch, fetchNextPage, isRefetching} = useGetCardBoxHistorySuspenseInfiniteQuery({deckId, cardId})

    const paginatedData: CardBoxHistoryType[] = (data.pages ?? []).map(page => page.data).flat()

    return (
        <BaseFlatList
            data={paginatedData}
            ItemSeparatorComponent={ItemSeparatorWithDivider}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
            ListEmptyComponent={<ListEmptyAnimatedCardContent
                description={"There is no history yet!"}
            />}
            renderItem={
                ({item}) => (
                    <CardBoxHistoryListItem
                        item={item}
                    />
                )
            }
            onEndReached={() => {
                if(!isRefetching) return fetchNextPage()
            }}
            onEndReachedThreshold={0.8}
        />
    );
}