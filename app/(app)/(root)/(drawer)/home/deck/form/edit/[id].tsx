import React from "react";
import {useRouter} from "expo-router";
import EditDeckFormContainer from "../../../../../../../../src/containers/deck/form/EditDeckFormContainer";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import Toast from "react-native-toast-message";
import {IconButton} from "react-native-paper";

type SearchParamType = {
    id: number
}

export default function Page() {
    const router = useRouter()
    const {id} = useLocalSearchParamsAsNumber<SearchParamType>()

    const handleOnSuccess = () => router.back()
    const handleOnClose = () => router.back()

    return (
        <ScrollView
            keyboardShouldPersistTaps={'handled'}>
            <KeyboardAvoidingView>
                <Drawer.Screen
                    options={{
                        title: `Edit Deck`,
                        headerLeft: () => (
                            <IconButton
                                icon="close"
                                size={20}
                                onPress={handleOnClose}
                            />
                        ),
                    }}
                />
                <ScreenViewQueryBoundaries>
                    <EditDeckFormContainer
                        id={id}
                        onSuccess={handleOnSuccess}/>
                    <Toast />{/*FIXME*/}
                </ScreenViewQueryBoundaries>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}