import {Tabs, useLocalSearchParams, useNavigation} from "expo-router";
import React, {useLayoutEffect} from "react";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {useGlobalSearchParamsAsNumber} from "../../../../../../../../src/hooks/useGlobalSearchParameterAsNumber";

type NumberSearchParamType = {
    id: number
    deckId: number
}
type SearchParamType = {
    mutable?: 'false'|'true'
}

export default function _layout() {

    const {id, deckId} = useGlobalSearchParamsAsNumber<NumberSearchParamType>();
    const {mutable} = useLocalSearchParams<SearchParamType>();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Card detail',
        });
    }, [navigation]);

    const TabBarIcon = (props: {
        name: React.ComponentProps<typeof MaterialCommunityIcon>['name'];
        color?: string;
    }) => <MaterialCommunityIcon size={28} direction={"rtl"} {...props} />;

    return (
        <Tabs screenOptions={{
            unmountOnBlur: true
        }}>
            <Tabs.Screen
                name="general/[id]"
                options={{
                    title: `General`,
                    tabBarIcon: ({color}) => <TabBarIcon name="auto-fix" color={color}/>,
                    href: {
                        pathname: '/(app)/(root)/(drawer)/home/card/detail/(tabs)/general/[id]',
                        params: {
                            id: id,
                            deckId: deckId,
                            mutable: mutable
                        },
                    },
                }}
            />
            <Tabs.Screen
                name="history/[id]"
                options={{
                    title: `Card History`,
                    tabBarIcon: ({color}) => <TabBarIcon name="history" color={color}/>,
                    href: {
                        pathname: '/(app)/(root)/(drawer)/home/card/detail/(tabs)/history/[id]',
                        params: {
                            id: id,
                            deckId: deckId
                        },
                    },
                }}
            />
        </Tabs>);
}

