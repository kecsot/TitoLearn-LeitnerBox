import axios from "../axios";
import {CardBoxHistoryType, PaginateListType} from "../../types";


export const getCardBoxHistoryList = (deckId: number, cardId: number, page: number) =>
    axios.get(`decks/${deckId}/cards/${cardId}/box-history?page=${page}`)
        .then((response) => response.data as PaginateListType<CardBoxHistoryType>)