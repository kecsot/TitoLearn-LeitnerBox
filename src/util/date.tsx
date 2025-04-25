import {pluralize} from "./plural";

export const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

export const convertMinutesToDHM = (totalMinutes: number): { days: number, hours: number, minutes: number } => {
    const minutesInAnHour = 60;
    const minutesInADay = 24 * minutesInAnHour;

    const days = Math.floor(totalMinutes / minutesInADay);
    const hours = Math.floor((totalMinutes % minutesInADay) / minutesInAnHour);
    const minutes = totalMinutes % minutesInAnHour;

    return {days, hours, minutes};
}

export const convertDHMToMinutes = (days: number, hours: number, minutes: number): number =>
    (days * 24 * 60) + (hours * 60) + minutes;

export const convertMinutesToText = (totalMinutes: number) => {
    const dhm = convertMinutesToDHM(totalMinutes);

    let result = [];
    if (dhm.days) result.push(dhm.days + ' ' + pluralize(dhm.days, 'day', 'days'))
    if (dhm.hours) result.push(dhm.hours + ' ' + pluralize(dhm.hours, 'hour', 'hours'))
    if (dhm.minutes) result.push(dhm.minutes + ' ' + pluralize(dhm.minutes, 'minute', 'minutes'))

    return result.join('  ');
}