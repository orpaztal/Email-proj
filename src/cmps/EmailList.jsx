import { EmailPreview } from "./EmailPreview";
import PropTypes from 'prop-types'

export function EmailList({ emails, onRemove, onUpdateEmail, selectedFolder }) {
    return <section className="email-list">
            <ul>
                { emails.map(email => <EmailPreview key={email.id} email={email} onRemove={onRemove} onUpdateEmail={onUpdateEmail} selectedFolder={selectedFolder}/>)}
            </ul>
        </section>
}

EmailList.propTypes = {
    emails: PropTypes.array.isRequired, 
    onRemove: PropTypes.func.isRequired,
    onUpdateEmail: PropTypes.func.isRequired,
    selectedFolder: PropTypes.string.isRequired,
}