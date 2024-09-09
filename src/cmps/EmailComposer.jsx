import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';

const validationSchema = Yup.object({
    to: Yup.string().email('Invalid email address').required('"To" is required'),
    subject: Yup.string().required('"Subject" is required'),
    body: Yup.string().required('"Body" is required'),
});

export function EmailComposer() {
    const { id } = useParams();
    const [email, setEmail] = useState(emailService.createEmail());
    const { onSendMail, onUpdateEmail } = useOutletContext();
    const [searchParams] = useSearchParams();
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (id) {
            getEmail();
        }
    }, []);

    async function getEmail() {
        try {
            const email = await emailService.getById(id);
            console.log("get email, ", email);
            setEmail(email);
        } catch {
            console.log("could not get email");
        }
    }

    useEffect(() => {
        console.log("composer searchParams: ", searchParams.toString());
        const to = searchParams.get("to");
        const subject = searchParams.get("subject");

        setEmail(prevEmail => ({ ...prevEmail, to, subject }));
    }, [searchParams]);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(async () => {
            const updatedEmail = await onUpdateEmail(email);
            console.log("updatedEmail: ", updatedEmail);

            setEmail(updatedEmail);
        }, 5000);

        return () => clearTimeout(timeoutRef.current);
    }, [email]);

    async function handleChange({ target }) {
        let { name: field, value, type, checked } = target;
        if (type === 'number' || type === 'range') value = +value;
        else if (type === 'checkbox') {
            if (checked) {
                const { lat, lng } = await utilService.getUserCordinates();
                value = { lat, lng };
            } else {
                value = null;
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
                <FormControlLabel
                    control={
                        <Checkbox
                            name="location"
                            checked={!!email.location}
                            onChange={handleChange}
                        />
                    }
                    label="Add my Location"
                />
            </div>

            <Formik
                initialValues={{
                    to: email.to || '',
                    subject: email.subject || '',
                    body: email.body || ''
                }}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, handleChange: formikHandleChange }) => (
                    <Form>
                        <Field
                            name="to"
                            as={TextField}
                            label="To"
                            fullWidth
                            margin="normal"
                            error={touched.to && !!errors.to}
                            helperText={touched.to && errors.to}
                            onChange={(e) => {
                                formikHandleChange(e);
                                handleChange(e);
                            }}
                        />
                        <Field
                            name="subject"
                            as={TextField}
                            label="Subject"
                            fullWidth
                            margin="normal"
                            error={touched.subject && !!errors.subject}
                            helperText={touched.subject && errors.subject}
                            onChange={(e) => {
                                formikHandleChange(e);
                                handleChange(e);
                            }}
                        />
                        <Field
                            name="body"
                            as={TextField}
                            label="Message Body"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            error={touched.body && !!errors.body}
                            helperText={touched.body && errors.body}
                            onChange={(e) => {
                                formikHandleChange(e);
                                handleChange(e);
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
