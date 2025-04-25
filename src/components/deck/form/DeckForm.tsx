import {View} from 'react-native';
import {Formik} from "formik";
import {Button, Text, TextInput} from "react-native-paper";
import React from "react";
import {DeckEditableType, DeckType} from "../../../types";
import * as Yup from 'yup';
import {globalStyleConfig} from "../../base/globalStyleConfig";

type Props = {
    item?: DeckType
    submit: (data: DeckEditableType) => Promise<void>
    isLoading: boolean
}

// v2: Create formik input extending  TextInput
export default function DeckForm({item, isLoading, submit}: Props) {

    const DeckFormSchema = Yup.object().shape({
        title: Yup.string()
            .trim()
            .min(3, 'Please set minimum 3 characters length!')
            .max(255, 'Please set maximum 255 characters length!')
            .required('The title is required'),
        description: Yup.string()
            .optional()
            .trim()
            .max(255, 'Please set maximum 255 characters length!')
    })

    return <Formik
        initialValues={{
            title: item?.title ?? '',
            description: item?.description ?? ''
        }}
        validationSchema={DeckFormSchema}
        onSubmit={values => submit(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={{
                gap: globalStyleConfig.gap,
                margin: globalStyleConfig.gap
            }}>
                <View>
                    <TextInput
                        mode='outlined'
                        label={'Title'}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        error={errors.title !== undefined}
                    />
                    {errors.title && (
                        <Text variant="labelSmall">{errors.title}</Text>
                    )}
                </View>

                <View>
                    <TextInput
                        mode='outlined'
                        label={'Description'}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        error={errors.description !== undefined}
                    />
                    {errors.description && (
                        <Text variant="labelSmall">{errors.description}</Text>
                    )}
                </View>
                <Button
                    loading={isLoading}
                    disabled={isLoading}
                    mode='contained'
                    onPress={() => handleSubmit()}>Save</Button>
            </View>
        )}
    </Formik>;
}

