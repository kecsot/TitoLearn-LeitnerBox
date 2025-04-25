import React from "react";
import {Text, useTheme} from "react-native-paper";
import {CardSideType} from "../../types";
import {Image, View} from "react-native";
import {globalStyleConfig} from "../base/globalStyleConfig";
import {AuthenticatedFastImage} from "../../api/AuthenticatedFastImage";

type Props = {
    title: string
    side: CardSideType
}

export default function LearningCardSideView({title, side}: Props) {
    const theme = useTheme();

    return (
        <View style={{
            backgroundColor: theme.colors.background,
            borderRadius: globalStyleConfig.borderRadius,
            flex: 1
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: globalStyleConfig.gap
            }}>
                <Text variant='titleLarge'>
                    {title}
                </Text>
            </View>

            <View style={{
                gap: globalStyleConfig.gap,
                padding: globalStyleConfig.doubleGap
            }}>
                <Text variant='titleMedium'>
                    {side.text}
                </Text>

                {side.image_url && (
                    <AuthenticatedFastImage
                        source={{uri: side.image_url}}
                        resizeMode={"contain"}
                        style={{
                            height: 350,
                            width: '100%',
                        }}
                    />
                )}
            </View>
        </View>
    );
}
