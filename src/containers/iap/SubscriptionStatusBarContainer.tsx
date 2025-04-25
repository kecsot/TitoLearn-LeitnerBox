import React from 'react';
import {Text} from "react-native-paper";
import {useGetSubscriptionIsActiveSuspenseQuery} from "../../api/queries/subscription";

type Props = {
    productId: string;
}

const SubscriptionStatusBarContainer = ({productId}: Props) => {

    const {data: isActive} = useGetSubscriptionIsActiveSuspenseQuery({productId, mandatoryInvalidate: false});

    return (
        <Text>
            Your membership status: {isActive ? 'Active' : 'Inactive'}
        </Text>
    )
};

export default SubscriptionStatusBarContainer;