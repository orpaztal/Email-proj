import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router"
import { Link, useOutletContext } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { emailService } from "../services/email.service"
import { utilService } from "../services/util.service";

const validationSchema = Yup.object({
    to: Yup.string().email('Invalid email address').required('"To" is required'),
    subject: Yup.string().required('"Subject" is required'),
    body: Yup.string().required('"Body" is required'),
});

export function EmailComposer(){
    const { id } = useParams()
    const [ email, setEmail ] = useState(emailService.createEmail())
    const { searchParams, onSendMail, onUpdateEmail } = useOutletContext()
    const timeoutRef = useRef(null)
    
    useEffect(() => {
        if (id) {
            getEmail()
        }
    }, []);

    async function getEmail(){
        try {
            const email = await emailService.getById(id)
            setEmail(email)
        } catch {
            console.log("could not get email")
        }
    }
    
    useEffect(() => {
        console.log("composer searchParams: ", searchParams.toString());
        const to = searchParams.get("to") || "";
        const subject = searchParams.get("subject") || "";
        const body = searchParams.get("body") || "";

        setEmail(prevEmail => ({ ...prevEmail, to, subject, body }));
    }, [searchParams]);

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

    async function handleChange({ target }) {
        let { name: field, value, type, checked } = target;
        if (type === 'number' || type === 'range') value = +value;
        else if (type === 'checkbox') {
            if (checked) {
                const { lat, lng } = await utilService.getUserCordinates()
                value = { lat, lng }
            } else {
                value = null
            }
        }
        setEmail(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (values) => {
        const updatedEmail = { ...email, ...values, sentAt: new Date() };
        setEmail(updatedEmail);
        onSendMail(updatedEmail);
    };

    return (
        <div className="composer">
            <Link className="composer-back" to="/mail">Back</Link>

            <div className='location'>
                <input
                    type='checkbox'
                    name='location'
                    id='location'
                    checked={!!email.location}
                    onChange={handleChange}
                />
                <label htmlFor='location'>Add my Location</label>
            </div>
                     
            <Formik
                initialValues={{
                    to: email.to || '',
                    subject: email.subject || '',
                    body: email.body || ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label className="email-composer-to" htmlFor="to">To:</label>
                        <Field
                            className="email-composer-to-input"
                            id="to"
                            name="to"
                            type="text"
                        />
                        {errors.to && touched.to && (
                            <div className="error-message">{errors.to}</div>
                        )}

                        <label className="email-composer-subject" htmlFor="subject">Subject:</label>
                        <Field
                            className="email-composer-subject-input"
                            id="subject"
                            name="subject"
                            type="text"
                        />
                        {errors.subject && touched.subject && (
                            <div className="error-message">{errors.subject}</div>
                        )}

                        <label className="email-composer-body" htmlFor="body">Message body:</label>
                        <Field
                            className="email-composer-body-input"
                            id="body"
                            name="body"
                            as="textarea"
                        />
                        {errors.body && touched.body && (
                            <div className="error-message">{errors.body}</div>
                        )}

                        <button type="submit" className="email-send-mail" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}