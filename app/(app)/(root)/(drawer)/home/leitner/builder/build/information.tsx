import React from "react";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import HtmlContentScrollViewContainer
    from "../../../../../../../../src/containers/pageContent/HtmlContentScrollViewContainer";
import ScreenView from "../../../../../../../../src/components/base/ScreenView";
import {Button} from "react-native-paper";
import Toast from "react-native-toast-message";


export default function Page() {

    return (
        <ScreenViewQueryBoundaries>
            <ScreenView>
                <Drawer.Screen
                    options={{
                        title: 'Information',
                        headerShown: true,
                    }}
                />
                <HtmlContentScrollViewContainer
                    directory='protected'
                    view="leitnerbox_builder_information"/>

                <Toast />{/*FIXME*/}
            </ScreenView>
        </ScreenViewQueryBoundaries>
    );
}
