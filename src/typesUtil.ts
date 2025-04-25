import {CardBoxHistoryEvent, LearningAnswer, LearningState} from "./types";

export const getCardBoyHistoryEventLabel = (item: CardBoxHistoryEvent) => {
    switch (item) {
        case CardBoxHistoryEvent.CARD_CREATED:
            return 'Card created'
        case CardBoxHistoryEvent.ANSWER_DONT_KNOW:
            return 'Answer: Don\'t know'
        case CardBoxHistoryEvent.ANSWER_KNOW:
            return 'Answer: Know'
        case CardBoxHistoryEvent.ANSWER_REPEAT:
            return 'Answer: Repeat'
        case CardBoxHistoryEvent.BOX_DELETED:
            return 'Box deleted'
        case CardBoxHistoryEvent.BOX_ADDED:
            return 'Box added'
        case CardBoxHistoryEvent.CARD_CONTAINING_BOX_DELETED:
            return 'Box deleted (Card was inside the box. Moved)'
    }
}

export const getLearningStateLabel = (item: LearningState) => {
    switch (item) {
        case LearningState.DONE:
            return 'Done'
        case LearningState.CANCELED:
            return 'Canceled'
        case LearningState.RUNNING:
            return 'Running'
    }
}

export const getLearningAnswerLabel = (item: LearningAnswer) => {
    switch (item) {
        case LearningAnswer.KNOW:
            return 'Know'
        case LearningAnswer.DONT_KNOW:
            return "Don't Know"
        case LearningAnswer.REPEAT:
            return 'Repeat'
    }
}