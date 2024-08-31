/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

export function EmailFilter({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const [ isRead, setIsRead ] = useState(filterBy.isRead)

    useEffect(() => {
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
            <button className="email-read-button" onClick={onReadUnreadClick}>{btnName()}</button>
            <button className="email-read-button" onClick={onAllClick}>All</button>
        </section>

    </section>
}