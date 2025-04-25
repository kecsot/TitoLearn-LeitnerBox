import React, {useMemo} from "react";
import {Card, Divider, Icon, MD3Colors} from "react-native-paper";
import {AnswerType, CardType, LearningAnswer} from "../../../types";
import {formatDate} from "../../../util/date";
import SimpleCardListItem from "../../card/SimpleCardListItem";
import {TouchableOpacity} from "react-native";
import {getLearningAnswerLabel} from "../../../typesUtil";


type Props = {
    answer: AnswerType
    card?: CardType
    onCardPressed: (item: CardType) => void
}

export default function LearningHistoryAnswerListItem({answer, card, onCardPressed}: Props) {

    const answerIcon = useMemo(() => {
        if (answer.answer === LearningAnswer.KNOW) return 'emoticon-cool'
        if (answer.answer === LearningAnswer.REPEAT) return 'repeat'
        if (answer.answer === LearningAnswer.DONT_KNOW) return 'emoticon-sad'
        return ''
    }, [answer])

    const answerIconColor = useMemo(() => {
        if (answer.answer === LearningAnswer.KNOW) return 'green'
        if (answer.answer === LearningAnswer.REPEAT) return MD3Colors.secondary100
        if (answer.answer === LearningAnswer.DONT_KNOW) return MD3Colors.error50
        return ''
    }, [answer])

    return (
        <Card>
            <Card.Title
                title={getLearningAnswerLabel(answer.answer)}
                subtitle={formatDate(answer.updated_at)}
                left={() => (
                    <Icon
                        source={answerIcon}
                        color={answerIconColor}
                        size={26}
                    />
                )}
            />
            <Divider/>
            {card ? (
                <TouchableOpacity onPress={() => onCardPressed(card)}>
                    <SimpleCardListItem
                        item={card}/>
                </TouchableOpacity>
            ) : (
                <Card.Title
                    title={'Deleted card.'}
                    style={{
                        opacity: .5
                    }}/>
            )}
        </Card>
    );
}
