import React from "react";
import {Drawer} from "expo-router/drawer";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";
import {Introduction} from "../../../../../src/components/Introduction";
import {useRouter} from "expo-router";

export default function Layout() {

    const router = useRouter()

    const handleOnClose = () => {
        if (router.canGoBack()) {
            router.back()
        } else {
            router.replace('/app/(app)/(drawer)/home')
        }
    }

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView>
                <Drawer.Screen
                    options={{
                        title: 'Intro',
                        headerShown: true,
                        headerLeft: () => <BaseDrawerToggleButton/>
                    }}
                />
                <Introduction
                    onHeaderButtonPress={handleOnClose}
                    headerButtonTitle={'Skip'}
                    onActionButtonPress={handleOnClose}
                    actionButtonTitle={'Go to decks'}/>
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}