import React from "react";
import {Card} from "react-native-paper";
import {DeckType} from "../../types";
import {LabelValue} from "../base/LabelValue";
import {formatDate} from "../../util/date";

type Props = {
    item: DeckType
}

export default function DeckDetailCard({item}: Props) {

    return (
        <Card mode="outlined">
            <Card.Title title={'Details'}/>
            <Card.Content>
                <LabelValue
                    label={'Name'}
                    value={item.title}
                    hideIfEmpty/>

                <LabelValue
                    label={'Description'}
                    value={item.description}
                    hideIfEmpty/>

                <LabelValue
                    label={'Cards'}
                    value={item.count_of_cards.toString()}
                    hideIfEmpty/>

                <LabelValue
                    label={'Due cards'}
                    value={item.count_of_due_cards.toString()}
                    hideIfEmpty/>

                <LabelValue
                    label={'Created'}
                    value={formatDate(item.created_at)}
                    hideIfEmpty/>

                <LabelValue
                    label={'Updated'}
                    value={formatDate(item.updated_at)}
                    hideIfEmpty/>
            </Card.Content>
        </Card>
    );
}
