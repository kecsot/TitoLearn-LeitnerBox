import React from "react";
import {Card} from "react-native-paper";
import {CardType, LeitnerSystemType} from "../../types";
import {View} from "react-native";
import {formatDueDate} from "../../util/due";
import {LeitnerSystemDetailCard} from "../leitner/box/LeitnerSystemBoxes";
import {LabelValue} from "../base/LabelValue";
import SimpleCardListItem from "./SimpleCardListItem";

type Props = {
    item: CardType,
    leitnerSystem: LeitnerSystemType
    onViewPressed?: VoidFunction
}


export default function CardListItem({item, leitnerSystem, onViewPressed}: Props) {

    const box = leitnerSystem.boxes.find((box) => box.id == item.box_id)

    if(!box) return null

    return (
        <Card onPress={onViewPressed}>
            <SimpleCardListItem
                item={item} />
            <Card.Content style={{
                marginVertical: -10, // FIXME: better solution?
            }}>
                <LabelValue
                    label={'Due'}
                    value={formatDueDate(item.last_box_history_event, item.put_in_to_box_at, box.delay_in_minutes)}
                    hideIfEmpty/>
            </Card.Content>
            <Card.Actions>
                <LeitnerSystemDetailCard boxes={leitnerSystem.boxes} markedBoxId={item.box_id}/>
            </Card.Actions>
        </Card>
    )
}
