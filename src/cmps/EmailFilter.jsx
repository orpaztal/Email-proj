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

    function btnName() {
        return isRead ? "Unread" : "Read"
    }
   
    return <section className="email-filter">
        <label htmlFor="txt">Search</label>
        <input 
            className="email-search"
            value={filterByToEdit.txt} 
            onChange={handleSearchChange}
            id="txt" 
            name="txt" 
            type="text" />

        <button className="email-read-button" onClick={onReadUnreadClick}>{btnName()}</button>
    </section>
}
