import { useEffect, useState } from "react"
import { EmailFolder } from "./EmailFolder"

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
        <EmailFolder btnText={"Inbox"} onClick={onInboxPressed}/>
        <EmailFolder btnText={"Sent"} onClick={onSentPressed}/>
        <EmailFolder btnText={"Starred"} onClick={onStarredPressed}/>
        <EmailFolder btnText={"Trash"} onClick={onTrashPressed}/>
    </section>
}
