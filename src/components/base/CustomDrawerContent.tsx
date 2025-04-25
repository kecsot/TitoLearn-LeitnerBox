import {View} from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useNavigation} from 'expo-router';
import {DrawerActions, useTheme} from '@react-navigation/native';
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {globalStyleConfig} from "./globalStyleConfig";
import {Text} from "react-native-paper";

type Props = DrawerContentComponentProps & {}

export default function CustomDrawerContent({...rest}: Props) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();
    const theme = useTheme();

    const closeDrawer = () => {
        navigation.dispatch(DrawerActions.closeDrawer())
    }
    return (
        <View
            style={{
                flex: 1
            }}
        >
            <DrawerContentScrollView {...rest} scrollEnabled={false}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: globalStyleConfig.doubleGap,
                    paddingVertical: 20,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            color: theme.colors.primary,
                            fontWeight: '900'
                        }} variant="headlineLarge">{'TitoLearn'}</Text>
                        <Text variant="bodyLarge">{'Leitner Box Flashcards'}</Text>
                    </View>
                </View>

                <DrawerItemList {...rest} />
            </DrawerContentScrollView>
        </View>
    )
}