import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { auth, db } from '../firebase'
import firebase from '@firebase/app-compat'

function SendMessage() {

    const [message, setMessage] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid } = auth.currentUser

        await db.collection('messages').add({
            text: message,
            uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setMessage('')
    }

    return (
        <Form onSubmit={sendMessage}>
            <Form.Group id="message" className="mt-2">
                <Form.Control type="text" value={message} placeholder="Write a message..." onChange={e => setMessage(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="mt-2">Send</Button>
        </Form>
    )
}

export default SendMessage
