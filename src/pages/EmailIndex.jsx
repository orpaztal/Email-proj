import { useEffect, useState, useRef } from "react"
import { emailService } from "../services/email.service.js"
import { utilService } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { useSearchParams } from "react-router-dom"

export function EmailIndex() {
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ emails, setEmails ] = useState(null)
    const [ filterBy, setFilterBy ] = useState(emailService.getFilterFromSearchParams(searchParams))
    const [ count, setCount ] = useState(0)

    const onSetFilterByDebounce = useRef(utilService.debounce(onFilterBy, 400)).current

    useEffect(() => {
        loadEmails()
        setSearchParams(utilService.getExistingProperties(filterBy))
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setCount(pre => emails?.filter(email => !email.isRead).length);
            setEmails(emails)
        } catch (err) {
            console.log(err)            
            showErrorMsg('Couldnt load emails')
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
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
            showSuccessMsg(`Email (${newEmail.id}) was sent successfully!`)
        } catch (err) {
            console.log(err)            
            showErrorMsg('Couldnt send email')
        }
    }

    async function onRemove(email){
        const removeDate = new Date().toDateString()
        const changedEmail = { ...email, removedAt: removeDate}
        try {
            await emailService.save(changedEmail)
            setEmails(emails=> emails.filter(email=> email.id !== changedEmail.id))
            showSuccessMsg(`Email (${email.id}) was removed successfully!`)
        } catch (err) {
            showErrorMsg.log("failed to remove mail ", err);
        }
    }

    if (!emails) return <div> Loading... </div>
    const { folder, txt, isRead } = filterBy

    return (
        <div className="email-index">
            <EmailFilter filterBy={{ txt, isRead }} onFilterBy={onSetFilterByDebounce}/>
            <h4>{`Unread Count: ${count}`}</h4>
            <section className="email-list-and-folders">
                <EmailFolderList filterBy={{ folder }} onFilterBy={onSetFilterByDebounce} onSendMail={onSendMail}/>
                <EmailList emails={emails} onRemove={onRemove}/>
            </section>
        </div>
    )
}