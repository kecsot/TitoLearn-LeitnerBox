import React from "react";
import {useRouter} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {
    ScreenViewQueryBoundaries
} from "../../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import LeitnerSystemBoxEditFormContainer
    from "../../../../../../../../../src/containers/leitner/box/form/LeitnerSystemBoxEditFormContainer";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import Toast from "react-native-toast-message";

type SearchParamsType = {
    id: number
    leitnerSystemId: number
}

export default function Page() {
    const {id, leitnerSystemId} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnSuccess = () => router.back()

    return (
        <>
            <Drawer.Screen
                options={{
                    headerShown: true,
                    title: 'Edit Box',
                }}
            />
            <ScreenViewQueryBoundaries>
                <LeitnerSystemBoxEditFormContainer
                    id={id}
                    leitnerSystemId={leitnerSystemId}
                    onSuccess={handleOnSuccess}
                />
                <Toast />{/*FIXME*/}
            </ScreenViewQueryBoundaries>
        </>
    );
}
