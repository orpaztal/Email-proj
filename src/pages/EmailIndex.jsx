import { useEffect, useState } from "react"
import { emailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)

    const defaultFilter = emailService.getDefaultFilter()
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

    if (!emails) return <div>Loading...</div>
    
    return (
        <div className="email-index">
            <EmailList emails={emails}/>
        </div>
    )
}