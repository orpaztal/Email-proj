import { useEffect, useState } from "react";
import { EmailDashboard } from "../cmps/EmailDashboard";
import { emailService } from "../services/email.service";

export function AboutUs() {
    const [ emails, setEmails ] = useState(null)
    const [ numOfRead, setNumOfRead] = useState(emails?.length)
    const [ numOfUnread, setNumOfUnread] = useState(emails?.length)
    const [ numOfDeleted, setNumOfDeleted] = useState(emails?.length)

    useEffect(() => {
        getEmails() 
    }, [])

    async function getEmails() {
        const returnedEmails = await emailService.query(emailService.getDefaultFilter())
        setEmails(returnedEmails)

        setNumOfUnread(returnedEmails.filter(email => email.to === 'user@appsus.com' && email.removedAt === null && !email.isRead)?.length || 0)
        setNumOfRead(returnedEmails.filter(email => email.to === 'user@appsus.com' && email.removedAt === null && email.isRead)?.length || 0)
        
        const deletedEmails = await emailService.query({
            folder: "trash", 
            txt: "", 
            isRead: null,
            sortField: "",  
            sortOrder: "asc",  
        })
        setNumOfDeleted(deletedEmails?.length || 0)
    } 


    return <div className="about-us">
        <h1>We are an app that manage your emails</h1>
        <EmailDashboard numOfRead={numOfRead} numOfUnread={numOfUnread} numOfDeleted={numOfDeleted}/>
    </div>
}