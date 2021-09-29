import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

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

    }

    return (
        <div style={{
            backgroundImage: `url('gradients/gradient-1.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0%',
            left: '0%',
            textAlign: 'center'
        }}>
            <div style={{ position: 'relative', top: '30%', width: '35%', margin: 'auto' }}>
                <Card className="card">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign In</h2>
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
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div >
    );

}

export default SignIn