import React from "react";
import {Button} from "react-native-paper";
import {LearningAnswer} from "../../types";
import {View} from "react-native";


export type LearningAnswerButtonsProps = {
    isAnswering: boolean
    onAnswerPressed: (answer: LearningAnswer) => void
}

export default function LearningAnswerButtons({onAnswerPressed, isAnswering}: LearningAnswerButtonsProps) {

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10
        }}>
            <Button
                style={{flex: 1}}
                compact
                mode='outlined'
                disabled={isAnswering}
                onPress={() => onAnswerPressed(LearningAnswer.DONT_KNOW)}>Don't know</Button>
            <Button
                style={{flex: 1}}
                compact
                mode='outlined'
                disabled={isAnswering}
                onPress={() => onAnswerPressed(LearningAnswer.REPEAT)}>Repeat</Button>
            <Button
                style={{flex: 1}}
                compact
                mode='outlined'
                disabled={isAnswering}
                onPress={() => onAnswerPressed(LearningAnswer.KNOW)}>Know</Button>
        </View>
    );
}
