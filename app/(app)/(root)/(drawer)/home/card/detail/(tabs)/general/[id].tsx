import {View} from "react-native";
import React from "react";
import {IconButton, MD3Colors, Text} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Drawer} from "expo-router/drawer";
import CardDetailContainer from "../../../../../../../../../src/containers/card/CardDetailContainer";
import {
    ScreenViewQueryBoundaries
} from "../../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../../../../../../src/components/base/ScreenView";
import {
    QueryRefetchableScrollView
} from "../../../../../../../../../src/api/queries/refetch/components/QueryRefetchableScrollView";
import {
    QueryRefetchableContextProvider
} from "../../../../../../../../../src/api/queries/refetch/QueryRefetchableContextProvider";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type NumberSearchParamType = {
    id: number
    deckId: number
}
type SearchParamType = {
    mutable?: 'false'|'true'
}

export default function Page() {
    const router = useRouter()
    const {id, deckId} = useLocalSearchParamsAsNumber<NumberSearchParamType>();
    const {mutable} = useLocalSearchParams<SearchParamType>();

    const handleOnEditPressed = () => {
        router.push({
            pathname: '/(app)/(root)/(drawer)/home/card/form/edit/[id]',
            params: {
                id,
                deckId
            }
        })
    }

    const handleOnShowImage = (url: string) => {
        router.push({
            pathname: '/(app)/(root)/(drawer)/home/common/imageModal/[url]',
            params: {
                url: url,
            }
        })
    }

    const handleOnDeletePressed = () => {
        router.push({
            pathname: '/(app)/(root)/(drawer)/home/card/form/delete/[id]',
            params: {
                id,
                deckId
            }
        })
    }

    return (
        <QueryRefetchableContextProvider>
            <QueryRefetchableScrollView>
                <ScreenView>
                    <Drawer.Screen
                        options={{
                            headerRight: () => (
                                (!mutable) && (
                                    <View style={{flexDirection: 'row'}}>
                                        <IconButton
                                            icon="pencil"
                                            size={20}
                                            onPress={handleOnEditPressed}
                                        />
                                        <IconButton
                                            icon="delete"
                                            size={20}
                                            iconColor={MD3Colors.error50}
                                            onPress={handleOnDeletePressed}
                                        />
                                    </View>
                                )
                            ),
                        }}
                    />
                    <ScreenViewQueryBoundaries>
                        <CardDetailContainer
                            cardId={id}
                            deckId={deckId}
                            onShowImage={handleOnShowImage}
                        />
                    </ScreenViewQueryBoundaries>
                </ScreenView>
            </QueryRefetchableScrollView>
        </QueryRefetchableContextProvider>
    );
}