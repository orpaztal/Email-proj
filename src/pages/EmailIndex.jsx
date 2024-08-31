import { useEffect, useState, useRef } from "react"
import { Outlet, useSearchParams, useNavigate } from "react-router-dom"

import { emailService } from "../services/email.service.js"
import { utilService } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { EmailList } from "../cmps/EmailList.jsx"
import { EmailFilter } from "../cmps/EmailFilter.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"

/* eslint-disable react/prop-types */
export function EmailIndex() {
    const navigate = useNavigate()
    const [ searchParams, setSearchParams ] = useSearchParams()

    const [ emails, setEmails ] = useState(null)
    const [ count, setCount ] = useState(0)
    const [ filterBy, setFilterBy ] = useState(emailService.getFilterFromSearchParams(searchParams))

    const onSetFilterByDebounce = useRef(utilService.debounce(onFilterBy, 400)).current
    const onUpdateEmailDebounce = useRef(utilService.debounce(onUpdateEmail, 5000)).current

    const { folder, txt, isRead } = filterBy

    useEffect(() => {
        loadEmails()
        setSearchParams(utilService.getExistingProperties(filterBy))
    }, [filterBy])

    useEffect(() => {
        filterBy.folder === "inbox" && setCount(emails?.filter(email => !email.isRead).length);
    }, [emails])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log(err)            
            showErrorMsg('Couldnt load emails')
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    async function onUpdateEmail(email) {
        try {
            console.log("onUpdateEmail: ", email)

            const updatedEmail = await emailService.save(email)
            console.log("onUpdateEmail updatedEmail: ", updatedEmail)

            setEmails(prevEmails => prevEmails.map(curr=> curr.id === updatedEmail.id ? updatedEmail : curr))
        } catch (err) {
            console.log("failed to update", err);
        }
    }

    async function onSendMail(emailToSave) {        
        try {
            const newEmail = await emailService.save(emailToSave)
            if (emailToSave.id) {
                setEmails(emails => [...emails, newEmail]);
            } else {
                setEmails(emails => emails.map(email => email.id === newEmail.id ? newEmail : email))
            }
            showSuccessMsg(`Email (${newEmail.id}) was sent successfully!`)
            navigate('/mail')
        } catch (err) {
            showErrorMsg('Couldnt send email')
        }
    }

    async function onRemove(email){
        const removeDate = new Date().toDateString()
        const changedEmail = { ...email, removedAt: removeDate}

        try {
            (email.removedAt && filterBy.folder === "trash") 
            ? await emailService.remove(email.id) 
            : await emailService.save(changedEmail)
            setEmails(emails=> emails.filter(email=> email.id !== changedEmail.id))
            showSuccessMsg(`Email (${email.id}) was removed successfully!`)
        } catch (err) {
            showErrorMsg("failed to remove mail ", err);
        }
    }

    if (!emails) return <div> No emails to show... </div>

    return (
        <div className="email-index">
            <EmailFilter filterBy={{ txt, isRead }} onFilterBy={onSetFilterByDebounce}/>
            <section className="email-list-and-folders">
                <EmailFolderList filterBy={{ folder }} onFilterBy={onSetFilterByDebounce} unreadCount={count}/>
                <EmailList emails={emails} onRemove={onRemove} onUpdateEmail={onUpdateEmail}/>
            </section>
            <Outlet context={{ onSendMail, onUpdateEmailDebounce }}/>
        </div>
    )
}