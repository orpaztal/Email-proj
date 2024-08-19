import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove }) {
    return <section className="email-list">
            <ul>
                {emails.map(email => <EmailPreview key={email.id} email={email} onRemove={onRemove}/>)}
            </ul>
        </section>
}