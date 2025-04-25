import React from "react";
import {useRouter} from "expo-router";
import EditCardOfDeckFormContainer from "../../../../../../../../src/containers/card/form/EditCardOfDeckFormContainer";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import Toast from "react-native-toast-message";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {IconButton} from "react-native-paper";

type SearchParamType = {
    id: number
    deckId: number
}

export default function Page() {
    const router = useRouter()
    const {id, deckId} = useLocalSearchParamsAsNumber<SearchParamType>();

    const handleOnSuccess = () => router.back()
    const handleOnClose = () => router.back()

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}>

            <Drawer.Screen
                options={{
                    title: 'Edit Card',
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
                <EditCardOfDeckFormContainer
                    id={id}
                    deckId={deckId}
                    onSuccess={handleOnSuccess}/>
                <Toast/>{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </KeyboardAwareScrollView>

    );
}