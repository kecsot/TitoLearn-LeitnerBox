import React, {useEffect} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useGetHtmlContentByKeySuspenseQuery} from "../../api/queries/htmlContent";
import HtmlContentView from "../../components/pageContent/HtmlContentScreenView";
import {HtmlContentFilters} from "../../types";
import {useTheme} from "@react-navigation/native";

type Props = {
    directory: string
    view: string
    onSuccess?: () => void
}

export default function HtmlContentScrollViewContainer({onSuccess,directory, view}: Props) {
    const theme = useTheme()

    const filters: HtmlContentFilters = {
        prefer_dark: theme.dark
    }
    const {
        data,
        isError,
        isSuccess,
        isFetching,
        refetch
    } = useGetHtmlContentByKeySuspenseQuery({directory, view}, filters)

    useEffect(() => {
        if(isSuccess && onSuccess) {
            onSuccess()
        }
    }, [isSuccess])

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch}/>
            }>
            <HtmlContentView item={!isError ? data : {html: '<h1>Failed to load the content</h1>'}} />
        </ScrollView>
    );
}