import {useMutation, useQueryClient, useSuspenseInfiniteQuery, useSuspenseQuery} from "@tanstack/react-query";
import {deleteCard, getCardById, getCardList, patchCard, postCard} from "../http/deckCard";
import {CardEditableType, DeckType, LeitnerSystemType} from "../../types";
import {DECK_QUERY_KEYS} from "./deck";
import {DECK_LEARNING_QUERY_KEYS} from "./deckLearning";
import {
    getBaseNextPageParam,
    getBasePreviousPageParam,
    manipulateInfiniteQueryData, manipulateQueryData,
    pushInfiniteQueryData,
    updateInfiniteQueryData
} from "./util";
import {LEITNER_SYSTEM_QUERY_KEYS} from "./leitnerSystem";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";
import {LEARNING_QUERY_KEYS} from "./learning";

export const DECK_CARDS_QUERY_KEYS = {
    all: (deckId: number) =>
        ['decks', 'item', deckId, 'cards'] as const,
    lists: (deckId: number) =>
        ['decks', 'item', deckId, 'cards', 'list'] as const,

    details: (deckId: number) =>
        ['decks', 'item', deckId, 'cards', 'item'] as const,
    detail: (deckId: number, cardId: number) =>
        ['decks', 'item', deckId, 'cards', 'item', cardId] as const,
}

export const useGetCardByIdSuspenseQuery = (params: { deckId: number, cardId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: DECK_CARDS_QUERY_KEYS.detail(params.deckId, params.cardId),
        queryFn: () => getCardById(params.deckId, params.cardId),
        notifyOnChangeProps
    })
}

export const useGetCardSuspenseInfiniteQuery = (params: { deckId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseInfiniteQuery({
        queryKey: DECK_CARDS_QUERY_KEYS.lists(params.deckId),
        queryFn: ({pageParam}) => getCardList(params.deckId, pageParam),
        initialPageParam: 1,
        getNextPageParam: getBaseNextPageParam,
        getPreviousPageParam: getBasePreviousPageParam,
        notifyOnChangeProps
    })
}

export const useAddCardMutation = (params: { deckId: number }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: CardEditableType) => postCard(params.deckId, body),
        onSettled: (data) => {
            if (data) {
                // Card detail
                queryClient.setQueryData(DECK_CARDS_QUERY_KEYS.detail(params.deckId, data.id), data)

                // Add to card list
                pushInfiniteQueryData(queryClient, DECK_CARDS_QUERY_KEYS.lists(params.deckId), data)

                // Increase card count in deck list
                manipulateInfiniteQueryData<DeckType>(queryClient, DECK_QUERY_KEYS.lists(), (item) => {
                    if (item.id == params.deckId) {
                        item.count_of_cards += 1
                        item.count_of_due_cards += 1
                    }
                })

                manipulateQueryData<DeckType>(queryClient, DECK_QUERY_KEYS.detail(params.deckId), (item) => {
                    item.count_of_cards += 1
                    item.count_of_due_cards += 1
                })

                // Remove calculation previous data
                void queryClient.removeQueries({queryKey: LEITNER_SYSTEM_QUERY_KEYS.all()})
                void queryClient.removeQueries({queryKey: DECK_LEARNING_QUERY_KEYS.calculations(params.deckId)})
            }
        }
    })
}

export const useEditCardMutation = (params: { deckId: number, cardId: number }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: CardEditableType) => patchCard(params.deckId, params.cardId, body),
        onSettled: (data) => {
            if (data) {
                // Card detail
                queryClient.setQueryData(DECK_CARDS_QUERY_KEYS.detail(params.deckId, data.id), data)

                // Manipulate card list
                updateInfiniteQueryData(queryClient, DECK_CARDS_QUERY_KEYS.lists(params.deckId), data)
            }
        }
    })
}

export const useDeleteCardMutation = (params: {deckId:number, cardId: number}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => deleteCard(params.deckId, params.cardId),
        onSuccess: (data, variables) => {
            if (data) {
                // Card detail
                void queryClient.removeQueries({queryKey: DECK_CARDS_QUERY_KEYS.detail(params.deckId, params.cardId)})

                // Remove from card list FIXME: optimize
                void queryClient.removeQueries({queryKey: DECK_CARDS_QUERY_KEYS.lists(params.deckId)})

                // Decks
                void queryClient.removeQueries({queryKey: DECK_QUERY_KEYS.lists()})
                void queryClient.removeQueries({queryKey: DECK_QUERY_KEYS.detail(params.deckId)})

                // Remove calculation previous data
                void queryClient.removeQueries({queryKey: LEITNER_SYSTEM_QUERY_KEYS.all()})
                void queryClient.removeQueries({queryKey: DECK_LEARNING_QUERY_KEYS.calculations(params.deckId)})

                // Learning Answers

                void queryClient.removeQueries({queryKey: LEARNING_QUERY_KEYS.all})
            }
            return data
        }
    })
}