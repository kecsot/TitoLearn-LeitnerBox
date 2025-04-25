import React, {useMemo} from "react";
import {
    useEditLeitnerSystemBoxMutation,
    useGetLeitnerSystemByIdSuspenseQuery
} from "../../../../api/queries/leitnerSystem";
import LeitnerSystemBoxEditForm from "../../../../components/leitner/box/form/LeitnerSystemBoxEditForm";
import {LeitnerSystemBoxEditableType} from "../../../../types";

type Props = {
    id: number,
    leitnerSystemId: number
    onSuccess: VoidFunction
}

export default function LeitnerSystemBoxEditFormContainer({id, leitnerSystemId, onSuccess}: Props) {

    const {data: leitnerSystem} = useGetLeitnerSystemByIdSuspenseQuery({id: leitnerSystemId})

    // v2: get from react-query
    const box = useMemo(() => {
        return leitnerSystem.boxes.find(x => x.id == id)
    }, [leitnerSystem])

    const {
        mutateAsync: editMutation,
        isPending
    } = useEditLeitnerSystemBoxMutation()

    const handleEdit = (data: LeitnerSystemBoxEditableType) =>
        editMutation({
            leitnerSystemId: leitnerSystemId,
            boxId: id,
            data: data
        })
            .then(() => onSuccess())

    if (!box) return null

    return (
        <LeitnerSystemBoxEditForm
            item={box}
            submit={handleEdit}
            isLoading={isPending}/>
    );
}