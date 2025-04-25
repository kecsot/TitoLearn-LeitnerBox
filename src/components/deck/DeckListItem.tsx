import React from "react";
import {View} from "react-native";
import {Badge, Button, Card, Icon, useTheme} from "react-native-paper";
import {DeckType} from "../../types";
import {LabelValue} from "../base/LabelValue";


type Props = {
    item: DeckType
    onViewDetailPressed: VoidFunction
}

export default function DeckListItem({item, onViewDetailPressed,}: Props) {

    const {colors} = useTheme()
    const isLearningRunning = item.running_learning_id != null

    return (
        <Card>
            <Card.Title
                title={item.title}
                subtitle={item.description}/>

            <Card.Content>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8
                }}>
                    <Icon
                        size={16}
                        source='cards'
                        color={colors.onSurface}/>
                    <LabelValue label={'Cards'} value={item.count_of_cards.toString()}/>
                </View>

                {item.count_of_due_cards > 0 && (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <Icon
                            size={16}
                            source='alert-octagon-outline'
                            color={colors.onSurface}/>
                        <LabelValue label={'Due'} value={item.count_of_due_cards.toString()}/>
                    </View>
                )}

                {isLearningRunning && (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <Badge>Learning running</Badge>
                    </View>
                )}

            </Card.Content>

            <Card.Actions>
                <Button onPress={onViewDetailPressed}>View</Button>
            </Card.Actions>
        </Card>
    );
}
