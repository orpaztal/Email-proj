import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { EmailFolder } from "./EmailFolder"

import inbox from '../assets/imgs/inbox.png'
import sent from '../assets/imgs/sent.png'
import star from '../assets/imgs/starred.png'
import trash from '../assets/imgs/trash.png'
import draft from '../assets/imgs/draft.png'
import pencil from '../assets/imgs/pencil.png'

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
        <Link className={"compose-btn"} to={"/mail/compose"}>
        <img className="compose-icon" 
                        src={pencil} 
                        alt=""
                    />
            Compose </Link>

        <EmailFolder folder={"Inbox"} img={inbox} onClick={() => onFolderPress("inbox")} count={unreadCount}/>
        <EmailFolder folder={"Sent"} img={sent} onClick={() => onFolderPress("sent")}/>
        <EmailFolder folder={"Starred"} img={star} onClick={() => onFolderPress("star")}/>
        <EmailFolder folder={"Trash"} img={trash} onClick={() => onFolderPress("trash")}/>
        <EmailFolder folder={"Drafts"} img={draft} onClick={() => onFolderPress("drafts")}/>
    </section>
}
