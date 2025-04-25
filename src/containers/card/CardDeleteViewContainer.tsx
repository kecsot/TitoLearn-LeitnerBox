import React from "react";
import CardDeleteView from "../../components/card/CardDeleteView";
import {useDeleteCardMutation} from "../../api/queries/deckCard";

type Props = {
    id: number,
    deckId: number,
    onSuccess: VoidFunction
    onCancel: VoidFunction
}

export default function CardDeleteViewContainer({id, deckId, onSuccess, onCancel}: Props) {

    const {mutateAsync: deleteMutation, isPending} = useDeleteCardMutation({deckId, cardId: id})

    const handleOnDeletePressed = () =>
        deleteMutation()
            .then(() => onSuccess())

    return (
        <CardDeleteView
            onDeletePressed={handleOnDeletePressed}
            onCancelPressed={onCancel}
            isPending={isPending}/>
    );
}