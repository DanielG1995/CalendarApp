import moment from 'moment'

export const prepareEvents = (events = []) => {
    return events.map((ev) => (
        {
            ...ev,
            end: moment(ev.end).toDate(),
            start: moment(ev.start).toDate()
        }))
}