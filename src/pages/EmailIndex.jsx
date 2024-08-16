import { useEffect, useState } from "react"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"

export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [emails, setEmails] = useState(null)
    const [ filterBy, setFilterBy ] = useState(defaultFilter)

    useEffect(() => {
        loadEmails()

    }, [filterBy])


    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log(err)            
            alert('Couldnt load emails')
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    if (!emails) return <div> Loading... </div>
    
    return (
        <div className="email-index">
            <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy}/>
            <section className="email-list-and-folders">
                <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy}/>
                <EmailList emails={emails}/>
            </section>
        </div>
    )
}