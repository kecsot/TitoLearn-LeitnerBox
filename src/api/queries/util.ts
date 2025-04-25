import {InfiniteData, QueryClient, QueryKey} from "@tanstack/react-query";
import {BaseType, PaginateListType} from "../../types";
import {produce} from "immer";

export const updateInfiniteQueryData = (queryClient: QueryClient, queryKey: QueryKey, newData: BaseType) => queryClient.setQueryData<InfiniteData<PaginateListType<BaseType>> | undefined>(queryKey, (data) => {
    if (data) {
        return produce(data, (draft) => {
            draft.pages = draft.pages.map((page) => {
                page.data = page.data.map((result) => {
                    if (result.id == newData.id) {
                        result = newData;
                    }
                    return result;
                });
                return page;
            });
        })
    }
    return data;
});

export const pushInfiniteQueryData = (queryClient: QueryClient, queryKey: QueryKey, newData: BaseType) =>
    queryClient.setQueryData<InfiniteData<PaginateListType<BaseType>> | undefined>(queryKey, (data) => {
        if (data) {
            return produce(data, (draft) => {
                if (draft.pages.length > 0) {
                    draft.pages[0].data = [
                        newData,
                        ...draft.pages[0].data
                    ];
                }else{
                    const newPage :PaginateListType<BaseType> = {
                        data: [newData],
                        meta: {
                            current_page: 1,
                            from: 1,
                            to: 1,
                            total: 1,
                            last_page: 1,
                            per_page: 15
                        },
                    }

                    draft.pages = {
                        ...[newPage]
                    }
                }
            });
        }
        return data;
    });


export const manipulateInfiniteQueryData = <T extends BaseType> (queryClient: QueryClient, queryKey: QueryKey, manipulate: (item: T) => void) => queryClient.setQueryData<InfiniteData<PaginateListType<BaseType>> | undefined>(queryKey, (data) => {
    if (data) {
        return produce(data, (draft) => {
            draft.pages = draft.pages.map((page) => {
                page.data = page.data.map((item) => {
                    manipulate(item as T)
                    return item;
                });
                return page;
            });
        })
    }
    return data;
});

export const manipulateQueryData = <T extends BaseType> (queryClient: QueryClient, queryKey: QueryKey, manipulate: (item: T) => void) => queryClient.setQueryData<BaseType | undefined>(queryKey, (data) => {
    if (data) {
        return produce(data, (draft) => {
            manipulate(draft as T)
            return draft;
        })
    }
    return data;
});

export const getBaseNextPageParam = (current: PaginateListType<BaseType>) => {
    if(!current || !current.meta) return undefined
    if(current.meta.current_page >= current.meta.last_page) return undefined
    return current.meta.current_page + 1
}

export const getBasePreviousPageParam = (current: PaginateListType<BaseType>) => {
    if(!current || !current.meta) return undefined
    if(current.meta.current_page === 1) return undefined
    return current.meta.current_page - 1
}