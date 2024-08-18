import { useState } from "react"

export function EmailComposer({ onSendMail }){

    const [ to, setTo ] = useState("")
    const [ subject, setSubject ] = useState("")
    const [ body, setBody ] = useState("")

    function handleChange({ target: { name, value } }) {
        const stateUpdaters = {
            to: setTo,
            subject: setSubject,
            body: setBody,
        };
        stateUpdaters[name](value);
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        onSendMail(to, subject, body);
    }

    return (
        <div>
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