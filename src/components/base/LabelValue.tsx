import React from "react";
import {Text} from "react-native-paper";
import {View} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
    label: string
    value?: string
    hideIfEmpty?: boolean;
    valueStyle?: StyleProp<TextStyle> | undefined
}

export const LabelValue = ({label, value, valueStyle, hideIfEmpty = false}: Props) => {

    if (hideIfEmpty && !value) return null

    return (
        <View style={{
            display: "flex",
            flexDirection: 'row',
        }}>
            <Text
                variant="bodySmall"
                style={{
                    opacity: .6
                }}>{label}:</Text>
            <Text> </Text>
            <Text
                variant="bodySmall"
                style={valueStyle}>{value}</Text>
        </View>
    );
}

