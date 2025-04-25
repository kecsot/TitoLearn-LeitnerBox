import React, {ReactNode, useEffect} from 'react';
import RevenueCatUI from "react-native-purchases-ui";
import Purchases, {CustomerInfo} from "react-native-purchases";
import {useQueryClient} from "@tanstack/react-query";
import {SUBSCRIPTION_QUERY_KEYS, useGetSubscriptionIsActiveSuspenseQuery} from "../../api/queries/subscription";
import {useGetDeckSuspenseInfiniteQuery} from "../../api/queries/deck";

type Props = {
    productId: string;

    onDismiss: () => void;

    onRestoreCompleted?: VoidFunction;
    onRestoreError: VoidFunction;

    onPurchaseCompleted?: VoidFunction;
    onPurchaseCancelled: VoidFunction;
    onPurchaseError: VoidFunction;
    AcquiredComponent: () => ReactNode;
}

const PaywallContainer = ({
                              productId,

                              onDismiss,
                              onRestoreCompleted,
                              onRestoreError,

                              onPurchaseCompleted,
                              onPurchaseCancelled,
                              onPurchaseError,

                              AcquiredComponent
                          }: Props) => {

    const queryClient = useQueryClient()
    const deckQuery = useGetDeckSuspenseInfiniteQuery()
    const {data: isActive, refetch} = useGetSubscriptionIsActiveSuspenseQuery({productId, mandatoryInvalidate: true})

    useEffect(() => {
        const listener = (customerInfo: CustomerInfo) => {
            // Customer info changed. Re-set $productId status

            queryClient.setQueryData(
                SUBSCRIPTION_QUERY_KEYS.product(productId),
                customerInfo.activeSubscriptions.includes(productId)
            )
        }

        Purchases.addCustomerInfoUpdateListener(listener)

        return () => {
            Purchases.removeCustomerInfoUpdateListener(listener)
        }
    }, []);

    useEffect(() => {
        void refetch()
    }, []);

    return (
        <>
            {isActive ? (
                <AcquiredComponent/>
            ) : (
                <RevenueCatUI.Paywall
                    style={{
                        margin: 0
                    }}
                    onRestoreCompleted={onRestoreCompleted}
                    onRestoreError={onRestoreError}

                    onPurchaseCompleted={onPurchaseCompleted}
                    onPurchaseCancelled={onPurchaseCancelled}
                    onPurchaseError={onPurchaseError}

                    onDismiss={onDismiss}
                />
            )}
        </>
    )
};

export default PaywallContainer;