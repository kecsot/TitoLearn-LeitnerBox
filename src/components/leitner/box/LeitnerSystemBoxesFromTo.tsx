import React from "react";
import {Icon, useTheme} from "react-native-paper";
import {View} from "react-native";
import {CardBoxHistoryEvent, CardBoxHistoryType} from "../../../types";

type Props = {
    item: CardBoxHistoryType
}

type BoxDataType = {
    color: string,
    source: string
}

export const LeitnerSystemBoxesFromTo = ({item}: Props) => {
    const {colors} = useTheme();

    const getBoxData = (index: number): BoxDataType => {
        let isCurrentBox = index === item.box_index
        let isPreviousBox = index === item.previous_box_index
        let eventData = JSON.parse(item.event_data);
        let isEventBox = eventData?.box?.index === index

        if (item.event === CardBoxHistoryEvent.CARD_CREATED) {
            if (isCurrentBox) return {color: 'green', source: 'archive'}
        }

        if (item.event === CardBoxHistoryEvent.ANSWER_KNOW) {
            if (isCurrentBox && isPreviousBox) return {color: 'green', source: 'archive'}
            if (isCurrentBox) return {color: 'green', source: 'archive-arrow-down'}
            if (isPreviousBox) return {color: 'red', source: 'archive-arrow-up'}
        }

        if (item.event === CardBoxHistoryEvent.ANSWER_DONT_KNOW) {
            if (isCurrentBox && isPreviousBox) return {color: 'green', source: 'archive'}
            if (isCurrentBox) return {color: 'green', source: 'archive-arrow-down'}
            if (isPreviousBox) return {color: 'red', source: 'archive-arrow-up'}
        }

        if (item.event === CardBoxHistoryEvent.ANSWER_REPEAT) {
            if (isCurrentBox) return {color: 'green', source: 'archive'}
        }

        if (item.event === CardBoxHistoryEvent.BOX_ADDED) {
            if (isEventBox) return {color: 'gray', source: 'archive-plus'}
            if (isCurrentBox) return {color: 'green', source: 'archive'}
        }

        if (item.event === CardBoxHistoryEvent.BOX_DELETED) {
            if (isEventBox) return {color: 'red', source: 'archive-minus'}
            if (isCurrentBox) return {color: 'green', source: 'archive'}
        }

        if (item.event === CardBoxHistoryEvent.CARD_CONTAINING_BOX_DELETED) {
            if (isCurrentBox) return {color: 'green', source: 'archive-arrow-down'}
            if (isPreviousBox) return {
                color: 'red',
                source: require('../../../../assets/icons/CustomMaterialCommunityIcon/archive-arrow-up-minus-red.png')
            }
        }

        return {
            color: colors.onSurface,
            source: 'archive',
        }
    }

    return (
        <View style={{flexDirection: "row"}}>
            {[...Array(item.boxes_count)].map((_, index) => (
                <Icon key={index} size={23} {...getBoxData(index + 1)}/>
            ))}
        </View>
    );
}

