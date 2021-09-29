import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'

function SignUp() {

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signUp } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await Promise.all([
                signUp(emailRef.current.value, passwordRef.current.value),
                db.collection('users').add({
                    uid: auth.currentUser,
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    email: emailRef.current.value
                })
            ])
            history.push('/chat')
        } catch (err) {
            setError('Failed to create an account')
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
            <div style={{ position: 'relative', top: '20%', width: '35%', margin: 'auto' }}>
                <Card className="card">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="firstName" className="mt-2">
                                <Form.Control type="firstName" placeholder="First Name" ref={firstNameRef} required />
                            </Form.Group>
                            <Form.Group id="lastName" className="mt-2">
                                <Form.Control type="lastName" placeholder="Last Name" ref={lastNameRef} required />
                            </Form.Group>
                            <Form.Group id="email" className="mt-2">
                                <Form.Control type="email" placeholder="Email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password" className="mt-2">
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mt-2">
                                <Form.Control type="password" placeholder="Confirm your password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to='/signin'>Sign In</Link>
                </div>
            </div>
        </div>
    );

}

export default SignUp