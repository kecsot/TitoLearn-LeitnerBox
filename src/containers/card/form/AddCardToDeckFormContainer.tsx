import React from "react";
import CardForm from "../../../components/card/form/CardForm";
import {useAddCardMutation} from "../../../api/queries/deckCard";
import {CardEditableType} from "../../../types";

type Props = {
    deckId: number
    onSuccess?: VoidFunction
}

export default function AddCardToDeckFormContainer({deckId, onSuccess}: Props) {

    const {mutateAsync, isPending} = useAddCardMutation({deckId})

    const handleSubmit = (data: CardEditableType) =>
        mutateAsync(data)
        .then(() => onSuccess && onSuccess())


    return (
        <CardForm
            isLoading={isPending}
            submit={handleSubmit}/>
    );
}