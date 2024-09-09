import { useState } from "react"
import { Button } from '@mui/material';
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import PropTypes from 'prop-types'

export function EmailFilter({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const [ isRead, setIsRead ] = useState(filterBy.isRead)

    useEffectUpdate(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleSearchChange({ target }) {
        const { value, name } = target
        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function onReadUnreadClick() {
        setIsRead(prev => !prev)
        setFilterByToEdit(prev => ({ ...prev, ["isRead"]: !isRead }))
    }

    function onAllClick() {
        setFilterByToEdit(prev => ({ ...prev, ["isRead"]: null }))
    }

    function btnName() {
        return isRead ? "Unread" : "Read"
    }

    return <section className="email-filter">
        <section>
            <label className="email-filter-label" htmlFor="txt">Search</label>
            <input 
                className="email-search"
                value={filterByToEdit.txt} 
                onChange={handleSearchChange}
                id="txt" 
                name="txt" 
                type="text" />
        </section>

        <section>
            <label className="email-read-label">Filer Read/Unread emails</label>
            <Button className="email-read-button" variant="outlined" onClick={onReadUnreadClick}>{btnName()}</Button>
            <Button className="email-read-button" variant="outlined" onClick={onAllClick}>All</Button>
        </section>

    </section>
}

EmailFilter.propTypes = {
    filterBy: PropTypes.object.isRequired, 
    onFilterBy: PropTypes.func.isRequired
}