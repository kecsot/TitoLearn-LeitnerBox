import React from "react";
import {LeitnerSystemBoxType} from "../../../types";
import {LabelValue} from "../../base/LabelValue";
import {nth} from "../../../util/number";

type Props = {
    boxes: LeitnerSystemBoxType[]
    markedBoxId: number
}

export const LeitnerSystemBoxesPositionLabelValue = ({boxes, markedBoxId}: Props) => {
    const position = boxes.findIndex((box) => box.id === markedBoxId)

    if (position === -1) return null

    const positionFromOne = position + 1;

    return (
        <LabelValue
            label={'Box'}
            value={positionFromOne + nth(positionFromOne)}
            hideIfEmpty/>
    );
}

