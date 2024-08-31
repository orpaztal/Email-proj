import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { EmailFolder } from "./EmailFolder"

/* eslint-disable react/prop-types */
export function EmailFolderList({ filterBy, onFilterBy, unreadCount }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onFolderPress(folderName){
        setFilterByToEdit(prev => ({ ...prev, ["folder"]: folderName }))
    }

    return <section className="email-folder-list">
        <Link className={"compose-btn"} to={"/mail/compose"}>Compose</Link>

        <EmailFolder folder={"Inbox"} onClick={() => onFolderPress("inbox")} count={unreadCount}/>
        <EmailFolder folder={"Sent"} onClick={() => onFolderPress("sent")}/>
        <EmailFolder folder={"Starred"} onClick={() => onFolderPress("star")}/>
        <EmailFolder folder={"Trash"} onClick={() => onFolderPress("trash")}/>
        <EmailFolder folder={"Drafts"} onClick={() => onFolderPress("drafts")}/>
    </section>
}
