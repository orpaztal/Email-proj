import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails }) {
    return <section className="email-list">
            <ul>
                {emails.map(email => <EmailPreview key={email.id} email={email}/>)}
            </ul>
        </section>
}