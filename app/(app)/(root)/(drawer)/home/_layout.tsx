import React from "react";
import {Stack} from "expo-router";

export default function Layout() {

    return (
        <Stack>
            <Stack.Screen
                name="index"
            />

            <Stack.Screen
                name="card/form/add"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="card/form/edit/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="card/form/delete/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="common/imageModal/[url]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="deck/form/add"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="deck/form/edit/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="deck/form/delete/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="leitner/builder/box/delete/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="leitner/builder/box/edit/[id]"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="leitner/builder/build/information"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />

            <Stack.Screen
                name="learning/[id]"
                options={{
                    presentation: 'containedModal',
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack>
    );
}