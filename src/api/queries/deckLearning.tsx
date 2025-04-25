import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseInfiniteQuery,
    useSuspenseQuery
} from "@tanstack/react-query"
import {
    calculateDeckLearning,
    getDeckLearningList,
    postCancelDeckLearning,
    postStartDeckLearning
} from "../http/deckLearning"
import {DeckType, LearningCalculationFilters, LearningState} from "../../types";
import {DECK_QUERY_KEYS} from "./deck";
import {getBaseNextPageParam, getBasePreviousPageParam, manipulateInfiniteQueryData, manipulateQueryData} from "./util";
import {LEITNER_SYSTEM_QUERY_KEYS} from "./leitnerSystem";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const DECK_LEARNING_QUERY_KEYS = {
    all: (deckId: number) =>
        ['decks', 'item' , deckId, 'learning'] as const,

    list: (deckId: number) =>
        ['decks', 'item' , deckId, 'learning', 'list'] as const,

    details: (deckId: number) =>
        ['decks', 'item' , deckId, 'learning', 'item'] as const,
    detail: (deckId: number, learningId: number) =>
        ['decks', 'item' , deckId, 'learning', 'item', learningId] as const,

    calculations: (deckId: number) =>
        ['decks', 'item' , deckId, 'learning', 'calculation'] as const,
    calculation: (deckId: number, filters: object) =>
        ['decks', 'item' , deckId, 'learning', 'calculation',  {filters}] as const,

    running: (deckId: number) =>
        ['decks', 'item' , deckId, 'learning', 'running'] as const,
}

export const useGetLearningListOfDeckSuspenseInfiniteQuery = (params: { deckId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseInfiniteQuery({
        queryKey: DECK_LEARNING_QUERY_KEYS.list(params.deckId),
        queryFn: ({pageParam}) => getDeckLearningList(params.deckId, pageParam),
        initialPageParam: 1,
        getNextPageParam: getBaseNextPageParam,
        getPreviousPageParam: getBasePreviousPageParam,
        notifyOnChangeProps
    })
}

export const useGetRunningLearningOfDeckSuspenseQuery = (params: { deckId: number }) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: DECK_LEARNING_QUERY_KEYS.running(params.deckId),
        queryFn: () => getDeckLearningList(params.deckId, 1, LearningState.RUNNING)
            .then((list) => list.data[0] ?? null),
        notifyOnChangeProps
    })
}

export const useStartDeckLearningMutation = (params: { deckId: number, filters: LearningCalculationFilters }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postStartDeckLearning(params.deckId, params.filters),
        onSettled: (learning) => {
            if (learning) {
                // Set running
                queryClient.setQueryData(DECK_LEARNING_QUERY_KEYS.running(params.deckId), learning)

                // Manipulate deck list
                manipulateInfiniteQueryData<DeckType>(queryClient, DECK_QUERY_KEYS.lists(), (item) => {
                    if (item.id == params.deckId) {
                        item.running_learning_id = learning.id
                    }
                })

                // Manipulate deck item
                manipulateQueryData<DeckType>(queryClient, DECK_QUERY_KEYS.detail(learning.deck_id), (item) => {
                    item.running_learning_id = learning.id
                })
            }
        }
    })
}

export const useCancelDeckLearningMutation = (params: { deck: DeckType }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: { learningId: number }) => postCancelDeckLearning(params.deck.id, args.learningId),
        onSettled: (isSuccess) => invalidateAfterLearningMutationSettled(queryClient, params)
    })
}

export const useFinishDeckLearningMutation = (params: { deck: DeckType }, options?: {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => true,
        onSettled: () => invalidateAfterLearningMutationSettled(queryClient, params),
        ...options
    })
}

const invalidateAfterLearningMutationSettled = (queryClient: QueryClient, params: { deck: DeckType }) => {
    // Everything related this deck item
    void queryClient.invalidateQueries({queryKey: ['decks', 'item', params.deck.id], exact: false})

    // Deck List
    void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.lists()})

    // LeitnerSystem
    void queryClient.invalidateQueries({queryKey: LEITNER_SYSTEM_QUERY_KEYS.detail(params.deck.leitner_system_id)})

    // Cancel running
    void queryClient.invalidateQueries({queryKey: DECK_LEARNING_QUERY_KEYS.running(params.deck.id)})
}

export const useCalculateDeckLearningQuery = (params: {
    deckId: number,
    filters: LearningCalculationFilters
}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useQuery({
        queryKey: DECK_LEARNING_QUERY_KEYS.calculation(params.deckId, params.filters),
        queryFn: () => calculateDeckLearning(params.deckId, params.filters),
        notifyOnChangeProps
    })
}