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

return <section className="robot-details">
    <Link to="/email">Back</Link>

    <h1>Details</h1>
    <pre>{JSON.stringify(email, null, 2)}</pre>
  </section>
}

