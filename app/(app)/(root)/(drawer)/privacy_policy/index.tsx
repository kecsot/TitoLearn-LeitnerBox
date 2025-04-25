import React from "react";
import {Drawer} from "expo-router/drawer";
import ScreenView from "../../../../../src/components/base/ScreenView";
import HtmlContentScrollViewContainer from "../../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";

export default function Layout() {

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView>
                <Drawer.Screen
                    options={{
                        title: 'Privacy Policy',
                        headerShown: true,
                        headerLeft: () => <BaseDrawerToggleButton/>
                    }}
                />
                <HtmlContentScrollViewContainer
                    directory='public'
                    view="privacy_policy"/>
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}