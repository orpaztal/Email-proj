import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service"

export function EmailComposer(){
    const [ email, setEmail ] = useState(emailService.createEmail())
    const { onSendMail, onUpdateEmailDebounce } = useOutletContext()

    const { to, subject, body } = email

    // useEffect(() => {
    //     console.log("composer onUpdateEmailDebounce: ", email)
    //     onUpdateEmailDebounce(email)
    // }, [email])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        
        setEmail((prev) => ({ ...prev, [field]: value }))
        
        // setEmail((prev) => {
        //     const updatedEmail = { ...prev, [field]: value };
        //     console.log("composer onUpdateEmailDebounce: ", updatedEmail)
        //     onUpdateEmailDebounce(updatedEmail);
        //     return updatedEmail;
        // });
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const updatedEmail = { ...email, sentAt: new Date() };
    
        setEmail(updatedEmail);
        onSendMail(updatedEmail);
    }

    return (
        <div className="composer">
            <Link to="/mail">Back</Link>

            <form onSubmit={handleSubmit}>
                <label className="email-composer-to" htmlFor="to">To:</label>
                <input
                    className="email-composer-to-input"
                    value={to}
                    onChange={handleChange}
                    id="to"
                    name="to"
                    type="text"
                />
                
                <label className="email-composer-subject" htmlFor="subject">Subject:</label>
                <input
                    className="email-composer-subject-input"
                    value={subject}
                    onChange={handleChange}
                    id="subject"
                    name="subject"
                    type="text"
                />
                
                <label className="email-composer-body" htmlFor="body">Message body:</label>
                <textarea
                    className="email-composer-body-input"
                    value={body}
                    onChange={handleChange}
                    id="body"
                    name="body"
                />

                <button type="submit" className="email-send-mail">Send</button>
            </form>
        </div>
    );
}