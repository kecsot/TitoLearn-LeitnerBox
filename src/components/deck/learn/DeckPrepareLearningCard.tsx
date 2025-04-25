import React, {useEffect, useMemo} from "react";
import {Button, Card, Text} from "react-native-paper";
import {DeckType, LearningCalculationFilters} from "../../../types";
import Slider from "@react-native-community/slider";
import {useDebouncedState} from "../../../hooks/useDebouncedState";
import {LabelValue} from "../../base/LabelValue";
import {View} from "react-native";

type Props = {
    deck: DeckType
    numberOfWillPickedCards: number

    onStartPressed: VoidFunction
    isStartLearningLoading: boolean

    onCalculationChanged: (filters: LearningCalculationFilters) => void
    isCalculateLearningLoading: boolean
}

const DEFAULT_THRESHOLD_HOUR = 0

export default function DeckPrepareLearningCard(
    {
        deck,
        numberOfWillPickedCards,
        onStartPressed,
        isStartLearningLoading,

        onCalculationChanged,
        isCalculateLearningLoading
    }: Props) {

    const [
        debouncedThresholdInHours,
        thresholdInHours,
        setThresholdInHours
    ] = useDebouncedState(DEFAULT_THRESHOLD_HOUR, 500)

    useEffect(() => {
        onCalculationChanged({
            thresholdInMinutes: thresholdInHours * 60
        })
    }, [debouncedThresholdInHours]);

    const renderTimeTravelValue = useMemo(() => {
        const date = new Date();
        date.setHours(date.getHours() + thresholdInHours);

        let time = date.toLocaleTimeString().slice(0, -3)
        if (date.getDay() == new Date().getDay()) {
            return `${time} today`;
        }
        return `${time} tomorrow`;
    }, [thresholdInHours])

    const handleOnThresholdChanged = (hours: number) => setThresholdInHours(hours)

    const isDeckEmpty = deck.count_of_cards === 0
    const isPossibleToStartLearning = numberOfWillPickedCards > 0 && !isDeckEmpty

    return (
        <Card mode="outlined">
            <Card.Title
                title={'Start learning'}
            />

            <Card.Content>
                {isDeckEmpty && (
                    <Text>The deck is empty. Add some cards to get started!</Text>
                )}

                {!isDeckEmpty && (
                    <View style={{
                        gap: 8
                    }}>
                        <View>
                            <Text>Time travel</Text>
                            <Slider
                                style={{width: '100%'}}
                                minimumValue={0}
                                maximumValue={12}
                                step={1}
                                value={thresholdInHours}
                                onValueChange={handleOnThresholdChanged}
                                tapToSeek
                            />

                            <LabelValue
                                label={'Study as if it were'}
                                value={renderTimeTravelValue}
                                hideIfEmpty/>
                        </View>

                        <LabelValue
                            label={'You will learn'}
                            value={`${numberOfWillPickedCards} card(s)`}
                            hideIfEmpty/>
                    </View>
                )}
            </Card.Content>

            <Card.Actions>
                <Button
                    mode="contained"
                    loading={isStartLearningLoading || isCalculateLearningLoading}
                    onPress={onStartPressed}
                    disabled={!isPossibleToStartLearning || isCalculateLearningLoading}>Start learning</Button>
            </Card.Actions>
        </Card>
    );
}
