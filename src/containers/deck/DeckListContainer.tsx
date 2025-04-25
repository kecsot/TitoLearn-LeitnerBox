import {RefreshControl} from "react-native";
import React from "react";
import {DeckType} from "../../types";
import {useGetDeckSuspenseInfiniteQuery} from "../../api/queries/deck";
import ListEmptyAnimatedCardContent from "../../components/base/list/ListEmptyAnimatedCardContent";
import DeckListItem from "../../components/deck/DeckListItem";
import BaseFlatList from "../../components/base/list/BaseFlatList";

type Props = {
    onItemViewDetailPressed: (item: DeckType) => void
}

export default function DeckListContainer({onItemViewDetailPressed}: Props) {
    const {data, isFetching, refetch, fetchNextPage, isRefetching} = useGetDeckSuspenseInfiniteQuery()

    const paginatedData: DeckType[] = data.pages.flatMap(page => page.data)

    return (
        <BaseFlatList
            data={paginatedData ?? []}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
            ListEmptyComponent={<ListEmptyAnimatedCardContent
                title={"Welcome!"}
                description={"This is the deck list, where you can find your decks. You can press the plus icon in the right top to create your first deck!"}
            />}
            renderItem={({item}) =>
                <DeckListItem
                    item={item}
                    onViewDetailPressed={() => onItemViewDetailPressed(item)}
                />
            }
            onEndReached={() => {
                if (!isRefetching) return fetchNextPage()
            }}
            onEndReachedThreshold={0.8}
        />
    );
}