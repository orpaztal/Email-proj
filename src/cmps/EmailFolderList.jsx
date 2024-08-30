import { useEffect, useState } from "react"
import { EmailFolder } from "./EmailFolder"

export function EmailFolderList({ filterBy, onFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onFolderPress(folderName){
        setFilterByToEdit(prev => ({ ...prev, ["folder"]: folderName }))
    }

    return <section className="email-folder-list">
        <EmailFolder btnText={"Inbox"} onClick={() => onFolderPress("inbox")}/>
        <EmailFolder btnText={"Sent"} onClick={() => onFolderPress("sent")}/>
        <EmailFolder btnText={"Starred"} onClick={() => onFolderPress("star")}/>
        <EmailFolder btnText={"Trash"} onClick={() => onFolderPress("trash")}/>
    </section>
}
