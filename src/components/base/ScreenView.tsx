import React, {ReactNode} from "react";
import {SafeAreaView, View} from "react-native";
import {globalStyleConfig} from "./globalStyleConfig";
import {ViewProps} from "react-native/Libraries/Components/View/ViewPropTypes";

type Props = ViewProps & {
    children?: ReactNode,
    forFlatList?: boolean,
    fullHeight?: boolean,
    withSafeArea?: boolean
}

export default function ScreenView({
                                       children,
                                       forFlatList = false,
                                       fullHeight = false,
                                       withSafeArea = false,
                                       ...rest
                                   }: Props) {

    const renderScreenView = () => (
        <View
            style={{
                gap: globalStyleConfig.gap,
                paddingVertical: !forFlatList ? globalStyleConfig.gap : 0,
                paddingHorizontal: !forFlatList ? globalStyleConfig.gap : 0,
                flex: 1
            }}
            {...rest}
        >

            {children}

        </View>
    )

    // v2: HOC?
    if (withSafeArea) {
        return (
            <SafeAreaView style={{flex: 1}}>
                {renderScreenView()}
            </SafeAreaView>
        )
    }

    return renderScreenView();
}
