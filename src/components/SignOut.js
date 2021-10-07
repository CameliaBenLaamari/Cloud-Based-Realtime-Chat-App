import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useStateIfMounted } from 'use-state-if-mounted'

function SignOut() {

    const { signOut } = useAuth()
    const [error, setError] = useStateIfMounted('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {

        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signOut()
            history.push('/')
        } catch (err) {
            setError('Failed to sign out')
            console.log(err)
        }

        setLoading(false)

    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button className="btn btn-light home" onClick={handleSubmit} disabled={loading}>
                <strong>&lt;</strong> Back to Home
            </Button>
        </>
    )
}

export default SignOut
