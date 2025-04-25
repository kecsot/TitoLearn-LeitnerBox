import React from "react";
import {Stack} from "expo-router";


export default function Layout() {

    return (
        <Stack>
            <Stack.Screen
                name="privacy_policy"
                options={{
                    title: 'Privacy Policy',
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="terms_of_use"
                options={{
                    title: 'Terms of Use (EULA)',
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack>
    );
}