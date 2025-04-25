import React from 'react';
import {useRouter} from "expo-router";
import {Alert, View} from "react-native";
import PaywallContainer from "../../../../../src/containers/iap/PaywallContainer";
import {ScreenViewQueryBoundaries} from "../../../../../src/components/base/query/ScreenViewQueryBoundaries";
import {Button, Text} from "react-native-paper";
import {Drawer} from "expo-router/drawer";
import ScreenView from "../../../../../src/components/base/ScreenView";
import {BaseDrawerToggleButton} from "../../../../../src/components/base/BaseDrawerToggleButton";
import LottieView from "lottie-react-native";


const Layout = () => {
    const router = useRouter();

    const handleDismiss = () => {
        if (router.canGoBack()) {
            router.back()
        } else {
            router.replace({
                pathname: '/(app)/(root)/(drawer)/home',
            })
        }
    }

    const handleOnRestoreError = () => Alert.alert('Failed to restore')
    //  const handleOnRestoreComplete = () => Alert.alert('Restore completed')

    const handleOnPurchaseError = () => Alert.alert('Purchase failed')
    const handleOnPurchaseCancelled = () => Alert.alert('Purchase cancelled')
    //   const handleOnPurchaseCompleted = () => Alert.alert('Purchase completed', 'Thank you for your purchase!')

    return (
        <>
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
            />

            <PaywallContainer
                productId={'tito_membership'}

                onRestoreError={handleOnRestoreError}

                onPurchaseCancelled={handleOnPurchaseCancelled}
                onPurchaseError={handleOnPurchaseError}

                onDismiss={handleDismiss}
                AcquiredComponent={() => (
                    <ScreenView withSafeArea>
                        <Drawer.Screen
                            options={{
                                title: 'Subscription',
                                headerShown: true,
                                headerLeft: () => <BaseDrawerToggleButton/>
                            }}
                        />
                        <ScreenViewQueryBoundaries>
                            <View style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 16
                            }}>
                                <LottieView
                                    source={require('../../../../../assets/lottie/star.json')}
                                    style={{
                                        height: 200,
                                        width: 200,
                                    }}
                                    speed={0.5}
                                    autoPlay
                                    loop
                                />
                                <Text variant={'headlineMedium'}>Your subscription is active!</Text>
                            </View>
                            <Button
                                mode={'contained'}
                                onPress={handleDismiss}>Go to learn</Button>
                        </ScreenViewQueryBoundaries>
                    </ScreenView>
                )}
            />
        </>
    )
};

export default Layout;