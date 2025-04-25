import React from "react";
import {Button, Card, Divider, MD3Colors, Text} from "react-native-paper";
import {LearningType} from "../../../types";
import {formatDate} from "../../../util/date";


type Props = {
    learning: LearningType
    onContinuePressed: VoidFunction

    onCancelPressed: VoidFunction
    isCancelLoading: boolean
}

export default function DeckContinueLearningCard(
    {
        learning,
        onContinuePressed,
        onCancelPressed,
        isCancelLoading
    }: Props) {


    return (
        <Card mode="outlined">
            <Card.Title title={'Continue learning'}/>

            <Card.Content>
                <Text variant="bodyMedium">Total: {learning.number_of_total_cards}</Text>
                <Text
                    variant="bodyMedium">Left: {learning.number_of_total_cards - learning.number_of_answers.know}</Text>
                <Divider/>
                <Text variant="bodyMedium">Known: {learning.number_of_answers.know}</Text>
                <Text variant="bodyMedium">Repeat: {learning.number_of_answers.repeat}</Text>
                <Text variant="bodyMedium">Dont know: {learning.number_of_answers.dont_know}</Text>
                <Divider/>
                <Text variant="bodyMedium">Started: {formatDate(learning.created_at)}</Text>
            </Card.Content>

            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={onContinuePressed}>Continue learning</Button>
                <Button
                    onPress={onCancelPressed}
                    mode="outlined"
                    loading={isCancelLoading}
                    textColor={MD3Colors.error50}>Cancel learning</Button>
            </Card.Actions>
        </Card>
    );
}
