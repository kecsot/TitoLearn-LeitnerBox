import {deleteDeck, getDeckById, getDeckList, patchDeck, postDeck} from "../http/deck";
import {DeckEditableType} from "../../types";
import {useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery} from "@tanstack/react-query";
import {getBaseNextPageParam, getBasePreviousPageParam, pushInfiniteQueryData, updateInfiniteQueryData} from "./util";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const DECK_QUERY_KEYS = {
    all:
        ['decks'],

    lists: () =>
        ['decks', 'list'],

    details: () =>
        ['decks', 'item'],
    detail: (id: number) =>
        ['decks', 'item', id],
}

export const useGetDeckByIdSuspenseQuery = (params: { deckId: number }, options?: {}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: DECK_QUERY_KEYS.detail(params.deckId),
        queryFn: () => getDeckById(params.deckId),
        ...options,
        notifyOnChangeProps
    })
}

// v2: store detail deck data to avoid not necessary getDeckById calls
export const useGetDeckSuspenseInfiniteQuery = () => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseInfiniteQuery({
        queryKey: DECK_QUERY_KEYS.lists(),
        queryFn: ({pageParam}) => getDeckList(pageParam),
        initialPageParam: 1,
        getNextPageParam: getBaseNextPageParam,
        getPreviousPageParam: getBasePreviousPageParam,
        notifyOnChangeProps
    })
}

export const useAddDeckMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postDeck,
        onSuccess: (data) => {
            if (data) {
                // Detail item
                queryClient.setQueryData(DECK_QUERY_KEYS.detail(data.id), data)

                // Manipulate card list
                pushInfiniteQueryData(queryClient, DECK_QUERY_KEYS.lists(), data)
            }
            return data
        }
    })
}

export const useEditDeckMutation = (params: { deckId: number }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: DeckEditableType) => patchDeck(params.deckId, body),
        onSettled: (data) => {
            if (data) {
                // Detail item
                queryClient.setQueryData(DECK_QUERY_KEYS.detail(data.id), data)

                // Manipulate card list
                updateInfiniteQueryData(queryClient, DECK_QUERY_KEYS.lists(), data);
            }
        }
    })
}

export const useDeleteDeckMutation = (params: {deckId: number}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteDeck(params.deckId),
        onSuccess: (data, variables) => {
            if (data) {
                // Decks
                void queryClient.removeQueries({queryKey: DECK_QUERY_KEYS.lists()})
                void queryClient.removeQueries({queryKey: DECK_QUERY_KEYS.detail(params.deckId)})
            }
            return data
        }
    })
}