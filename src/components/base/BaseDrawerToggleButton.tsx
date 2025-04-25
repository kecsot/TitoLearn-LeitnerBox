import {DrawerToggleButton} from "@react-navigation/drawer";
import {IconButton, useTheme} from "react-native-paper";
import {DrawerActions, ParamListBase} from "@react-navigation/native";
import React from "react";
import {useNavigation} from "expo-router";
import type {DrawerNavigationProp} from "@react-navigation/drawer/src/types";


export const BaseDrawerToggleButton = () => {

    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return (
        <IconButton
            icon="menu"
            size={20}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
    )
}