import {AnswerType, CardType, CardWithAnswerStats, LearningAnswer, LearningType, PaginateListType} from "../../types";
import axios from "../axios";


export const getLearningById = (learningId: number) =>
    axios.get(`learnings/${learningId}`)
        .then((response) => response.data.data as LearningType)

export const getLearningCardList = (learningId: number) =>
    axios.get(`learnings/${learningId}/cards`)
        .then((response) => response.data.data as CardType[])

export const getLearningCardWithAnswerStatsList = (learningId: number) =>
    axios.get(`learnings/${learningId}/cards-with-answer-stats`)
        .then((response) => response.data.data as CardWithAnswerStats[])

export const getLearningAnswerList = async (learningId: number, page: number) => {
    let url = `learnings/${learningId}/answers?page=${page}`

    return axios.get(url)
        .then((response) => response.data as PaginateListType<AnswerType>)
}

export const postAnswer = async (learningId: number, cardId: number, answer: LearningAnswer) => {
    let response = await axios.post(`learnings/${learningId}/cards/${cardId}/answer`, {answer});
    return response.data.data as AnswerType;
}
