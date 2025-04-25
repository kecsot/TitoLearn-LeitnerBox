import React, {useMemo} from "react";
import CardForm from "../../../components/card/form/CardForm";
import {useEditCardMutation, useGetCardByIdSuspenseQuery} from "../../../api/queries/deckCard";
import {CardEditableType} from "../../../types";

type Props = {
    id: number
    deckId: number,
    onSuccess: VoidFunction
}

export default function EditCardOfDeckFormContainer({id, deckId, onSuccess}: Props) {

    const {data: card} = useGetCardByIdSuspenseQuery({deckId, cardId: id})
    const {mutateAsync, isPending} = useEditCardMutation({deckId, cardId: id})

    const handleSubmit = (data: CardEditableType) => mutateAsync(data).then(() => onSuccess())

    return (
        <CardForm
            item={card!}
            isLoading={isPending}
            submit={handleSubmit}/>
    );
}