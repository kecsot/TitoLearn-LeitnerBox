import {View} from "react-native";
import {useRouter} from "expo-router";
import React from "react";
import {IconButton, MD3Colors} from "react-native-paper";
import {Drawer} from "expo-router/drawer";
import DeckDetailCardContainer from "../../../../../../../../src/containers/deck/DeckDetailCardContainer";
import DeckLeitnerSystemDetailCardContainer
    from "../../../../../../../../src/containers/deck/DeckLeitnerSystemDetailCardContainer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../../../../../src/components/base/ScreenView";
import DeckContinueLearningCardContainer
    from "../../../../../../../../src/containers/deck/learn/DeckContinueLearningCardContainer";
import DeckPrepareLearningCardContainer
    from "../../../../../../../../src/containers/deck/learn/DeckPrepareLearningCardContainer";
import {
    QueryRefetchableContextProvider
} from "../../../../../../../../src/api/queries/refetch/QueryRefetchableContextProvider";
import {
    QueryRefetchableScrollView
} from "../../../../../../../../src/api/queries/refetch/components/QueryRefetchableScrollView";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type SearchParamsType = {
    id: number
}

export default function Page() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnLearningStarted = (learningId: number) => router.push(`/(app)/(root)/(drawer)/home/learning/${learningId}`)

    const handleOnEditDeckPressed = () => router.push({
        pathname: "/(app)/(root)/(drawer)/home/deck/form/edit/[id]",
        params: {
            id,
        }
    })

    const handleOnEditLeitnerSystemPressed = (id: number) => router.push({
        pathname: "/(app)/(root)/(drawer)/home/leitner/builder/build/[id]",
        params: {
            id,
        }
    })

    const handleOnDeckDeletePressed = () => router.push({
        pathname: "/(app)/(root)/(drawer)/home/deck/form/delete/[id]",
        params: {
            id,
        }
    })

    return (
        <QueryRefetchableContextProvider>
            <QueryRefetchableScrollView>
                <ScreenView>
                    <Drawer.Screen
                        options={{
                            headerRight: () => (
                                <View style={{flexDirection: 'row'}}>
                                    <IconButton
                                        icon="pencil"
                                        size={20}
                                        onPress={handleOnEditDeckPressed}
                                    />
                                    <IconButton
                                        icon="delete"
                                        size={20}
                                        iconColor={MD3Colors.error50}
                                        onPress={handleOnDeckDeletePressed}
                                    />
                                </View>
                            ),
                        }}
                    />

                    <ScreenViewQueryBoundaries>
                        <DeckContinueLearningCardContainer
                            deckId={id}
                            onLearningStarted={handleOnLearningStarted}
                        />

                        <DeckPrepareLearningCardContainer
                            deckId={id}
                            onLearningStarted={handleOnLearningStarted}
                        />

                        <DeckDetailCardContainer
                            id={id}
                        />

                        <DeckLeitnerSystemDetailCardContainer
                            deckId={id}
                            onEdit={handleOnEditLeitnerSystemPressed}/>

                    </ScreenViewQueryBoundaries>
                </ScreenView>
            </QueryRefetchableScrollView>
        </QueryRefetchableContextProvider>
    );
}