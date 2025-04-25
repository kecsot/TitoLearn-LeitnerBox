import {CardBoxHistoryEvent} from "../types";

const DAY_IN_MS = 86400000
const HOUR_IN_MS = 86400000 / 24
const MINUTES_IN_MS = 86400000 / 24 / 60


export const formatDueDate = (lastBoxHistoryEvent: CardBoxHistoryEvent, putInBox: Date, dueAfterMinutes: number) => {
    const isNewCard = lastBoxHistoryEvent === CardBoxHistoryEvent.CARD_CREATED
    if (isNewCard || isDueDated(putInBox, dueAfterMinutes)) {
        return 'Now'
    }

    const dueDate = new Date(putInBox)
    dueDate.setMinutes(dueDate.getMinutes() + dueAfterMinutes)

    let difference = dueDate.getTime() - (new Date()).getTime()

    const days = Math.floor(difference / DAY_IN_MS);
    if (days) difference -= (days * DAY_IN_MS)

    const hours = Math.floor(difference / HOUR_IN_MS);
    if (hours) difference -= (hours * HOUR_IN_MS)

    const minutes = Math.round(difference / MINUTES_IN_MS)

    let result = ""
    if (days) result += `${days} days `
    if (hours) result += `${hours} hours `
    if (minutes) result += `${minutes} minutes `

    if (result !== '') {
        result += `later`
    } else {
        result = 'in seconds'
    }

    return result
}

export const isDueDated = (putInBox: Date, dueAfterMinutes: number) => {
    const dueDate = new Date(putInBox)
    dueDate.setMinutes(dueDate.getMinutes() + dueAfterMinutes)

    return dueDate <= new Date()
}
