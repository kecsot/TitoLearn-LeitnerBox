import React from "react";
import {Card, Icon} from "react-native-paper";
import {CardType} from "../../types";
import {useCardTextGuardStyle} from "./dataGuard/useCardTextGuardStyle";
import {CardDataGuardVisibility} from "./dataGuard/type";

type Props = {
    item: CardType,
}

export default function SimpleCardListItem({item}: Props) {

    const [textGuardStyleCalculator] = useCardTextGuardStyle()

    const calculateStyle = {
        fontSize: 14,
        minHeight: 1,
        lineHeight: 14,
        marginRight: 15,
        marginTop: 4,
    }

    return (
        <Card.Title
            title={item.card_side_front.text}
            titleStyle={{
                ...calculateStyle,
                ...textGuardStyleCalculator(CardDataGuardVisibility.FRONT)
            }}
            subtitle={item.card_side_back.text}
            subtitleStyle={{
                ...calculateStyle,
                ...textGuardStyleCalculator(CardDataGuardVisibility.BACK)
            }}
            right={(props) => (
                <Icon  source='chevron-right' color='grey' {...props}/>
            )}
        />
    )
}
