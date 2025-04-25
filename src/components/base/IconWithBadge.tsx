import React from "react";
import {Badge, List} from "react-native-paper";
import {View} from "react-native";
import {IconSource} from "react-native-paper/src/components/Icon";

type Props = {
    text: string
    icon: IconSource;
}

export const IconWithBadge = ({text, icon}: Props) => {

    return (
        <View style={{
            minWidth: 38
        }}>
            <Badge>{text}</Badge>
            <List.Icon
                style={{
                    marginTop: -6,
                    marginRight: 4
                }}
                icon={icon}/>
        </View>
    );
}

