import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getLeitnerSystemById} from "../http/leitnerSystem";
import {
    deleteLeitnerSystemBox,
    patchLeitnerSystemBox,
    postLeitnerSystemBox,
} from "../http/leitnerSystemBox";
import {LeitnerSystemType, LeitnerSystemBoxEditableType} from "../../types";
import {produce} from "immer";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";
import {DECK_QUERY_KEYS} from "./deck";

export const LEITNER_SYSTEM_QUERY_KEYS = {
    all: () =>
        ['leitner-systems', 'detail'] as const,
    detail: (id: number) =>
        ['leitner-systems', 'detail', id] as const,
}

export const useGetLeitnerSystemByIdSuspenseQuery = (params: { id: number }, options?: {}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseQuery({
        queryKey: LEITNER_SYSTEM_QUERY_KEYS.detail(params.id),
        queryFn: () => getLeitnerSystemById(params.id),
        ...options,
        notifyOnChangeProps
    })
}

export const useAddLeitnerSystemBoxMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (params: {
            leitnerSystemId: number,
            index: number
        }) => postLeitnerSystemBox(params.leitnerSystemId, params.index),
        onSuccess: (data, variables) => {
            if (data) {
                void queryClient.invalidateQueries({queryKey: LEITNER_SYSTEM_QUERY_KEYS.detail(variables.leitnerSystemId)})
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.details()})   // FIXME: only related cards, releated learnings
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.lists()})   // FIXME: only related cards

                /*
                TODO:

                    Would be nice to use leitnerSystem under a deckId.
                    or
                    Remove deckId from leitnerSystem react-query keys. ! +++ Looks better solution ATM
                 */
            }
            return data
        }
    })
}

export const useEditLeitnerSystemBoxMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (params: {
            leitnerSystemId: number,
            boxId: number,
            data: LeitnerSystemBoxEditableType
        }) => patchLeitnerSystemBox(params.leitnerSystemId, params.boxId, params.data),
        onSuccess: (editedData, variables) => {
            if (editedData) {
                // Change item
                queryClient.setQueryData<LeitnerSystemType | undefined>(LEITNER_SYSTEM_QUERY_KEYS.detail(variables.leitnerSystemId), (data) => {
                    return produce(data, (draft) => {
                        if (draft) {
                            draft.boxes = draft.boxes.map(item => item.id == variables.boxId ? editedData : item)
                        }
                    })
                })
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.details()})   // FIXME: only related cards, releated learnings
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.lists()})   // FIXME: only related cards
            }
            return editedData
        }
    })
}

export const useDeleteLeitnerSystemBoxMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (params: {
            leitnerSystemId: number,
            boxId: number
        }) => deleteLeitnerSystemBox(params.leitnerSystemId, params.boxId),
        onSuccess: (data, variables) => {
            if (data) {
                // Delete (Must invalidate cause of card moving)
                void queryClient.invalidateQueries({queryKey: LEITNER_SYSTEM_QUERY_KEYS.detail(variables.leitnerSystemId)})
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.details()}) // FIXME: only related cards
                void queryClient.invalidateQueries({queryKey: DECK_QUERY_KEYS.lists()})
            }
            return data
        }
    })
}
