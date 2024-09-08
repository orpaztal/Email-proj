import { Link } from "react-router-dom";

import yellowStar from '../assets/imgs/star-yellow.png'
import star from '../assets/imgs/star.png'

/* eslint-disable react/prop-types */
    export function EmailPreview({ email, onRemove, onUpdateEmail, selectedFolder }){

    const date = new Date(email.sentAt);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    function className() {
        return `email-preview ${email.isRead ? "email-preview-read" : "email-preview-unread"}`;
    }

    function onUpdateEmailStatus(e, { isStarred = null, isRead = null }) {
        e.stopPropagation();
        const changedEmail = { 
            ...email, 
            ...(isStarred !== null && { isStarred: isStarred }), 
            ...(isRead !== null && { isRead })
        };
        onUpdateEmail(changedEmail);
    }

    function onMailPressPath() {
        return selectedFolder === "drafts" ? `/mail/compose/${email.id}` : `/mail/${email.id}`
    }

        return <li className={className()} onClick={(e) => onUpdateEmailStatus(e, { isRead: true })}>
                <img className="star-img" 
                    onClick={(e) => {
                        onUpdateEmailStatus(e, { isStarred: !email.isStarred });
                    }}
                    src={email.isStarred ? yellowStar : star} 
                    alt=""
                />
                <Link className={"email-details-link"} to={onMailPressPath()}>
                    <section className="email-left">
                        <p className="email-subject ellipsis-text" style={{ fontWeight: email.isRead ? 'lighter' : 'bold' }}>{email.subject}</p>
                        <p className="email-body ellipsis-text" style={{ fontWeight: email.isRead ? 'lighter' : 'bold' }}>{email.body}</p>
                    </section>
                    <p className="email-date">{formattedDate}</p>
                </Link>

                    <div className="hover-buttons">
                        <button className="hover-button"
                            onClick={(e) => {
                                onUpdateEmailStatus(e, { isRead: !email.isRead });
                            }}
                        > Mark {email.isRead ? 'unread' : 'read'} </button>
                        
                        <button className="hover-button"
                            onClick={(e) => {
                                e.stopPropagation(); 
                                onRemove(email);
                            }}
                        > Remove </button>
                    </div>
            </li>
    }