import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import SignOut from './SignOut'
import { auth } from '../firebase'

function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
        <div className="container">
            <Card className="card">
                <div style={{ display: 'flex' }}>
                    <SignOut />
                </div>
                <Card.Body>
                    <h2 className="text-center mb-5">Sign In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mt-2">
                            <Form.Control className="input" type="email" placeholder="Email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mt-2">
                            <Form.Control className="input" type="password" placeholder="Password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">Sign In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2" style={{ marginBottom: '10%' }}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div >
    );

}

export default SignIn