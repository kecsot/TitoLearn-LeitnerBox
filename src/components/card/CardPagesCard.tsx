import React from "react";
import {Card, IconButton} from "react-native-paper";
import {CardSideType, CardType} from "../../types";
import {LabelValue} from "../base/LabelValue";
import {formatDate} from "../../util/date";
import CardDataGuardButtons from "./dataGuard/CardDataGuardButtons";
import {useCardTextGuardStyle} from "./dataGuard/useCardTextGuardStyle";
import {CardDataGuardVisibility} from "./dataGuard/type";

type Props = {
    item: CardType
    onShowImage: (url: string) => void
}

export default function CardPagesCard({item, onShowImage}: Props) {

    const [textGuardStyleCalculator] = useCardTextGuardStyle()

    const renderSide = (title: string, cardSide: CardSideType, visibility: CardDataGuardVisibility) => (
        <Card style={{
            marginTop: 4,
            marginBottom: 4
        }}>
            <Card.Title title={title} right={
                () => {
                    if (cardSide.image_id) {
                        return (
                            <IconButton
                                icon={'image'}
                                onPress={() => onShowImage(cardSide.image_url)}/>
                        )
                    }
                }
            }/>
            <Card.Content>
                <LabelValue
                    label={'Text'}
                    value={cardSide.text}
                    valueStyle={{
                        ...textGuardStyleCalculator(visibility)
                    }}/>
                <LabelValue
                    label={'Last changed'}
                    value={formatDate(cardSide.updated_at)}/>
            </Card.Content>

        </Card>
    )

    return (
        <Card mode='outlined'>
            <Card.Title title={'Sides'}/>
            <Card.Content>
                <CardDataGuardButtons/>

                {renderSide('Front page', item.card_side_front, CardDataGuardVisibility.FRONT)}
                {renderSide('Back page', item.card_side_back, CardDataGuardVisibility.BACK)}
            </Card.Content>
        </Card>
    );
}
