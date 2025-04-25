import React from "react";
import {useDeleteLeitnerSystemBoxMutation} from "../../../api/queries/leitnerSystem";
import LeitnerSystemBoxDeleteView from "../../../components/leitner/box/LeitnerSystemBoxDeleteView";

type Props = {
    id: number,
    leitnerSystemId: number
    onSuccess: VoidFunction
    onCancel: VoidFunction
}

export default function LeitnerSystemBoxDeleteViewContainer({leitnerSystemId, id, onSuccess, onCancel}: Props) {
    const {mutateAsync: deleteMutation, isPending} = useDeleteLeitnerSystemBoxMutation()

    const handleOnDeletePressed = () =>
        deleteMutation({
            leitnerSystemId,
            boxId: id
        })
            .then(() => onSuccess())

    return (
        <LeitnerSystemBoxDeleteView
            onDeletePressed={handleOnDeletePressed}
            onCancelPressed={onCancel}
            isPending={isPending}/>
    );
}