import React from "react";
import {View} from "react-native";
import {SegmentedButtons} from "react-native-paper";
import {globalStyleConfig} from "../../base/globalStyleConfig";
import {CardDataGuardVisibility} from "./type";
import {useCardDataGuardContext} from "./context/useCardDataGuardContext";

export default function CardDataGuardButtons() {
    const {visibility, setVisibility} = useCardDataGuardContext()

    return (
        <View style={{paddingBottom: globalStyleConfig.gap}}>
            <SegmentedButtons
                density='small'
                value={visibility}
                onValueChange={(x) => setVisibility(x as CardDataGuardVisibility)}
                buttons={[
                    {value: CardDataGuardVisibility.HIDDEN, label: 'Hidden'},
                    {value: CardDataGuardVisibility.FRONT, label: 'Front'},
                    {value: CardDataGuardVisibility.BACK, label: 'Back'},
                    {value: CardDataGuardVisibility.BOTH, label: 'Both'},
                ]}
            />
        </View>
    );
}
