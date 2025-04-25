import React from "react";
import {Button, Card, Text} from "react-native-paper";
import {View} from "react-native";
import {globalStyleConfig} from "../base/globalStyleConfig";

type Props = {
    onDeletePressed: VoidFunction
    onCancelPressed: VoidFunction
    isPending: boolean
}

export default function CardDeleteView({onDeletePressed, onCancelPressed, isPending}: Props) {

    return (
        <Card>
            <Card.Title
                title="Are you sure you want to delete this card?"/>
            <Card.Content>
                <View style={{gap: globalStyleConfig.gap}}>
                    <Text>The card will not be recoverable; all associated data on both sides, including images, will be
                        permanently deleted.</Text>
                    <Text>The learning history on the deck will remain intact, but for certain responses, this card will
                        no longer be displayed. It will appear as a 'deleted card.'</Text>
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