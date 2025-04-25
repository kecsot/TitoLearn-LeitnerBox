import React from "react";
import LearningHistoryAnswerListItem from "../../../../components/learning/history/LearningHistoryAnswerListItem";
import {useGetLearningCardListSuspenseQuery} from "../../../../api/queries/learningCard";
import ItemSeparator from "../../../../components/base/list/ItemSeparator";
import BaseFlatList from "../../../../components/base/list/BaseFlatList";
import {AnswerType, CardType} from "../../../../types";
import {useGetLearningCardAnswerSuspenseInfiniteQuery} from "../../../../api/queries/learningAnswer";
import {RefreshControl} from "react-native";
import ListEmptyAnimatedCardContent from "../../../../components/base/list/ListEmptyAnimatedCardContent";
import CardDataGuardButtons from "../../../../components/card/dataGuard/CardDataGuardButtons";

type Props = {
    learningId: number
    onCardPressed: (item: CardType) => void
}

export default function LearningAnswerHistoryListContainer({learningId, onCardPressed}: Props) {

    const {
        data: cards,
        isFetching: isCardsFetching,
        isRefetching: isLearningRefetching,
        refetch: refetchCards
    } = useGetLearningCardListSuspenseQuery({learningId})
    const {
        data,
        fetchNextPage,
        isFetching: isPageFetching,
        isRefetching: isLearningCardAnswerRefetching,
        refetch: refetchPageData
    } = useGetLearningCardAnswerSuspenseInfiniteQuery({learningId})

    const findCard = (cardId: number) => (cards ?? []).find((x) => x.id === cardId)
    const isFetching = isCardsFetching || isPageFetching

    if (!data) return null

    const paginatedData: AnswerType[] = (data.pages ?? []).map(page => page.data).flat()

    const listHeaderComponent = () => (paginatedData.length > 0) ? <CardDataGuardButtons/> : null

    return (
        <BaseFlatList
            data={paginatedData}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={listHeaderComponent}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => {
                void refetchCards()
                void refetchPageData()
            }}/>}
            ListEmptyComponent={<ListEmptyAnimatedCardContent
                description={"There is no answer!"}
            />}
            renderItem={({item}) =>
                <LearningHistoryAnswerListItem
                    onCardPressed={onCardPressed}
                    answer={item}
                    card={findCard(item.card_id)}
                />
            }
            onEndReachedThreshold={0.8}
            onEndReached={() => {
                if (!isLearningRefetching && !isLearningCardAnswerRefetching) return fetchNextPage()
            }}
        />
    );
}
