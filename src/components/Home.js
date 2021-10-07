import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

function Home() {

    const history = useHistory()

    function SignIn() {
        history.push('/signin')
    }

    function SignUp() {
        history.push('/signup')
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1> Cloud-Based<br></br>Realtime Chat App</h1>
            <p style={{ marginTop: '2vh', marginBottom: '7vh' }}>By Ahmed Kallel & Camelia Ben Laamari</p>
            <div style={{ top: '50%', display: 'flex', width: '32vh', justifyContent: 'space-between' }}>
                <Button className="signin" onClick={SignIn}>Sign In</Button>
                <Button className="signup" onClick={SignUp}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Home
