import {useSuspenseQuery} from "@tanstack/react-query";
import {getHtmlContent} from "../http/htmlContent";
import {HtmlContentFilters} from "../../types";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const HTML_CONTENT_QUERY_KEYS = {
    all:
        ['html-content'],

    detailByKey: (params: {}, filters: {}) =>
        ['html-content', 'item-key', params, 'filters', filters],
}

export const useGetHtmlContentByKeySuspenseQuery = (params: {
    directory: string,
    view: string
}, filters: HtmlContentFilters, options?: {}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: HTML_CONTENT_QUERY_KEYS.detailByKey(params, filters),
        queryFn: () => getHtmlContent(params.directory, params.view, filters),
        ...options,
        notifyOnChangeProps
    })
}