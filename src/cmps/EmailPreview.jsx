import { useState } from "react"
import { Link } from "react-router-dom";
import { emailService } from '../services/email.service';

import yellowStar from '../assets/imgs/star-yellow.png'
import star from '../assets/imgs/star.png'

export function EmailPreview({ email, removeEmail }){
    const [ isStar, setIsStar ] = useState(email.isStarred)
    const [ isRead, setIsRead ] = useState(email.isRead)
    const [ removedAt, setRemovedAt ] = useState(email.removedAt)

    const date = new Date(email.sentAt);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    function className() {
        return `email-preview ${isRead ? "email-preview-read" : "email-preview-unread"}`;
    }

    async function onStarPress() {
        const changedEmail = { ...email, isStarred: !isStar }
        try {
            console.log("changedEmail", changedEmail)
            await emailService.save(changedEmail)
            setIsStar(prev=> !prev)
        } catch (err) {
            console.log("failed to change is starred ", err);
        }
    }

    async function onChangeReadUnread(isReadStatus = null) {
        const changedEmail = { ...email, isRead: isReadStatus }
        try {
            await emailService.save(changedEmail)
            setIsRead(isReadStatus)
        } catch (err) {
            console.log("failed to change read unread mail ", err);
        }
    }

    async function onRemove(){
        const removeDate = new Date().toDateString()
        console.log(removeDate)
        const changedEmail = { ...email, removedAt: removeDate}
        try {
            await emailService.save(changedEmail)
            setRemovedAt(removeDate)
        } catch (err) {
            console.log("failed to remove mail ", err);
        }
    }

        return <li className={className()} onClick={() => onChangeReadUnread(true)}>
                <img className="star-img" 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onStarPress();
                    }}
                    src={isStar ? yellowStar : star} 
                    alt=""
                />
                <Link className={"email-details-link"} to={`/email/${email.id}`}>
                    <section className="email-left">
                        <p className="email-subject" style={{ fontWeight: isRead ? 'lighter' : 'bold' }}>{email.subject}</p>
                        <p className="email-body" style={{ fontWeight: isRead ? 'lighter' : 'bold' }}>{email.body}</p>
                    </section>
                    <p className="email-date">{formattedDate}</p>
                    <button onClick={() => removeEmail(email.id)}>Remove perminnenty</button>
                </Link>

                    <div className="hover-buttons">
                        <button className="hover-button"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onChangeReadUnread(!isRead);
                            }}
                        > Mark {isRead ? 'unread' : 'read'} </button>
                        
                        <button className="hover-button"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onRemove();
                            }}
                        > Remove </button>
                    </div>
            </li>
        }