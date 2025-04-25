import {RefreshControl, ScrollView} from "react-native";
import React, {ReactNode} from "react";
import {ScrollViewProps} from "react-native/Libraries/Components/ScrollView/ScrollView";
import {useQueryRefetchableContext} from "../useQueryRefetchableContext";

export type Props = ScrollViewProps & {
    children: ReactNode
}

export const QueryRefetchableScrollView = ({children, ...rest}: Props) => {
    const {
        isLoading,
        broadcastRefetch
    } = useQueryRefetchableContext()

    return (
        <ScrollView
            {...rest}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => broadcastRefetch()}
                />
            }
        >
            {children}
        </ScrollView>
    )
}