import React from "react";
import {RefreshControlProps} from "react-native";


export type BaseType = {
    id: number
}

export type WithTimestamps = {
    created_at: Date,
    updated_at: Date
}

export type WithOwner = {
    owner_id: number
}

export type PaginateLinksType = {
    first: string
    last: string
    prev?: string
    next?: string
}

export type PaginateMetaType = {
    current_page: number
    last_page: number
    from: number
    to: number
    per_page: number
    total: number
}

export type PaginateListType<T> = {
    data: T[],
    links?: PaginateLinksType
    meta: PaginateMetaType
}

export type DeckType =  BaseType & WithTimestamps & WithOwner & {
    title: string
    description?: string
    leitner_system_id: number
    running_learning_id: number | null
    count_of_due_cards: number
    count_of_cards: number
}

export type DeckEditableType = Pick<DeckType, 'title'|'description'>

export type CardSideType = BaseType & WithTimestamps & {
    text: string
    image_id: number
    image_url: string
}

export type CardType =  BaseType & WithTimestamps &  {
    card_side_front: CardSideType
    card_side_back: CardSideType
    box_id: number
    put_in_to_box_at: Date
    last_box_history_event: CardBoxHistoryEvent
}

export type LearningAnswerStats = {
    know: number
    dont_know: number
    repeat: number
}

export type CardWithAnswerStats = {
    card: CardType
    answers_stats: LearningAnswerStats
}

export type AssetFormDataType = {
    uri: string,
    type: string,
    name: string,
}

export type AssetEmptyMeaning = 'not_changed'|'removed'

type CardSideEditableType = {
    text: string,
    image?: {
        asset?: AssetFormDataType
        asset_empty_meaning?: AssetEmptyMeaning,
    }
}

export type CardEditableType = {
    front: CardSideEditableType
    back: CardSideEditableType
}

export enum LearningState {
    RUNNING = 'running',
    CANCELED = 'canceled',
    DONE = 'done'
}

export type LearningType = BaseType & WithTimestamps & WithOwner & {
    state: LearningState
    deck_id: number
    owner_id: number
    number_of_total_cards: number
    number_of_answers: {
        know: number,
        repeat: number,
        dont_know: number
    }
}

export type LearningCalculationType = {
    count_of_cards_to_learn: number
}

export type LearningCalculationFilters = {
    thresholdInMinutes: number
}

export enum LearningAnswer {
    KNOW = 'know',
    DONT_KNOW = 'dont_know',
    REPEAT = 'repeat'
}

export type AnswerType = BaseType & WithTimestamps & {
    card_id: number,
    learning_id: number,
    answer: LearningAnswer
}

export type LeitnerSystemBoxType = BaseType & WithTimestamps & {
    delay_in_minutes: number
    count_of_cards: number
    index: number
    system_generated: boolean
}

export type LeitnerSystemBoxEditableType = {
    delay_in_minutes: number
}

export type LeitnerSystemType = BaseType & WithTimestamps & {
    boxes: LeitnerSystemBoxType[]
}

export enum CardBoxHistoryEvent {
     CARD_CREATED = 'card_created',

     ANSWER_DONT_KNOW = 'answer_dont_know',
     ANSWER_KNOW = 'answer_know',
     ANSWER_REPEAT = 'answer_repeat',

     BOX_DELETED = 'box_deleted',
     BOX_ADDED = 'box_added',
     CARD_CONTAINING_BOX_DELETED = 'card_containing_box_deleted',
}

export type CardBoxHistoryType = BaseType & WithTimestamps & {
    card_id: number
    box_id: number
    box_index: number
    previous_box_id: number
    previous_box_index: number
    boxes_count: number
    learning_id: number
    event: CardBoxHistoryEvent
    event_data: string
}

export type HtmlContentType = {
    html: string
}
export type HtmlContentFilters = {
    prefer_dark: boolean
}

export type VerifyTransactionResponseType = {
    approved: boolean
}

export type RefreshControlType = React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>>