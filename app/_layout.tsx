import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Slot, useNavigationContainerRef} from 'expo-router';
import {Alert, AppRegistry, useColorScheme} from 'react-native';
import {Button, MD3DarkTheme, MD3LightTheme, PaperProvider} from "react-native-paper";
import {CustomQueryClientProvider} from "../src/api/queries/CustomQueryClientProvider";
import Toast from "react-native-toast-message";
import {CardDataGuardProvider} from "../src/components/card/dataGuard/context/CardDataGuardProvider";
import Purchases from "react-native-purchases";
import {useEffect} from "react";
import {Platform} from "expo-modules-core";
import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

export {
    ErrorBoundary,
} from 'expo-router';

const navigationIntegration = Sentry.reactNavigationIntegration({
    enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
    tracesSampleRate: 0.0,
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const ref = useNavigationContainerRef();

    const isDarkTheme = colorScheme === 'dark'
    const MD3Theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme

    const defaultNavTheme = isDarkTheme ? DarkTheme : DefaultTheme
    const navTheme = {
        ...defaultNavTheme,
        colors: {
            ...defaultNavTheme.colors,
            primary: '#FB8C01'
        }
    }

    useEffect(() => {
        if (ref?.current) {
            navigationIntegration.registerNavigationContainer(ref);
        }
    }, [ref]);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            if (!process.env.EXPO_PUBLIC_RC_IOS) {
                Alert.alert(
                    'Error configure RC',
                    'RevenueCat API not provided'
                )
            } else {
                Purchases.configure({apiKey: process.env.EXPO_PUBLIC_RC_IOS});
            }
        }
        //  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
        //  Purchases.setLogHandler(console.log)

    }, []);

    return (
        <PaperProvider theme={MD3Theme}>
            <ThemeProvider value={navTheme}>
                <CustomQueryClientProvider>
                    <CardDataGuardProvider>
                        <Slot/>
                        <Toast/>
                    </CardDataGuardProvider>
                </CustomQueryClientProvider>
            </ThemeProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent('lb-react-native', () => Sentry.wrap(RootLayout));