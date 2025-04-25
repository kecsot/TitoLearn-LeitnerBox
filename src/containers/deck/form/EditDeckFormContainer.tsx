import React from "react";
import DeckForm from "../../../components/deck/form/DeckForm";
import {useEditDeckMutation, useGetDeckByIdSuspenseQuery} from "../../../api/queries/deck";
import {DeckEditableType} from "../../../types";

type Props = {
    id: number
    onSuccess: VoidFunction
}

export default function EditDeckFormContainer({id, onSuccess}: Props) {
    const {data: deck} = useGetDeckByIdSuspenseQuery({deckId: id})
    const {mutateAsync, isPending} = useEditDeckMutation({deckId: id})

    const handleSubmit = (data: DeckEditableType) => mutateAsync(data).then(() => onSuccess())

    return (
        <DeckForm
            item={deck!}
            isLoading={isPending}
            submit={handleSubmit}/>
    );
}