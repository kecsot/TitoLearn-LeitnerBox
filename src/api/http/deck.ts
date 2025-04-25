import {DeckEditableType, DeckType, PaginateListType} from "../../types";
import axios from "../axios";

export const getDeckById = (deckId: number) =>
    axios.get(`decks/${deckId}`)
        .then(response => response.data.data as DeckType)

export const getDeckList = (page: number) =>
    axios.get(`decks?page=${page}`)
        .then(response => response.data as PaginateListType<DeckType>)

export const postDeck = (data: DeckEditableType) =>
    axios.post(`decks`, data)
        .then(response => response.data.data as DeckType)

export const patchDeck = (deckId: number, body: DeckEditableType) =>
    axios.patch(`decks/${deckId}`, body)
        .then(response => response.data.data as DeckType)

export const deleteDeck = (deckId: number) =>
    axios.delete(`decks/${deckId}`)
        .then(x => true)
