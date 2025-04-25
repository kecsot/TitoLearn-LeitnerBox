import React from "react";
import {View} from "react-native";
import {Card, Text} from "react-native-paper";
import LottieView from "lottie-react-native";
import {AnimationObject} from "lottie-react-native/src/types";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export type AnimatedContentCardProps = {
    cardMode?: 'elevated' | 'outlined' | 'contained'
    title?: string
    description?: string
    lottieResource: string | AnimationObject | { uri: string }
    actionButtonsComponent?: React.ReactNode

    lottieContainerStyle?: StyleProp<ViewStyle>
}

export default function AnimatedContentCard({cardMode, title, description, lottieResource,lottieContainerStyle, actionButtonsComponent}: AnimatedContentCardProps) {

    return (
        <Card mode={cardMode || "elevated"}>
            <Card.Content style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 24,
            }}>
                <View style={{
                    height: 150,
                    width: 200,
                    backgroundColor: "white",
                    borderRadius: 50,
                    ...(lottieContainerStyle as object || {})
                }}>
                    <LottieView
                        source={lottieResource }
                        style={{width: "100%", height: "100%"}}
                        autoPlay
                        loop
                    />
                </View>

                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 12
                }}>
                    {title && (
                        <Text variant="titleLarge">{title}</Text>
                    )}
                    {description && (
                        <Text variant="bodyLarge" style={{textAlign: "center"}}>{description}</Text>
                    )}
                    {actionButtonsComponent && (
                        <View style={{
                            gap: 8
                        }}>
                            {actionButtonsComponent}
                        </View>
                    )}
                </View>
            </Card.Content>
        </Card>
    );
}
