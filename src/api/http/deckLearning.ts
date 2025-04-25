import {
    LearningCalculationFilters,
    LearningCalculationType,
    LearningState,
    LearningType,
    PaginateListType
} from "../../types";
import axios from "../axios";


export const getDeckLearningList = async (deckId: number, page: number, state?: LearningState) => {
    let url = `/decks/${deckId}/learnings?&page=${page}`
    if(state) url = url + `&state=${state}`

    return axios.get(url)
        .then((response) => response.data as PaginateListType<LearningType>)
}

export const postStartDeckLearning = (deckId: number, filters: LearningCalculationFilters) =>
    axios.post(`decks/${deckId}/learnings/start`,{
        threshold_in_minutes: filters.thresholdInMinutes
    })
        .then((response) => response.data.data as LearningType)

export const postCancelDeckLearning = (deckId: number, learningId: number) =>
    axios.post(`decks/${deckId}/learnings/${learningId}/cancel`)
        .then((response) => true)

export const calculateDeckLearning = (deckId: number, filters: LearningCalculationFilters) =>
    axios.post(`decks/${deckId}/learnings/calculate`, {
        threshold_in_minutes: filters.thresholdInMinutes
    })
    .then(response => response.data.data as LearningCalculationType)