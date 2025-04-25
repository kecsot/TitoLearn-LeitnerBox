import React from "react";
import {useRouter} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {
    ScreenViewQueryBoundaries
} from "../../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import LeitnerSystemBoxDeleteViewContainer
    from "../../../../../../../../../src/containers/leitner/box/LeitnerSystemBoxDeleteViewContainer";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import Toast from "react-native-toast-message";
import {IconButton} from "react-native-paper";
import ScreenView from "../../../../../../../../../src/components/base/ScreenView";

type SearchParamsType = {
    id: number,
    leitnerSystemId: number
}

export default function Page() {
    const {id, leitnerSystemId} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnSuccess = () => router.back()
    const handleOnCancel = () => router.back()

    return (
        <ScreenView>
            <Drawer.Screen
                options={{
                    headerShown: true,
                    title: 'Delete Box',
                    headerLeft: () => (
                        <IconButton
                            icon="close"
                            size={20}
                            onPress={handleOnCancel}
                        />
                    ),
                }}
            />
            <ScreenViewQueryBoundaries>
                <LeitnerSystemBoxDeleteViewContainer
                    id={id}
                    leitnerSystemId={leitnerSystemId}
                    onSuccess={handleOnSuccess}
                    onCancel={handleOnCancel}
                />
                <Toast />{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}
