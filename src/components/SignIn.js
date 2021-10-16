import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'

function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function SignUp() {
        history.push('/signup')
    }

    async function handleSubmit(e) {

        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            history.push('/chat')
        } catch (err) {
            setError('Failed to sign in')
            console.log(err)
        }

        setLoading(false)
        console.log(auth.currentUser.uid)

    }

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mt-2">
                        <Form.Control className="input" type="email" placeholder="Email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mt-2">
                        <Form.Control className="input" type="password" placeholder="Password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">Sign In</Button>
                    <Button className="w-100 mt-2 mb-2" style={{ backgroundColor: '#212529', border: 'none' }} onClick={SignUp}>Don't have an account? Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    );

}

export default SignIn