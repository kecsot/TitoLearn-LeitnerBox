import React from "react";
import {Redirect, Slot} from "expo-router";
import LoadingView from "../../../src/components/base/LoadingView";
import {useFirebaseUser} from "../../../src/hooks/useFirebaseUser";
import {useQueryClient} from "@tanstack/react-query";
import {useAsyncStorage} from "../../../src/hooks/useAsyncStorage";


export default function Layout() {

    const queryClient = useQueryClient()
    const [user, isInitialized] = useFirebaseUser()

    const {
        isInitialized: isIntroductionInitialized,
        value: isIntroductionVisited
    } = useAsyncStorage('introduction-visited-reset1', false)

    if (!isInitialized || !isIntroductionInitialized) {
        return <LoadingView/>;
    }

    if (!user) {
        queryClient.removeQueries()

        if (!isIntroductionVisited) {
            return <Redirect href="/(anonymous)/introduction"/>;
        }
        return <Redirect href="/login"/>;
    }

    return (
        <Slot/>
    );
}