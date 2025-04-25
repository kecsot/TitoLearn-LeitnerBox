import React from "react";
import {useRouter} from "expo-router";
import AddDeckFormContainer from "../../../../../../../src/containers/deck/form/AddDeckFormContainer";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {KeyboardAvoidingView, ScrollView} from "react-native";
import Toast from "react-native-toast-message";
import {IconButton} from "react-native-paper";

export default function Page() {
    const router = useRouter()

    const handleOnSuccess = () => router.back()
    const handleOnClose = () => router.back()

    return (
        <ScrollView
            keyboardShouldPersistTaps={'handled'}>
            <KeyboardAvoidingView>
                <Drawer.Screen
                    options={{
                        title: `Add Deck`,
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
                    <AddDeckFormContainer
                        onSuccess={handleOnSuccess}/>
                    <Toast />{/*FIXME*/}
                </ScreenViewQueryBoundaries>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}