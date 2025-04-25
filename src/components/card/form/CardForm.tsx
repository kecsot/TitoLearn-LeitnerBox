import {View} from 'react-native';
import {Formik} from "formik";
import {Button, Text, TextInput} from "react-native-paper";
import React from "react";
import {AssetFormDataType, CardEditableType, CardType} from "../../../types";
import * as Yup from "yup";
import ImageAssetPickerCard from "../../file/image/ImageAssetPickerCard";
import {ImagePickerAsset} from "expo-image-picker/src/ImagePicker.types";
import {globalStyleConfig} from "../../base/globalStyleConfig";

type Props = {
    item?: CardType
    submit: (data: CardEditableType) => Promise<void>
    isLoading: boolean
}

// v2: Create formik input extending TextInput
export default function CardForm({item, submit, isLoading}: Props) {

    const CardSideShape = {
        text: Yup.string()
            .trim()
            .min(1, 'Please set minimum 3 characters length!')
            .max(65535, 'Please set maximum 65,535 characters length!')
            .required('The text is required'),
    }

    const CardFormSchema = Yup.object().shape({
        front: Yup.object().shape(CardSideShape),
        back: Yup.object().shape(CardSideShape)
    })

    const initialValues = {
        front: {
            text: item?.card_side_front.text ?? '',
            image: {
                asset_empty_meaning: 'not_changed',
                ...(item?.card_side_front.image_url
                    ? { asset: { uri: item.card_side_front.image_url } }
                    : {})
            }
        },
        back: {
            text: item?.card_side_back.text ?? '',
            image: {
                asset_empty_meaning: 'not_changed',
                ...(item?.card_side_back.image_url
                    ? { asset: { uri: item.card_side_back.image_url } }
                    : {})
            }
        }
    } as CardEditableType

    return <Formik
        initialValues={initialValues}
        validationSchema={CardFormSchema}
        onSubmit={(values, formikHelpers) => {
            submit(values)
                .then(() => {
                    formikHelpers.resetForm()
                })
        }}>
        {({handleChange, setFieldValue, handleSubmit, values, errors, resetForm}) => {

            const handleOnImageAssetPicked = (fieldKey: string, asset: ImagePickerAsset) =>
                setFieldValue(fieldKey, {
                    asset_empty_meaning: null,
                    asset: {
                        uri: asset.uri,
                        type: asset.mimeType,
                        name: asset.fileName
                    } as AssetFormDataType,
                }, false)

            const handleOnImageDeleted = (fieldKey: string) =>
                setFieldValue(fieldKey, {
                    asset: undefined,
                    asset_empty_meaning: 'removed'
                }, false)

            return (
                <View style={{
                    gap: globalStyleConfig.gap,
                    margin: globalStyleConfig.gap
                }}>

                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        mode='contained'
                        icon='content-save-all'
                        onPress={() => handleSubmit()}>Save</Button>

                    <View style={{
                        gap: globalStyleConfig.doubleGap,
                    }}>
                        <View style={{
                            gap: globalStyleConfig.gap
                        }}>
                            <TextInput
                                mode='outlined'
                                label={'Front text'}
                                onChangeText={handleChange('front.text')}
                                value={values.front.text}
                                error={errors.front?.text !== undefined}
                                multiline
                            />
                            {errors.front && (
                                <Text variant="labelSmall">{errors.front?.text ?? ''}</Text>
                            )}

                            <ImageAssetPickerCard
                                image={values.front?.image?.asset?.uri}
                                isDisabled={isLoading}
                                onPicked={(asset) => handleOnImageAssetPicked('front.image', asset)}
                                onDeleted={() => handleOnImageDeleted('front.image')}
                            />
                        </View>

                        <View style={{
                            gap: globalStyleConfig.gap,
                        }}>
                            <TextInput
                                mode='outlined'
                                label={'Back text'}
                                onChangeText={handleChange('back.text')}
                                value={values.back.text}
                                error={errors.back?.text !== undefined}
                                multiline
                            />
                            {errors.back && (
                                <Text variant="labelSmall">{errors.back?.text ?? ''}</Text>
                            )}

                            <ImageAssetPickerCard
                                image={values.back?.image?.asset?.uri}
                                isDisabled={isLoading}
                                onPicked={(asset) => handleOnImageAssetPicked('back.image', asset)}
                                onDeleted={() => handleOnImageDeleted('back.image')}
                            />
                        </View>
                    </View>


                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        mode='contained'
                        icon='content-save-all'
                        onPress={() => handleSubmit()}>Save</Button>
                </View>
            )
        }}
    </Formik>;
}

