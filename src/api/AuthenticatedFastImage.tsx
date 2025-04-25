import FastImage, {FastImageProps} from "react-native-fast-image";
import React, {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";
import {ActivityIndicator} from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Sentry from "@sentry/react-native";

type Props = FastImageProps;

export const AuthenticatedFastImage = (props: Props) => {
    const {source, ...rest} = props;

    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        auth()
            .currentUser
            ?.getIdToken(false)
            .then(token => setToken(token));

    }, [])

    // @issue https://github.com/DylanVann/react-native-fast-image/issues/200
    const handleOnError = () => {
        Toast.show({
            type: 'error',
            text1: 'Failed to load image',
        });
        Sentry.captureException(new Error('Failed to load image'));
    }

    if (!token) return <ActivityIndicator />;

    const processedSource = typeof source === 'object' && source !== null
        ? {
            ...source,
            headers: {
                Authorization: "Bearer " + token,
            },
        }
        : source;

    return (
        <FastImage
            source={processedSource}
            onError={handleOnError}
            {...rest}
        />
    )
}