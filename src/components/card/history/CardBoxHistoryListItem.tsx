import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {CardBoxHistoryType} from "../../../types";
import {LeitnerSystemBoxesFromTo} from "../../leitner/box/LeitnerSystemBoxesFromTo";
import {getCardBoyHistoryEventLabel} from "../../../typesUtil";
import {formatDate} from "../../../util/date";

type Props = {
    item: CardBoxHistoryType
}

export default function CardBoxHistoryListItem({item}: Props) {
    const ID_SHIFT = 12452

    return (
        <View style={{margin: 8}}>
            <Text variant="titleSmall">{getCardBoyHistoryEventLabel(item.event)}</Text>

            <LeitnerSystemBoxesFromTo
                item={item}
            />

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text variant="labelSmall">
                    {formatDate(item.created_at)}
                </Text>

                {item.learning_id && (
                    <Text variant="labelSmall" style={{opacity: .3}}>
                        Learning ID: {item.learning_id + ID_SHIFT}
                    </Text>
                )}
            </View>
        </View>
    );
}
