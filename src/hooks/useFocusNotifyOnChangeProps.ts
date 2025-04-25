import {NotifyOnChangeProps} from '@tanstack/query-core'
import {useIsFocused} from "@react-navigation/core";

// @discussions https://github.com/TanStack/query/discussions/7424
export function useFocusNotifyOnChangeProps(
    notifyOnChangeProps?: NotifyOnChangeProps,
) {
    const isFocused = useIsFocused();

    return () => {
        if (!isFocused) {
            return []
        }

        if (typeof notifyOnChangeProps === 'function') {
            return notifyOnChangeProps()
        }

        return notifyOnChangeProps
    }
}