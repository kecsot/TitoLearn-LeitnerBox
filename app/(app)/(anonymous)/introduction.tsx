import React from "react";
import {router} from "expo-router";
import {Introduction} from "../../../src/components/Introduction";
import {useAsyncStorage} from "../../../src/hooks/useAsyncStorage";

export default function Page() {

    const {
        setValue
    } = useAsyncStorage('introduction-visited-reset1', false)

    const handleOnDonePressed = () =>
        setValue(true)
            .then(() => router.replace('/(app)/login'))

    return (
        <Introduction
            onHeaderButtonPress={handleOnDonePressed}
            headerButtonTitle={'Skip'}
            onActionButtonPress={handleOnDonePressed}
            actionButtonTitle={'Login / Sign up'}/>
    );
}