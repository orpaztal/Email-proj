import { useEffect, useState } from "react"
import { EmailFolder } from "./EmailFolder"
import { EmailComposer } from "./EmailComposer"

export function EmailFolderList({ filterBy, onFilterBy, onSendMail }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)
    const [ isModalOpen, setIsModalOpen ] = useState(false); 

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onFolderPress(folderName){
        setFilterByToEdit(prev => ({ ...prev, ["folder"]: folderName }))
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

    return <section className="email-folder-list">
        <button className="compose-btn" onClick={onComposePress}>Compose</button>

        <EmailFolder btnText={"Inbox"} onClick={() => onFolderPress("inbox")}/>
        <EmailFolder btnText={"Sent"} onClick={() => onFolderPress("sent")}/>
        <EmailFolder btnText={"Starred"} onClick={() => onFolderPress("star")}/>
        <EmailFolder btnText={"Trash"} onClick={() => onFolderPress("trash")}/>
        <EmailFolder btnText={"Drafts"} onClick={() => onFolderPress("drafts")}/>
    </section>
}
