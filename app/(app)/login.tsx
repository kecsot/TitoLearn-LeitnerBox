import React, {useEffect, useState} from "react";
import {Button, Text} from "react-native-paper";
import auth from '@react-native-firebase/auth';
import {useRouter} from "expo-router";
import {useFirebaseUser} from "../../src/hooks/useFirebaseUser";
import {Pressable, View} from "react-native";
import ScreenView from "../../src/components/base/ScreenView";
import * as AppleAuthentication from 'expo-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from "react-native-toast-message";
import {globalStyleConfig} from "../../src/components/base/globalStyleConfig";
import {AcceptTerms} from "../../src/components/login/AcceptTerms";
import * as Sentry from "@sentry/react-native";

GoogleSignin.configure({
    webClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
});

export default function Layout() {

    const router = useRouter()
    const [user, isInitialized] = useFirebaseUser()
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    useEffect(() => {
        if (user && isInitialized) router.replace('/(app)/(root)/(drawer)/subscription')
    }, [user, isInitialized]);

    const handleOnGoogleLogin = async () => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const signInResult = await GoogleSignin.signIn();

        if (signInResult.data?.idToken) {
            const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data?.idToken);

            await auth().signInWithCredential(googleCredential);
        } else {
            Sentry.captureException(new Error('Unable to login with google credentials'));
        }
    }

    const handleOnAppleLogin = async () => {
        try {
            const {identityToken, authorizationCode} = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            if (authorizationCode) {
                const appleCredential = auth.AppleAuthProvider.credential(identityToken, authorizationCode);
                await auth().signInWithCredential(appleCredential);
            }
        } catch (e: any | { code: string | null }) {
            if (e?.code === 'ERR_REQUEST_CANCELED') {
                Toast.show({
                    type: 'info',
                    text1: 'Authentication canceled',
                })
            } else {
                Sentry.captureException(e);
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong!',
                })
            }
        }
    }
    const toggleDocsAccepted = () => setIsTermsAccepted(!isTermsAccepted)
    const handleOnPrivacyPolicyClicked = () => router.navigate('/docs/privacy_policy')
    const handleOnTermsOfUseClicked = () => router.navigate('/docs/terms_of_use')
    const handeOnShowIntroductionClicked = () => router.replace('/introduction')

    return (
        <ScreenView
            fullHeight>

            <View
                style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: globalStyleConfig.doubleGap,
                    height: '100%'
                }}>
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
                            color: globalStyleConfig.color.primary,
                            fontWeight: '900'
                        }} variant="headlineLarge">{'TitoLearn'}</Text>
                        <Text variant="bodyLarge">{'Leitner Box Flashcards'}</Text>
                    </View>
                </View>
                <Pressable style={{
                    gap: globalStyleConfig.doubleGap,
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <Button
                        mode='outlined'
                        disabled={!isTermsAccepted}
                        style={{
                            borderRadius: 0,
                            width: 250,
                            justifyContent: 'center'
                        }}
                        icon='apple'
                        onPress={handleOnAppleLogin}>Apple Sign-in</Button>
                    <Button
                        mode='outlined'
                        disabled={!isTermsAccepted}
                        style={{
                            borderRadius: 0,
                            width: 250,
                            justifyContent: 'center'
                        }}
                        icon='google'
                        onPress={handleOnGoogleLogin}>Google Sign-in</Button>

                    <AcceptTerms
                        isAccepted={isTermsAccepted}
                        onToggle={toggleDocsAccepted}
                        onTermsOfUseClick={handleOnTermsOfUseClicked}
                        onPrivacyPolicyClick={handleOnPrivacyPolicyClicked}/>

                </Pressable>
                <Button
                    mode='outlined'
                    onPress={handeOnShowIntroductionClicked}>Show the intro again</Button>
            </View>

        </ScreenView>
    );
}