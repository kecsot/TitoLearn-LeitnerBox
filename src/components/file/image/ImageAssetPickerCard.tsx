import React, {useEffect, useState} from "react";
import {ActivityIndicator, Button, Card, IconButton} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {ImagePickerAsset} from "expo-image-picker/src/ImagePicker.types";
import {AuthenticatedFastImage} from "../../../api/AuthenticatedFastImage";
import * as Sentry from "@sentry/react-native";

export type PickedImageType = {
    uri: string,
    height: number,
    width: number,
    fileName: string
    type: 'image'
}

export type ImageAsserPickerCardProps = {
    image?: string

    isDisabled: boolean
    onPicked: (asset: PickedImageType) => void,
    onDeleted: () => void
}

// @feature reload button if failed to load
export default function ImageAssetPickerCard({image, onPicked, onDeleted, isDisabled}: ImageAsserPickerCardProps) {

    const [uri, setUri] = useState<string | undefined>(undefined);
    const [isImageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        setUri(image)
    }, [image]);

    const manipulateImage = (imagePickerAsset: ImagePickerAsset) => {
        const aspectRatio = imagePickerAsset.width / imagePickerAsset.height;
        const newWidth = Math.min(imagePickerAsset.width, 1000);
        const newHeight = Math.min(imagePickerAsset.height, 1000);
        const finalWidth = imagePickerAsset.width > imagePickerAsset.height ? newWidth : Math.round(newHeight * aspectRatio);
        const finalHeight = imagePickerAsset.height > imagePickerAsset.width ? newHeight : Math.round(newWidth / aspectRatio);

        return manipulateAsync(
            imagePickerAsset.uri,
            [
                {resize: {width: finalWidth, height: finalHeight}},
            ],
            {compress: 0.7, format: SaveFormat.JPEG}
        ).then((result) => {
            return {
                uri: result.uri,
                height: result.height,
                width: result.width,
                fileName: imagePickerAsset.fileName,
                type: 'image'
            } as PickedImageType
        })
    }

    const pickImage = () => ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images
    })
        .then(async (result) => {
            if(!result.canceled) {
                const img = await manipulateImage(result.assets[0])
                onPicked(img)
                setUri(img.uri)
            }
        }).catch((error) => {
            Sentry.captureException(error)
            removeImage()
            setImageLoading(false)
        })

    const removeImage = () => {
        setUri(undefined)
        onDeleted()
    }

    const handleImageLoadStart = () => setImageLoading(true)
    const handleImageLoadEnd = () => setImageLoading(false)

    const handleImageError = () => {
        Sentry.captureException(new Error('Failed to show image'));
        setUri(require('../../../../assets/images/error.png'))

        Toast.show({
            type: 'error',
            text1: 'Failed to show image',
        });
    }

    return (
        <Card style={{
            position: "relative",
            borderRadius: 3
        }}>
            <Card.Content>
                {isImageLoading && <ActivityIndicator/>}
                {!isImageLoading && !uri && (
                    <Button icon={'image'} onPress={pickImage} disabled={isDisabled}>
                        Pick image
                    </Button>
                )}

                {uri && (
                    <>
                        <AuthenticatedFastImage
                            source={{uri: uri}}
                            onLoadStart={handleImageLoadStart}
                            onLoadEnd={handleImageLoadEnd}
                            onError={handleImageError}
                            resizeMode={"contain"}
                            style={{
                                width: '100%',
                                height: 140,
                            }}
                        />

                        <IconButton
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                            }}
                            onPress={removeImage}
                            disabled={isImageLoading || isDisabled}
                            icon={"close"}/>
                    </>
                )}

            </Card.Content>
        </Card>
    );
}