import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from "react-native-paper";
import {useGetSubscriptionIsActiveSuspenseQuery} from "../../api/queries/subscription";
import {globalStyleConfig} from "../../components/base/globalStyleConfig";

type Props = {
    productId: string;
    onRequestSubscribe: (productId: string) => void;
    onShowFaqClick: () => void;
    onShowIntroductionClick: () => void;
}

// TODO: move to View
const SubscriptionRequestStatusBarContainer = ({
                                                   productId,
                                                   onRequestSubscribe,
                                                   onShowFaqClick,
                                                   onShowIntroductionClick,
                                               }: Props) => {

    const {data: isActive, refetch} = useGetSubscriptionIsActiveSuspenseQuery({productId});

    useEffect(() => {
        void refetch();
    }, []);

    if (isActive) return null

    return (
        <View style={{
            backgroundColor: globalStyleConfig.color.primary,
            padding: 5,
            gap: 16
        }}>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{color: 'black'}}>
                    The app requires subscription to use.
                </Text>
                <Text
                    onPress={() => onRequestSubscribe(productId)}
                    style={{
                        textAlign: 'center',
                        color: 'blue'
                    }}>
                    Click here for details!
                </Text>
            </View>

            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                opacity: .7
            }}>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                }}>
                    <Text
                        style={{color: 'black'}}
                        variant={"labelMedium"}>What we offer?</Text>
                    <Text
                        style={{
                            color: 'black',
                            textDecorationLine: 'underline',
                        }}
                        onPress={onShowIntroductionClick}
                    >Navigate to introduction</Text>
                </View>

                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                }}>
                    <Text
                        style={{color: 'black'}}
                        variant={"labelMedium"}>Any question?</Text>
                    <Text
                        style={{
                            color: 'black',
                            textDecorationLine: 'underline',
                        }}
                        onPress={onShowFaqClick}
                    >Navigate to FAQ</Text>
                </View>
            </View>
        </View>
    )
};

export default SubscriptionRequestStatusBarContainer;