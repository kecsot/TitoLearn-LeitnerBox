import React from "react";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import HtmlContentScrollViewContainer from "../../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";
import {Button} from "react-native-paper";
import {Linking, View} from "react-native";

export default function Layout() {

    const itunesItemId = 6739852711

    const handleRate = () => Linking.openURL(
        `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id6739852711?action=write-review`
    );

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView withSafeArea>
                <Drawer.Screen
                    options={{
                        title: 'Rate Us',
                        headerShown: true,
                        headerLeft: () => <BaseDrawerToggleButton/>
                    }}
                />

                <View
                    style={{
                        flex: 1
                    }}>
                    <HtmlContentScrollViewContainer
                        directory='protected'
                        view="rate"/>
                </View>

                <Button
                    mode='outlined'
                    onPress={handleRate}>Rate</Button>

            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}