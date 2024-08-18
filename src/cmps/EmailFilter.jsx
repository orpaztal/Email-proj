import { useEffect, useState } from "react"
import { EmailComposer } from "./EmailComposer"

export function EmailFilter({ filterBy, onFilterBy, onSendMail }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const [ isRead, setIsRead ] = useState(filterBy.isRead)
    const [isModalOpen, setIsModalOpen] = useState(false); 

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

    function onComposePress() {
        setIsModalOpen(true); 
    }

    function closeModal() {
        setIsModalOpen(false); 
    }

    function handleSendMail(to, subject, body) {
        onSendMail(to, subject, body);
        closeModal(); 
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

        <button className="compose-btn" onClick={onComposePress}>Compose</button>

        {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeModal}>X</button>
                        <EmailComposer onSendMail={handleSendMail} />
                    </div>
                </div>
            )}
    </section>
}