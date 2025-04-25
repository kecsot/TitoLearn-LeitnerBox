import React from "react";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import HtmlContentScrollViewContainer from "../../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";

export default function Layout() {

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView withSafeArea>
                <Drawer.Screen
                    options={{
                        title: 'FAQ',
                        headerShown: true,
                        headerLeft: () => <BaseDrawerToggleButton/>
                    }}
                />
                <HtmlContentScrollViewContainer
                    directory='protected'
                    view="faq"/>
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}