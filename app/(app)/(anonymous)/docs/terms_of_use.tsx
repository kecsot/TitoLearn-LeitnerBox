import React from "react";
import {Drawer} from "expo-router/drawer";
import ScreenView from "../../../../src/components/base/ScreenView";
import {ScreenViewQueryBoundaries} from "../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {BaseDrawerToggleButton} from "../../../../src/components/base/BaseDrawerToggleButton";
import HtmlContentScrollViewContainer from "../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import {Stack, useRouter} from "expo-router";
import {Button, IconButton} from "react-native-paper";

export default function Layout() {

    const router = useRouter()
    const handleOnClose = () => router.back()

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView withSafeArea>
                <Stack.Screen
                    options={{
                        title: 'Terms of Use (EULA)',
                        headerShown: true,
                        headerLeft: () => <IconButton
                            icon="arrow-left"
                            size={20}
                            onPress={handleOnClose}
                        />
                    }}
                />
                <HtmlContentScrollViewContainer
                    directory='public'
                    view="terms_of_use"/>
                <Button onPress={handleOnClose}>Close</Button>
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}