import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase.js'
import SendMessage from './SendMessage.js'
import SignOut from './SignOut'

function Chat() {

    const [messages, setMessages] = useState([])

    async function fetchData() {
        const data = await db.collection('messages').orderBy('timestamp').limit(50).get()
        setMessages(data.docs.map(doc => doc.data()))
    }

    useEffect(() => {
        try {
            fetchData()
        } catch (err) {
            console.log(err)
        }
    })

    function getTime(timestamp) {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + year + '\t' + hour + ':' + min;
        return time;
    }

    return (
        <>
            <SignOut />

            {messages.map(({ text, uid, photoURL, timestamp }) => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div className='quote'>
                        <img className={`round-avatar ${uid === auth.currentUser.uid ? "hidden" : "left"}`} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png' alt="User Photo" />
                        <div className={`speech-bubble ${uid === auth.currentUser.uid ? "right" : "left"}`}>
                            <p>
                                {uid}
                                <span className='time-ago'>
                                    {getTime(timestamp)}
                                </span>
                            </p>
                            <blockquote>
                                {text}
                            </blockquote>
                        </div>
                        <img className={`round-avatar ${uid === auth.currentUser.uid ? "right" : "hidden"}`} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png' alt="User Photo" />
                    </div>
                </div>
            ))}

            <SendMessage />
        </>
    )
}

export default Chat
