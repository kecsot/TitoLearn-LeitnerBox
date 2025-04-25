import React from "react";
import {ScreenViewQueryBoundaries} from "../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../src/components/base/ScreenView";
import HtmlContentScrollViewContainer from "../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import {Button, IconButton} from "react-native-paper";
import {Stack, useRouter} from "expo-router";

export default function Layout() {

    const router = useRouter()
    const handleOnClose = () => router.back()

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView withSafeArea>
                <Stack.Screen
                    options={{
                        title: 'Privacy Policy',
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
                    view="privacy_policy"/>
                <Button onPress={handleOnClose}>Close</Button>
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}