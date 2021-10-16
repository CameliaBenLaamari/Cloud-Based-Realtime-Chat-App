import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth, db } from '../firebase'

function SignUp() {

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const photoURLRef = useRef()
    const { signUp } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function SignIn() {
        history.push('/')
    }

    async function handleSubmit(e) {

        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
                .then(function (result) {
                    return result.user.updateProfile({
                        displayName: firstNameRef.current.value + " " + lastNameRef.current.value,
                        email: emailRef.current.value,
                        photoURL: photoURLRef.current.value ? photoURLRef.current.value : 'https://pixy.org/src/120/thumbs350/1206832.jpg'
                    })
                })
            history.push('/chat')
        } catch (err) {
            setError('Failed to create an account')
            console.log(err)
        }

        console.log(auth.currentUser)
        console.log(auth.currentUser.uid)

        setLoading(false)
        db.collection('users').doc(auth.currentUser.uid).set({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL
        })

    }

    return (
        <div style={{ display: 'block', maxWidth: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '3vh', alignItems: 'center', maxWidth: '100%' }}>
                <img src="newlogo.svg" style={{ height: '5vh', width: 'auto' }} alt='App Logo' />
                <Button className="mt-2 mb-2" style={{ backgroundColor: '#212529', border: 'none', width: '15vh' }} onClick={SignIn}>Sign In</Button>
            </div>
            <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: '40vw', margin: 'auto' }}>
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
                            <Form.Group id="photoURL" className="mt-2">
                                <Form.Control type="photoURL" placeholder="Photo URL" ref={photoURLRef} />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-4" type="submit">Sign Up</Button>
                            <Button className="mt-2 mb-2" style={{ backgroundColor: '#212529', border: 'none' }} onClick={SignIn}>Already have an account? Sign In</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );

}

export default SignUp