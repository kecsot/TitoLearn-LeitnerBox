import React from "react";
import {useRouter} from "expo-router";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import Drawer from "expo-router/drawer";
import DeckDeleteViewContainer from "../../../../../../../../src/containers/deck/DeckDeleteViewContainer";
import ScreenView from "../../../../../../../../src/components/base/ScreenView";
import Toast from "react-native-toast-message";
import {IconButton} from "react-native-paper";

type SearchParamsType = {
    id: number
}

export default function Page() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnSuccess = () => router.dismiss(2)

    const handleOnCancel = () => router.back()

    return (
        <ScreenView>
            <Drawer.Screen
                options={{
                    headerShown: true,
                    title: 'Delete Deck',
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
                <DeckDeleteViewContainer
                    id={id}
                    onSuccess={handleOnSuccess}
                    onCancel={handleOnCancel}/>
                <Toast />{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}
