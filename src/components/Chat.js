import React, { useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase.js'
import SendMessage from './SendMessage.js'
import SignOut from './SignOut'

function Chat() {

    var i = 0
    const [messages, setMessages] = useState([])
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    async function fetchMessages() {
        const data = await db.collection('messages').orderBy('timestamp').limit(50).get()
        return data.docs.map(snapshot => snapshot.data())
    }

    async function fetchUserById(uid) {
        const data = await db.collection('users').get()
        return data.docs.filter(snapshot => snapshot.id === uid)[0].data()
    }

    useEffect(() => {
        async function fetchData() {
            const messages = await fetchMessages()
            const userPromises = messages.map(message => fetchUserById(message.uid))
            const users = await Promise.all(userPromises)
            setMessages(messages.map((message, index) => ({ ...message, displayName: users[index].displayName, photoURL: users[index].photoURL })))
        }
        fetchData();
        scrollToBottom();
    }, [messages])

    function getTime(timestamp) {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getYear() - 69;
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + year + '\t' + hour + ':' + min;
        return time;
    }

    return (
        <div style={{ display: 'block', maxHeight: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '3vh', alignItems: 'center', maxWidth: '100%' }}>
                <img src="newlogo.svg" style={{ height: '5vh', width: 'auto' }} alt='App Logo' />
                <SignOut />
            </div>
            <div className="chat overflow-auto">
                {messages && messages.length > 0 && messages.map(({ text, timestamp, uid, displayName, photoURL }) => (
                    <div className={`quote ${uid === auth.currentUser.uid ? "right" : "left"}`} key={i++} ref={messagesEndRef}>
                        <img className={`round-avatar ${uid === auth.currentUser.uid ? "hidden" : "left"}`} src={photoURL} alt="" />
                        <div className={`speech-bubble ${uid === auth.currentUser.uid ? "right" : "left"}`}>
                            <p>
                                {displayName}
                                <span className='time-ago'>
                                    {getTime(timestamp)}
                                </span>
                            </p>
                            <blockquote>
                                {text}
                            </blockquote>
                        </div>
                        <img className={`round-avatar ${uid === auth.currentUser.uid ? "right" : "hidden"}`} src={auth.currentUser.photoURL} alt="" />
                    </div>
                ))}
            </div>
            <div style={{ margin: 'auto', width: '50%', paddingTop: '3vh', paddingBottom: '5vh' }}>
                <SendMessage />
            </div>
        </div>
    )
}

export default Chat
