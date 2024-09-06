import { useState, useEffect, useRef } from "react"
import { Link, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service"

export function EmailComposer(){
    const [ email, setEmail ] = useState(emailService.createEmail())
    const { searchParams, onSendMail, onUpdateEmail } = useOutletContext()
    const timeoutRef = useRef(null)
    
    useEffect(() => {
        console.log("composer searchParams: ", searchParams.toString());

        const to = searchParams.get("to") || "";
        const subject = searchParams.get("subject") || "";
        const body = searchParams.get("body") || "";

        setEmail(prevEmail => ({ ...prevEmail, to, subject, body }));
    }, [searchParams]);

    const { to, subject, body } = email

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        
        timeoutRef.current = setTimeout(async () => {
            const updatedEmail = await onUpdateEmail(email);
            setEmail(updatedEmail);
        }, 5000);

        return () => clearTimeout(timeoutRef.current);
    }, [email, onUpdateEmail]);

    function handleChange({ target }) {
        let { name: field, value, type } = target;
        if (type === 'number' || type === 'range') value = +value;
        else if (type === 'checkbox') value = target.checked;

        setEmail(prev => ({ ...prev, [field]: value }));
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