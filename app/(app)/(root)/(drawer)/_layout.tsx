import React from "react";
import {Drawer} from "expo-router/drawer";
import CustomDrawerContent from "../../../../src/components/base/CustomDrawerContent";
import {useTheme} from "@react-navigation/native";
import {Icon} from "react-native-paper";
import {globalStyleConfig} from "../../../../src/components/base/globalStyleConfig";

export default function Layout() {

    const theme = useTheme();

    const getDrawerIconFn = (source: string, important: boolean = false) => {
        return () => <Icon
            source={source}
            size={24}
            color={important ? globalStyleConfig.color.primary : theme.colors.text}
        />
    }

    return (
        <Drawer
            screenOptions={{
                swipeEnabled: false,
                headerShown: false,
                unmountOnBlur: true
            }}
            drawerContent={
                (props) =>
                    <CustomDrawerContent
                        {...props} />
            }
        >
            <Drawer.Screen
                name="home"
                options={{
                    title: 'Decks',
                    drawerIcon: getDrawerIconFn('inbox-multiple', true),
                }}
            />

            <Drawer.Screen
                name="subscription"
                options={{
                    title: 'Subscription',
                    drawerIcon: getDrawerIconFn('star-box'),
                }}
            />
            <Drawer.Screen
                name="rate"
                options={{
                    title: 'Rate us',
                    drawerIcon: getDrawerIconFn('star'),
                }}
            />
            <Drawer.Screen
                name="faq"
                options={{
                    title: 'FAQ',
                    drawerIcon: getDrawerIconFn('frequently-asked-questions'),
                }}
            />
            <Drawer.Screen
                name="introduction"
                options={{
                    title: 'Introduction',
                    drawerIcon: getDrawerIconFn('animation-play-outline'),
                }}
            />
            <Drawer.Screen
                name="privacy_policy"
                options={{
                    title: 'Privacy Policy',
                    drawerIcon: getDrawerIconFn('file-document'),
                }}
            />
            <Drawer.Screen
                name="terms_of_use"
                options={{
                    title: 'Terms of Use (EULA)',
                    drawerIcon: getDrawerIconFn('file-document'),
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    drawerIcon: getDrawerIconFn('account-circle'),
                }}
            />
        </Drawer>
    );
}