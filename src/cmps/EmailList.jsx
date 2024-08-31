import { EmailPreview } from "./EmailPreview";

/* eslint-disable react/prop-types */
export function EmailList({ emails, onRemove, onUpdateEmail }) {
    return <section className="email-list">
            <ul>
                {emails.map(email => <EmailPreview key={email.id} email={email} onRemove={onRemove} onUpdateEmail={onUpdateEmail}/>)}
            </ul>
        </section>
}