import React from "react";
import DeckDeleteView from "../../components/deck/DeckDeleteView";
import {useDeleteDeckMutation} from "../../api/queries/deck";

type Props = {
    id: number,
    onSuccess: VoidFunction
    onCancel: VoidFunction
}

export default function DeckDeleteViewContainer({id, onSuccess, onCancel}: Props) {

    const {mutateAsync: deleteMutation, isPending} = useDeleteDeckMutation({deckId: id})

    const handleOnDeletePressed = () =>
        deleteMutation()
            .then(() => onSuccess())

    return (
        <DeckDeleteView
            onDeletePressed={handleOnDeletePressed}
            onCancelPressed={onCancel}
            isPending={isPending}/>
    );
}