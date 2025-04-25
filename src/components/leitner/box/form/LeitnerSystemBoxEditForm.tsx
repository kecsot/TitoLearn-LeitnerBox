import {View} from 'react-native';
import {Formik} from "formik";
import {Button, Text, TextInput} from "react-native-paper";
import React from "react";
import * as Yup from "yup";
import {LeitnerSystemBoxEditableType, LeitnerSystemBoxType} from "../../../../types";
import {globalStyleConfig} from "../../../base/globalStyleConfig";
import {convertMinutesToDHM, convertDHMToMinutes} from "../../../../util/date";


type Props = {
    item: LeitnerSystemBoxType
    submit: (values: LeitnerSystemBoxEditableType) => Promise<void>
    isLoading: boolean
}


// v2: Create formik input extending TextInput
export default function LeitnerSystemBoxEditForm({item, submit, isLoading}: Props) {

    const {days, hours, minutes} = convertMinutesToDHM(item.delay_in_minutes)

    const LeitnerSystemBoxFormSchema = Yup.object().shape({
        days: Yup.number()
            .typeError("Must be number!")
            .min(0, 'Minimum value is 0')
            .max(3650, 'Maximum value is 3650'),

        hours: Yup.number()
            .typeError("Must be number!")
            .min(0, 'Minimum value is 0')
            .max(23, 'Maximum value is 23'),

        minutes: Yup.number()
            .typeError("Must be number!")
            .min(0, 'Minimum value is 0')
            .max(59, 'Maximum value is 59')

    })

    return <Formik
        initialValues={{
            days: days.toString(),
            hours: hours.toString(),
            minutes: minutes.toString(),
        }}
        validationSchema={LeitnerSystemBoxFormSchema}
        onSubmit={values => {
            return submit({
                delay_in_minutes: convertDHMToMinutes(
                    Number(values.days ?? 0),
                    Number(values.hours ?? 0),
                    Number(values.minutes ?? 0)
                )
            })
        }}>
        {({handleChange, setFieldValue, handleBlur, handleSubmit, values, errors}) => (
            <View style={{
                gap: 8
            }}>
                <View style={{
                    gap: globalStyleConfig.gap,
                    padding: globalStyleConfig.gap
                }}>

                    <TextInput
                        mode='outlined'
                        label={'Days'}
                        keyboardType='number-pad'
                        maxLength={4}
                        onChangeText={handleChange('days')}
                        onBlur={handleBlur('days')}
                        value={values.days}
                        error={errors.days !== undefined}
                        right={
                            <TextInput.Icon icon="close" onPress={() => setFieldValue('days', '')}/>
                        }
                    />
                    {errors.days && (
                        <Text variant="labelSmall">{errors.days}</Text>
                    )}

                    <TextInput
                        mode='outlined'
                        label={'Hours'}
                        keyboardType='number-pad'
                        onChangeText={handleChange('hours')}
                        onBlur={handleBlur('hours')}
                        value={values.hours}
                        error={errors.hours !== undefined}
                        right={
                            <TextInput.Icon icon="close" onPress={() => setFieldValue('hours', '')}/>
                        }
                    />
                    {errors.hours && (
                        <Text variant="labelSmall">{errors.hours}</Text>
                    )}

                    <TextInput
                        mode='outlined'
                        label={'Minutes'}
                        keyboardType='number-pad'
                        onChangeText={handleChange('minutes')}
                        onBlur={handleBlur('minutes')}
                        value={values.minutes}
                        error={errors.minutes !== undefined}
                        right={
                            <TextInput.Icon icon="close" onPress={() => setFieldValue('minutes', '')}/>
                        }
                    />
                    {errors.minutes && (
                        <Text variant="labelSmall">{errors.minutes}</Text>
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