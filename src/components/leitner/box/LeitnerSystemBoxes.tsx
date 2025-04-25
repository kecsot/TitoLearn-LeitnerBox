import React from "react";
import {Icon, useTheme} from "react-native-paper";
import {LeitnerSystemBoxType} from "../../../types";
import {View} from "react-native";

type Props = {
    boxes: LeitnerSystemBoxType[]
    markedBoxId: number
}

export const LeitnerSystemDetailCard = ({boxes, markedBoxId}: Props) => {
    const {colors} = useTheme();

    return (
        <View style={{flexDirection: "row"}}>
            {boxes.map((box) => (
                <Icon
                    key={`${box.id}-${Math.random()}`}
                    source={"archive"}
                    size={14}
                    color={box.id === markedBoxId ? "green" : colors.onSurface}/>
            ))}
        </View>
    );
}

