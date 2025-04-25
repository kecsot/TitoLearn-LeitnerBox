import React from "react";
import {Text} from "react-native-paper";
import {View} from "react-native";


export type LearningStatisticsHeaderProps = {
    numberOfRemainingCards: number
    numberOfFinishedCards: number
}

export default function LearningStatisticsHeader({numberOfFinishedCards, numberOfRemainingCards}: LearningStatisticsHeaderProps) {

    const labelStyle = {
        opacity: .5
    }

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text variant="titleMedium" style={labelStyle}>Remaining: {numberOfRemainingCards}</Text>
            <Text variant="titleMedium" style={labelStyle}>Finished: {numberOfFinishedCards}</Text>
        </View>
    );
}
