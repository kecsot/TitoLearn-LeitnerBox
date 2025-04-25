import React, {ReactNode} from "react";
import {View} from "react-native";
import {globalStyleConfig} from "../globalStyleConfig";

type Props = {
    children?: ReactNode
}

export default function ItemSeparator({children}: Props) {

    return (
        <View style={{margin: globalStyleConfig.halfGap}}>
            {children}
        </View>
    );
}
