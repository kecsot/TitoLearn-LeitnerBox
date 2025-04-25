import React from "react";
import {DeckType} from "../../../../../src/types";
import {useRouter} from "expo-router";
import {ActivityIndicator, IconButton} from "react-native-paper";
import DeckListContainer from "../../../../../src/containers/deck/DeckListContainer";
import {Drawer} from "expo-router/drawer";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";
import SubscriptionRequestStatusBarContainer from "../../../../../src/containers/iap/SubscriptionRequestStatusBarContainer";

export default function Page() {
    const router = useRouter()

    const handleOnItemViewDetail = (item: DeckType) => router.push({
        pathname: "/(app)/(root)/(drawer)/home/deck/(tabs)/general/[id]",
        params: {
            id: item.id
        }
    })

    const handleRequestSubscribe = (productId: string) => {
        router.push({
            pathname: "/(app)/(root)/(drawer)/subscription",
        })
    }

    const handleShowFaqClick = () => router.push({
        pathname: "/(app)/(root)/(drawer)/faq",
    })

    const handleShowIntroductionClick = () => router.push({
        pathname: "/(app)/(root)/(drawer)/introduction",
    })

    return (
        <ScreenView forFlatList>
            <Drawer.Screen
                options={{
                    headerShown: true,
                    title: 'Decks',
                    headerLeft: () => <BaseDrawerToggleButton/>,
                    headerRight: () => (
                        <IconButton
                            icon="plus"
                            size={20}
                            onPress={() => router.push('/(app)/(root)/(drawer)/home/deck/form/add')}
                        />
                    ),
                }}
            />
            <ScreenViewQueryBoundaries loading={ <ActivityIndicator animating size="small" />}>
                <SubscriptionRequestStatusBarContainer
                    productId={"tito_membership"}
                    onRequestSubscribe={handleRequestSubscribe}
                    onShowFaqClick={handleShowFaqClick}
                    onShowIntroductionClick={handleShowIntroductionClick}
                />
            </ScreenViewQueryBoundaries>
            <ScreenViewQueryBoundaries>
                <DeckListContainer
                    onItemViewDetailPressed={handleOnItemViewDetail}/>
            </ScreenViewQueryBoundaries>
        </ScreenView>
    );
}
