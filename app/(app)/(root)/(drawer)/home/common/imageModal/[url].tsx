import React from "react";
import {useLocalSearchParams} from "expo-router";
import ScreenView from "../../../../../../../src/components/base/ScreenView";
import {ScreenViewQueryBoundaries} from "../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {Drawer} from "expo-router/drawer";
import Toast from "react-native-toast-message";
import {AuthenticatedFastImage} from "../../../../../../../src/api/AuthenticatedFastImage";


type SearchParamType = {
    url: string;
}

export default function Page() {
    const {url} = useLocalSearchParams<SearchParamType>()

    return (
        <ScreenView>
            <Drawer.Screen
                options={{
                    title: `View image`,
                }}
            />
            <ScreenViewQueryBoundaries>
                <AuthenticatedFastImage
                    source={{uri: url}}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    resizeMode={"contain"}
                />
                <Toast/>{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}