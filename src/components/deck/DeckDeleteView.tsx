import React from "react";
import {Button, Card, Text} from "react-native-paper";

type Props = {
    onDeletePressed: VoidFunction
    onCancelPressed: VoidFunction
    isPending: boolean
}

export default function DeckDeleteView({onDeletePressed, onCancelPressed, isPending}: Props) {

    return (
        <Card>
            <Card.Title
                title="Are you sure you want to delete this deck?"/>

            <Card.Content>
                <Text>The deck will not be recoverable; all associated data will be permanently deleted, including the cards, learning history, and the deck's Leitner system.</Text>
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