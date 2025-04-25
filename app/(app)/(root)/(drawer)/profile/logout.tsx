import React from "react";
import {Drawer} from "expo-router/drawer";
import auth from "@react-native-firebase/auth";
import {Button, Card} from "react-native-paper";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {useNavigation} from "expo-router";
import Purchases from "react-native-purchases";

export default function Layout() {
    const navigation = useNavigation();

    const handleLogout = () => auth().signOut()

    const handleCancel = () => navigation.goBack()

    return (
        <ScreenView>
            <Drawer.Screen
                options={{
                    title: 'Logout',
                }}
            />
            <Card>
                <Card.Title title={"Are you sure to log out?"}/>
                <Card.Actions>
                    <Button
                        mode="outlined"
                        onPress={handleLogout}>Yes</Button>
                    <Button
                        mode="contained"
                        onPress={handleCancel}>No</Button>
                </Card.Actions>
            </Card>
        </ScreenView>
    );
}