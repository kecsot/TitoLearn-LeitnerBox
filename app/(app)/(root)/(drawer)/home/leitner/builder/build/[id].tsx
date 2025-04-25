import React from "react";
import {useRouter} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import LeitnerSystemBuilderContainer
    from "../../../../../../../../src/containers/leitner/LeitnerSystemBuilderContainer";
import {LeitnerSystemBoxType} from "../../../../../../../../src/types";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";
import {IconButton} from "react-native-paper";

type SearchParamsType = {
    id: number
}

export default function Page() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnEditPressed = (box: LeitnerSystemBoxType) => router.push({
        pathname: "/(app)/(root)/(drawer)/home/leitner/builder/box/edit/[id]",
        params: {
            id: box.id,
            leitnerSystemId: id
        }
    })

    const handleOnDeletePressed = (box: LeitnerSystemBoxType) => router.push({
        pathname: "/(app)/(root)/(drawer)/home/leitner/builder/box/delete/[id]",
        params: {
            id: box.id,
            leitnerSystemId: id
        }
    })

    const handleOnInformationPressed = () => router.push('/home/leitner/builder/build/information')

    return (
        <>
            <Drawer.Screen
                options={{
                    headerShown: true,
                    title: 'Leitner System Builder',
                    headerRight: () => (
                        <IconButton
                            icon="information"
                            size={20}
                            onPress={handleOnInformationPressed}
                        />
                    ),
                }}
            />
            <ScreenViewQueryBoundaries>
                <LeitnerSystemBuilderContainer
                    id={id}
                    onEditPressed={item => handleOnEditPressed(item)}
                    onDeletePressed={item => handleOnDeletePressed(item)}
                />
            </ScreenViewQueryBoundaries>
        </>
    );
}
