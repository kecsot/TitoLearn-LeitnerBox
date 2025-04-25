import axios from "../axios";
import {CardEditableType, CardType, PaginateListType} from "../../types";
import FormData from "form-data";

export const getCardList = (deckId: number, page: number) =>
    axios.get(`decks/${deckId}/cards?page=${page}`)
        .then((response) => response.data as PaginateListType<CardType>)

export const getCardById = (deckId: number, cardId: number) =>
    axios.get(`decks/${deckId}/cards/${cardId}`)
        .then((response) => response.data.data as CardType)

export const postCard = (deckId: number, data: CardEditableType) => {
   const formData = prepareCardEditableFormData(data)

    return axios.postForm(`decks/${deckId}/cards`, formData)
        .then(response => response.data.data as CardType)
}

export const patchCard = (deckId: number, cardId: number, data: CardEditableType) => {
    const formData = prepareCardEditableFormData(data)
    formData.append('_method', 'PATCH')

    return axios.post(`decks/${deckId}/cards/${cardId}`, formData)
        .then(response => response.data.data as CardType)
}

export const deleteCard = (deckId: number, cardId: number) =>
    axios.delete(`decks/${deckId}/cards/${cardId}`)
        .then(x => true)


const prepareCardEditableFormData = (data: CardEditableType) => {
    const formData = new FormData();

    formData.append('front.text', data.front.text);
    formData.append('front.image', data.front.image?.asset ?? null);
    formData.append('front.image_empty_meaning', data.front.image?.asset_empty_meaning  ?? null);

    formData.append('back.text', data.back.text);
    formData.append('back.image', data.back.image?.asset  ?? null);
    formData.append('back.image_empty_meaning', data.back.image?.asset_empty_meaning  ?? null);
    return formData;
}