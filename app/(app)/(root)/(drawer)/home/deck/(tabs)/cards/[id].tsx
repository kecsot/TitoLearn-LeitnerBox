import {useRouter} from "expo-router";
import CardListCardContainer from "../../../../../../../../src/containers/card/CardListCardContainer";
import React from "react";
import {CardType} from "../../../../../../../../src/types";
import {IconButton} from "react-native-paper";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../../../../../src/components/base/ScreenView";
import {useLocalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type SearchParamsType = {
    id: number
}

export default function Cards() {
    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const router = useRouter()

    const handleOnCardViewPressed = (card: CardType) => router.push({
        pathname: '/(app)/(root)/(drawer)/home/card/detail/(tabs)/general/[id]',
        params: {
            id: card.id,
            deckId: id
        }
    })

    const handleOnAddCardToDeckPressed = () => router.push({
        pathname: "/(app)/(root)/(drawer)/home/card/form/add",
        params: {
            deckId: id,
        }
    })

    return (
        <ScreenView
            forFlatList>
            <Drawer.Screen
                options={{
                    headerRight: () => (
                        <IconButton
                            icon="plus"
                            size={20}
                            onPress={handleOnAddCardToDeckPressed}
                        />
                    ),
                }}
            />
            <ScreenViewQueryBoundaries>
                <CardListCardContainer
                    deckId={id}
                    onItemViewDetailPressed={handleOnCardViewPressed}/>
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}

