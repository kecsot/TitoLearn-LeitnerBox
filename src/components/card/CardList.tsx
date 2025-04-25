import React from "react";
import {CardType, LeitnerSystemType, RefreshControlType} from "../../types";
import CardListItem from "./CardListItem";
import BaseFlatList from "../base/list/BaseFlatList";
import ListEmptyAnimatedCardContent from "../base/list/ListEmptyAnimatedCardContent";
import CardDataGuardButtons from "./dataGuard/CardDataGuardButtons";

type Props = {
    items: CardType[]
    leitnerSystem: LeitnerSystemType
    onItemViewDetailPressed: (item: CardType) => void
    refreshControl: RefreshControlType
    onEndReached: VoidFunction
}

export default function CardList({items, leitnerSystem, onItemViewDetailPressed, refreshControl, onEndReached}: Props) {

    const listHeaderComponent = () => (items.length > 0) ? <CardDataGuardButtons /> : null
    const listEmptyComponent = () => <ListEmptyAnimatedCardContent description={"You should add some card to this deck! Press the plus icon on the right top!"}/>

    return (
        <BaseFlatList
            data={items}
            keyExtractor={item => item.id}
            refreshControl={refreshControl}
            renderItem={({item}) =>
                <CardListItem
                    item={item}
                    leitnerSystem={leitnerSystem}
                    onViewPressed={() => onItemViewDetailPressed(item)}/>
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.8}
            ListHeaderComponent={listHeaderComponent}
            ListEmptyComponent={listEmptyComponent}
        />
    );
}
