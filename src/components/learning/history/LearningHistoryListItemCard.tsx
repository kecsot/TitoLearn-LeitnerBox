import React from "react";
import {Button, Card, Icon, MD2Colors, MD3Colors} from "react-native-paper";
import {LearningState, LearningType} from "../../../types";
import {formatDate} from "../../../util/date";
import {LabelValue} from "../../base/LabelValue";
import {getLearningStateLabel} from "../../../typesUtil";


type Props = {
    learning: LearningType
    onItemPressed: (item: LearningType) => void
}

export default function LearningHistoryListItemCard({learning, onItemPressed}: Props) {

    const renderIcon = () => {
        if (learning.state === LearningState.DONE) {
            return <Icon
                source={'check-circle'}
                color={MD2Colors.green500}
                size={28}
            />
        }
        if (learning.state === LearningState.CANCELED) {
            return <Icon
                source={'cancel'}
                color={MD3Colors.error50}
                size={28}
            />
        }
        if (learning.state === LearningState.RUNNING) {
            return <Icon
                source={'alpha-r-circle-outline'}
                color={MD2Colors.green500}
                size={28}
            />
        }

        return null
    }

    const isThereAnswers = () =>
        (learning.number_of_answers.repeat +
        learning.number_of_answers.know +
        learning.number_of_answers.dont_know) !== 0

    return (
        <Card>
            <Card.Title
                left={renderIcon}
                title={getLearningStateLabel(learning.state)}
                subtitle={`${learning.number_of_total_cards} card(s) was picked`}
            />

            <Card.Content>
                <LabelValue
                    label={'Known'}
                    value={learning.number_of_answers.know.toString()}
                    hideIfEmpty />

                <LabelValue
                    label={'Repeat'}
                    value={learning.number_of_answers.repeat.toString()}
                    hideIfEmpty />

                <LabelValue
                    label={'Don\'t know'}
                    value={learning.number_of_answers.dont_know.toString()}
                    hideIfEmpty />

                <LabelValue
                    label={'Learning started'}
                    value={formatDate(learning.created_at)}
                    hideIfEmpty />

                {learning.state === LearningState.DONE && (
                    <LabelValue
                        label={'Learning finished'}
                        value={formatDate(learning.updated_at)}
                        hideIfEmpty />
                )}

                {learning.state === LearningState.CANCELED && (
                    <LabelValue
                        label={'Learning canceled'}
                        value={formatDate(learning.updated_at)}
                        hideIfEmpty />
                )}
            </Card.Content>

            <Card.Actions>
                <Button
                    onPress={() => onItemPressed(learning)}
                    disabled={!isThereAnswers()}
                >View Answers</Button>
            </Card.Actions>
        </Card>
    );
}
