import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, removeEmail }) {
    return <section className="email-list">
            <ul>
                {emails.map(email => <EmailPreview key={email.id} email={email} removeEmail={removeEmail}/>)}
            </ul>
        </section>
}