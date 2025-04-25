import React from "react";
import DeckForm from "../../../components/deck/form/DeckForm";
import {useAddDeckMutation} from "../../../api/queries/deck";
import {DeckEditableType} from "../../../types";

type Props = {
    onSuccess: VoidFunction
}

export default function AddDeckFormContainer({onSuccess}: Props) {

    const {mutateAsync, isPending} = useAddDeckMutation()

    const handleSubmit = (data: DeckEditableType) => mutateAsync(data).then(() => onSuccess())

    return (
        <DeckForm
            isLoading={isPending}
            submit={handleSubmit}/>
    );
}