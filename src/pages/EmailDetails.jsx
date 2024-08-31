import { useEffect, useState } from 'react'
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import { emailService } from '../services/email.service'

export function EmailDetails() {
  const { id } = useParams()
  const [ email, setEmail ] = useState(null)
  
  useEffect(() => {
    loadEmail()
  }, [id])

async function loadEmail() {
    const email = await emailService.getById(id)
    setEmail(email) 
}

return <section className="email-details">
          <Link to="/mail">Back</Link>
          <h1 className='email-details-title'>{email?.subject}</h1>
          <h4 className='email-details-body'>{email?.body}</h4>
      </section>
}

