import {Tabs, useNavigation} from "expo-router";
import React, {useLayoutEffect} from "react";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {useLocalSearchParamsAsNumber} from "../../../../../../../src/hooks/useLocalSearchParameterAsNumber";

type SearchParamsType = {
    id: number
}


export default function _layout() {

    const {id} = useLocalSearchParamsAsNumber<SearchParamsType>();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Deck detail',
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
                        pathname: '/(app)/(root)/(drawer)/home/deck/(tabs)/general/[id]',
                        params: {
                            id: id,
                        },
                    },
                }}
            />
            <Tabs.Screen
                name="cards/[id]"
                options={{
                    title: `Cards`,
                    tabBarIcon: ({color}) => <TabBarIcon name="cards" color={color}/>,
                    href: {
                        pathname: '/(app)/(root)/(drawer)/home/deck/(tabs)/cards/[id]',
                        params: {
                            id: id,
                        },
                    },
                }}
            />
            <Tabs.Screen
                name="history/[id]"
                options={{
                    title: `Learning history`,
                    tabBarIcon: ({color}) => <TabBarIcon name="history" color={color}/>,
                    href: {
                        pathname: '/(app)/(root)/(drawer)/home/deck/(tabs)/history/[id]',
                        params: {
                            id: id,
                        },
                    },
                }}
            />
        </Tabs>);
}

