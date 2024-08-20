import { useEffect, useState } from "react"
import { emailService } from "../services/email.service.js"

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"

export function EmailIndex() {
    const defaultFilter = emailService.getDefaultFilter()

    const [ emails, setEmails ] = useState(null)
    const [ filterBy, setFilterBy ] = useState(defaultFilter)
    const [ count, setCount ] = useState(0)

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setCount(pre => emails?.filter(email => !email.isRead).length);
            setEmails(emails)
        } catch (err) {
            console.log(err)            
            alert('Couldnt load emails')
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    async function onSendMail(to, subject, body) {
        const newEmail = {
            to: to || 'ypp@aps.com',
            subject: subject || "Default sub",
            body: body || "body body body", 
            isRead: false,
            isStarred: false,
            sentAt: new Date(),
            removedAt: null,
        };
        
        try {
            await emailService.save(newEmail)
            setEmails((emails) => [...emails, newEmail]);
        } catch (err) {
            console.log(err)            
            alert('Couldnt send email')
        }
    }

    async function onRemove(email){
        const removeDate = new Date().toDateString()
        const changedEmail = { ...email, removedAt: removeDate}
        try {
            await emailService.save(changedEmail)
            setEmails(emails=> emails.filter(email=> email.id !== changedEmail.id))
        } catch (err) {
            console.log("failed to remove mail ", err);
        }
    }

    if (!emails) return <div> Loading... </div>
    
    return (
        <div className="email-index">
            <EmailFilter filterBy={filterBy} onFilterBy={onFilterBy} onSendMail={onSendMail}/>
            <h4>{`Unread Count: ${count}`}</h4>
            <section className="email-list-and-folders">
                <EmailFolderList filterBy={filterBy} onFilterBy={onFilterBy}/>
                <EmailList emails={emails} onRemove={onRemove}/>
            </section>
        </div>
    )
}