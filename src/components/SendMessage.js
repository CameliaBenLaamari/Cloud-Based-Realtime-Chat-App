import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { auth, db } from '../firebase'

function SendMessage() {

    const [message, setMessage] = useState('')

    async function sendMessage(e) {
        e.preventDefault()

        await db.collection('messages').add({
            text: message,
            uid: auth.currentUser.uid,
            timestamp: new Date(Date.now())
        })

        setMessage('')
    }

    return (
        <Form onSubmit={sendMessage} style={{ display: 'flex', justifyContent: 'right' }}>
            <Form.Group id="message" className="mt-2">
                <Form.Control type="text" value={message} placeholder="Write a message..." onChange={e => setMessage(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="mt-2" style={{ width: '10%', marginLeft: '2vh' }}>Send</Button>
        </Form>
    )
}

export default SendMessage
