import Purchases from "react-native-purchases";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";
import {useSuspenseQuery} from "@tanstack/react-query";

export const SUBSCRIPTION_QUERY_KEYS = {
    subscriptions:
        ['subscriptions'],

    products: () =>
        ['subscriptions', 'product'],
    product: (id: string) =>
        ['subscriptions', 'product', id],
}

export const useGetSubscriptionIsActiveSuspenseQuery = (params: { productId: string, mandatoryInvalidate?: boolean }, options?: {}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: SUBSCRIPTION_QUERY_KEYS.product(params.productId),
        queryFn: async () => {
            if(params.mandatoryInvalidate) {
                await Purchases.invalidateCustomerInfoCache()
            }
            const customerInfo = await Purchases.getCustomerInfo()

            const item = customerInfo.entitlements.active['Membership'];
            if(item != undefined){
                return item.productIdentifier == 'tito_membership'
            }
            return false
        },
        ...options,
        gcTime: 0,
        notifyOnChangeProps
    })
}