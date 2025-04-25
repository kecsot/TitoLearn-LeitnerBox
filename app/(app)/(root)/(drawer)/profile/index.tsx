import React from "react";
import {Drawer} from "expo-router/drawer";
import auth from "@react-native-firebase/auth";
import {Button} from "react-native-paper";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {useRouter} from "expo-router";
import {View} from "react-native";
import {LabelValue} from "../../../../../src/components/base/LabelValue";

export default function Layout() {
    const router = useRouter();
    const user = auth().currentUser;

    const handleLogout = () => router.push({
        pathname: '/(app)/(root)/(drawer)/profile/logout',
    })

    const handleDeleteAccount = () => router.push({
        pathname: '/(app)/(root)/(drawer)/profile/delete_account',
    })

    return (
        <ScreenView withSafeArea>
            <Drawer.Screen
                options={{
                    title: 'Profile',
                    headerShown: true,
                    headerLeft: () => <BaseDrawerToggleButton/>
                }}
            />
            <View style={{
                gap: 8,
                display: 'flex',
                justifyContent: 'center',
                flex: 1
            }}>
                <LabelValue
                    label=" You are logged in as"
                    value={user?.email ?? ''}/>

                <Button
                    mode="outlined"
                    icon={'logout'}
                    onPress={handleLogout}>Logout</Button>
                <Button
                    mode="outlined"
                    icon={'delete-alert'}
                    textColor={'red'}
                    onPress={handleDeleteAccount}>Delete account</Button>
                <View></View>
            </View>
        </ScreenView>
    );
}