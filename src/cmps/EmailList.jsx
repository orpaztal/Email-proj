
export function EmailList({ emails }) {
    return <section className="email-list">
            <ul>
                {emails.map(email => <li key={email.id}>
                    <pre>{JSON.stringify(email, null, 2)}</pre>
                </li>)}
            </ul>
        </section>
}