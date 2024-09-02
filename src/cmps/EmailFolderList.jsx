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
    
    const folders = [
        { folder: "Inbox", img: inbox, count: unreadCount },
        { folder: "Sent", img: sent },
        { folder: "Starred", img: star },
        { folder: "Trash", img: trash },
        { folder: "Drafts", img: draft }
    ];

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

        { folders.map(({ folder, img, count }) => (
            <EmailFolder
                key={folder}
                folder={folder}
                img={img}
                onClick={() => onFolderPress(folder.toLowerCase())}
                count={count}
            />
        )) }
    </section>
}
