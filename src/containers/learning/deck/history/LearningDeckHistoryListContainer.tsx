import React from "react";
import {RefreshControl} from "react-native";
import {LearningType} from "../../../../types";
import {useGetLearningListOfDeckSuspenseInfiniteQuery} from "../../../../api/queries/deckLearning";
import BaseFlatList from "../../../../components/base/list/BaseFlatList";
import ItemSeparator from "../../../../components/base/list/ItemSeparator";
import LearningHistoryListItemCard from "../../../../components/learning/history/LearningHistoryListItemCard";
import ListEmptyAnimatedCardContent from "../../../../components/base/list/ListEmptyAnimatedCardContent";


type Props = {
    deckId: number
    onItemPressed: (item: LearningType) => void
}

export default function LearningDeckHistoryListContainer({deckId, onItemPressed}: Props) {

    const {data, isFetching, refetch, fetchNextPage, isRefetching} = useGetLearningListOfDeckSuspenseInfiniteQuery({deckId})

    if (!data) return null

    const paginatedData: LearningType[] = data.pages.flatMap(page => page.data)

    return (
        <BaseFlatList
            data={paginatedData}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <LearningHistoryListItemCard learning={item} onItemPressed={onItemPressed}/>
            )}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
            onEndReachedThreshold={0.8}
            onEndReached={() => {
                if(!isRefetching) return fetchNextPage()
            }}
            ListEmptyComponent={<ListEmptyAnimatedCardContent
                description={"There is not found any learning on this deck."}
            />}
        />
    );
}
