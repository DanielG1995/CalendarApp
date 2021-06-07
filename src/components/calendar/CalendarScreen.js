import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSelector } from 'react-redux'

import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { openModal } from '../../actions/calendar'
import { clearActiveEvent, setActiveEvent } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteFab } from '../ui/DeleteFab'

moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
    const { events } = useSelector(state => state.calendar)
    const { activeEvent } = useSelector(state => state.calendar)
    const [view, setView] = useState(localStorage.getItem('lastView') || 'month')
    const dispatch = useDispatch()
    const onDoubleClick = (e) => {
        dispatch(setActiveEvent(e))
        dispatch(openModal());
    }

    const onSelectEvent = (e) => {
        dispatch(setActiveEvent(e))
    }

    const onViewChange = (e) => {
        setView(e);
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: 'white'

        }
    };

    const selectSlot=()=>{
        dispatch(clearActiveEvent());
    }

    return (
        <>
            <NavBar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{ event: CalendarEvent }}
                onSelectSlot={selectSlot}
                selectable={true}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={view}
            />
            <CalendarModal />
            <AddNewFab />
            {activeEvent&&<DeleteFab />}
        </>


    )
}
