import {useSuspenseInfiniteQuery} from "@tanstack/react-query";
import {getCardBoxHistoryList} from "../http/deckCardBoxHistory";
import {getBaseNextPageParam, getBasePreviousPageParam} from "./util";
import {useFocusNotifyOnChangeProps} from "../../hooks/useFocusNotifyOnChangeProps";

export const DECK_CARD_BOX_HISTORY_QUERY_KEYS = {
    lists: (deckId: number, cardId: number) => ['decks', 'item', deckId, 'card', 'item', cardId, 'box-history', 'list'] as const,
}

export const useGetCardBoxHistorySuspenseInfiniteQuery = (params: {
    deckId: number,
    cardId: number
}) => {
    const notifyOnChangeProps = useFocusNotifyOnChangeProps()

    return useSuspenseInfiniteQuery({
        queryKey: DECK_CARD_BOX_HISTORY_QUERY_KEYS.lists(params.deckId, params.cardId),
        queryFn: ({pageParam}) => getCardBoxHistoryList(params.deckId, params.cardId, pageParam),
        initialPageParam: 1,
        getNextPageParam: getBaseNextPageParam,
        getPreviousPageParam: getBasePreviousPageParam,
        notifyOnChangeProps
    })
}
