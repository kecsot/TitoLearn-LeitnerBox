import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {View} from "react-native";

type Props = {
    onDeletePressed: VoidFunction
    onCancelPressed: VoidFunction
    isPending: boolean
}

export default function LeitnerSystemBoxDeleteView({onDeletePressed,onCancelPressed, isPending}: Props) {

    return (
        <Card>
            <Card.Title
                title="Are you sure you want to delete this box?"/>

            <Card.Content>
                <View style={{
                    gap: 8
                }}>
                    <Text>When deleting a box, the cards in the box will automatically be moved to the box before the one you wish to delete. If there is no box before it, the cards will be moved to the box that comes after it.</Text>
                    <Text>The deletion of the box will appear in the card history, ensuring that the card's history remains easy to follow.</Text>
                </View>
            </Card.Content>

            <Card.Actions>
                <Button
                    onPress={onCancelPressed}>Cancel</Button>
                <Button
                    onPress={onDeletePressed}
                    loading={isPending}
                    disabled={isPending}>Delete</Button>
            </Card.Actions>
        </Card>
    );
}