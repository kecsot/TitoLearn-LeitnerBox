import React from "react";

import ItemSeparator from "../../components/base/list/ItemSeparator";
import BaseFlatList from "../../components/base/list/BaseFlatList";
import {useGetLeitnerSystemByIdSuspenseQuery} from "../../api/queries/leitnerSystem";
import LeitnerSystemBuilderBoxListItem from "../../components/leitner/builder/LeitnerSystemBuilderBoxListItem";
import {LeitnerSystemBoxType} from "../../types";
import {RefreshControl} from "react-native";
import ListEmptyAnimatedCardContent from "../../components/base/list/ListEmptyAnimatedCardContent";
import LeitnerSystemBuilderAddButtonContainer from "./LeitnerSystemBuilderAddButtonContainer";

type Props = {
    id: number
    onEditPressed: (box: LeitnerSystemBoxType) => void
    onDeletePressed: (box: LeitnerSystemBoxType) => void
}

export default function LeitnerSystemBuilderContainer({id, onEditPressed, onDeletePressed}: Props) {
    const {data: leitnerSystem, isFetching, refetch} = useGetLeitnerSystemByIdSuspenseQuery({id: id})

    const isAddButtonEnabled = leitnerSystem.boxes.length < 12

    return (
        <BaseFlatList
            data={leitnerSystem.boxes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch}/>}
            ListEmptyComponent={<ListEmptyAnimatedCardContent
                description={"This deck is empty!"}
            />}
            renderItem={({item, index}) => (
                <>
                    {index === 0 && (
                        <>
                            <LeitnerSystemBuilderAddButtonContainer
                                index={index + 1}
                                leitnerSystemId={id}
                                enabled={isAddButtonEnabled}
                            />
                            <ItemSeparator/>
                        </>
                    )}

                    <LeitnerSystemBuilderBoxListItem
                        item={item}
                        index={index + 1}
                        deleteDisabled={leitnerSystem.boxes.length <= 1}
                        onEditPressed={() => onEditPressed(item)}
                        onDeletePressed={() => onDeletePressed(item)}
                    />

                    {index != (leitnerSystem.boxes.length) && (
                        <>
                            <ItemSeparator/>
                            <LeitnerSystemBuilderAddButtonContainer
                                index={index + 2}
                                leitnerSystemId={id}
                                enabled={isAddButtonEnabled}
                            />
                        </>
                    )}
                </>
            )}
        />
    );
}