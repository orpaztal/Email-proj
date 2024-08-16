import { useEffect, useState } from "react"

export function EmailFolderList({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onInboxPressed(){
        setFilterByToEdit(prev => ({ ...prev, ["status"]: "inbox" }))
    }

    function onSentPressed(){
        setFilterByToEdit(prev => ({ ...prev, ["status"]: "sent" }))
    }

    function onStarredPressed(){
        setFilterByToEdit(prev => ({ ...prev, ["status"]: "star" }))
    }

    function onTrashPressed(){
        setFilterByToEdit(prev => ({ ...prev, ["status"]: "trash" }))
    }

    return <section className="email-folder-list">
        <h4 className="inbox-btn" onClick={onInboxPressed}>Inbox</h4>
        <h4 className="sent-btn" onClick={onSentPressed}>Sent</h4>
        <h4 className="stared-btn" onClick={onStarredPressed}>Starred</h4>
        <h4 className="trash-btn" onClick={onTrashPressed}>Trash</h4>
    </section>
}
