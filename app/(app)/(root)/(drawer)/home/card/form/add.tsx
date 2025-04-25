import React, {useLayoutEffect} from "react";
import {useNavigation, useRouter} from "expo-router";
import AddCardToDeckFormContainer from "../../../../../../../src/containers/card/form/AddCardToDeckFormContainer";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {useLocalSearchParamsAsNumber} from "../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import Toast from "react-native-toast-message";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {IconButton} from "react-native-paper";

type SearchParamType = {
    deckId: number
}

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();
    const {deckId} = useLocalSearchParamsAsNumber<SearchParamType>();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Add Card to deck`,
        });
    }, [navigation]);

    const handleOnSuccess = () => {
        Toast.show({
            text1: 'Added',
            visibilityTime: 600,
            position: "top",
        })
    }

    const handleOnClose = () => router.back();

    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}>

            <Drawer.Screen
                options={{
                    title: 'Add card to deck',
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
                <AddCardToDeckFormContainer deckId={deckId} onSuccess={handleOnSuccess}/>
                <Toast/>{/*FIXME*/}
            </ScreenViewQueryBoundaries>

        </KeyboardAwareScrollView>
    );
}