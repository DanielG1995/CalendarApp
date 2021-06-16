import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../actions/calendar'

import './modal.css';
import { clearActiveEvent, startAddNewEvent, startEditEvent } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).second(0).add(1, 'hours');
const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: now.add(1, 'hours').toDate()
}


export const CalendarModal = () => {

    const dispatch = useDispatch()
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [startDate, setStartDate] = useState(now.toDate())
    const [endDate, setEndDate] = useState(now.add(1, 'hours').toDate())
    const [validTitle, setValidTitle] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)
    useEffect(() => {
        if (activeEvent) {
            setFormValues({ ...activeEvent });
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent])


    const { title, notes, start, end } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }


    const closeModalUI = () => {
        dispatch(closeModal());
        dispatch(clearActiveEvent());
        setFormValues(initEvent);
    }

    const handleChangeStartDate = (e) => {
        setStartDate(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleChangeEndDate = (e) => {
        setEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha final debe ser mayor', 'error');
        }
        if (title.trim().length === 0) {
            return setValidTitle(false);
        }
        setValidTitle(true);
        const event = { ...formValues };
        if (event.id) {
            dispatch(startEditEvent(event));
        } else {
            dispatch(startAddNewEvent(event));
        }
        closeModalUI();
    }


    return (
        <Modal
            className="modal"
            overlayClassName="modal-fondo"
            isOpen={modalOpen}
            //  onAfterOpen={afterOpenModal}
            onRequestClose={closeModalUI}
            closeTimeoutMS={200}
            shouldCloseOnEsc={true}
            style={customStyles}
            contentLabel="EJEMPLO"
        >
            <h1> {(!!activeEvent?.id) ? 'Editar Evento' : 'Guardar Evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleChangeStartDate}
                        value={startDate}
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleChangeEndDate}
                        value={endDate}
                        minDate={startDate}
                        className="form-control" />
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!validTitle && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        minLength="3"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary form-control"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
                <br />
            </form>
        </Modal>
    )
}
