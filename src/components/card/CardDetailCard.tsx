import React from "react";
import {Card} from "react-native-paper";
import {CardType} from "../../types";
import {LabelValue} from "../base/LabelValue";
import {formatDate} from "../../util/date";

type Props = {
    item: CardType
}

export default function CardDetailCard({item}: Props) {

    return (
        <Card mode='outlined'>
            <Card.Title title={'Details'}/>
            <Card.Content>
                <LabelValue
                    label='Created'
                    value={formatDate(item.created_at)}/>
                <LabelValue
                    label='Updated'
                    value={formatDate(item.updated_at)}/>
                <LabelValue
                    label='Last box move'
                    value={formatDate(item.put_in_to_box_at)}/>
            </Card.Content>
        </Card>
    );
}
