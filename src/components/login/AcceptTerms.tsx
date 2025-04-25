import {IconButton, Text} from "react-native-paper";
import {globalStyleConfig} from "../base/globalStyleConfig";
import {View} from "react-native";
import React from "react";
import {useTheme} from "@react-navigation/native";

type Props = {
    isAccepted: boolean;
    onToggle: VoidFunction;
    onTermsOfUseClick: VoidFunction;
    onPrivacyPolicyClick: VoidFunction;
}

export const AcceptTerms = ({isAccepted, onToggle, onTermsOfUseClick, onPrivacyPolicyClick}: Props) => {
    const theme = useTheme();


    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <IconButton
                icon="check"
                mode='outlined'
                size={14}
                iconColor={isAccepted ? theme.colors.primary : 'transparent'}
                onPress={onToggle}
                style={{
                    marginHorizontal: globalStyleConfig.gap,
                    borderRadius: globalStyleConfig.gap,
                }}
            />
            <Text>
                I accept{' '}
            </Text>
            <Text
                style={{
                    color: theme.colors.primary,
                    textDecorationLine: 'underline',
                }}
                onPress={onTermsOfUseClick}>
                Terms of use (EULA)
            </Text>
            <Text>{' '}and{' '}</Text>
            <Text
                style={{
                    color: theme.colors.primary,
                    textDecorationLine: 'underline',
                }}
                onPress={onPrivacyPolicyClick}>
                Privacy policy
            </Text>
        </View>
    )
}