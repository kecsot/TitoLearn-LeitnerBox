import React from "react";
import {FlatList} from "react-native";
import {FlatListProps} from "react-native/Libraries/Lists/FlatList";
import {globalStyleConfig} from "../globalStyleConfig";
import ItemSeparator from "./ItemSeparator";
import ListEmptyAnimatedCardContent from "./ListEmptyAnimatedCardContent";

type Props<ItemT = any> = FlatListProps<ItemT>

export default function BaseFlatList({...rest}: Props) {

    return (
        <FlatList
            contentContainerStyle={{
                paddingVertical: globalStyleConfig.gap,
                paddingHorizontal: globalStyleConfig.gap,
            }}
            ItemSeparatorComponent={ItemSeparator}
            ListEmptyComponent={ListEmptyAnimatedCardContent}
            {...rest}
        />
    );
}
