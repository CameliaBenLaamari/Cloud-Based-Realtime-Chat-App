import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import SignIn from './SignIn'

function Home() {

    const history = useHistory()

    function SignUp() {
        history.push('/signup')
    }

    return (
        <div className="home">
            <section className="curved">
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '3vh', alignItems: 'center', maxWidth: '100%' }}>
                    <img src='supcom.png' style={{ height: '10vh', width: 'auto' }} alt="SUP'COM Logo" />
                    <Button className="mt-2 mb-2" style={{ backgroundColor: 'transparent', border: 'solid 0.5px white', width: '15vh' }} onClick={SignUp}>Sign Up</Button>
                </div>
                <img src="newlogo.svg" style={{ height: '10vh', width: 'auto', marginTop: '5vh' }} alt='App Logo' />
                <h1> Cloud-Based<br></br>Realtime Chat App</h1>
                <p>By Ahmed Kallel & Camelia Ben Laamari</p>
            </section>
            <div className="shadow p-3 mb-5 bg-white rounded" style={{ position: 'absolute', top: '70vh', width: '40vw', left: '30vw' }}>
                <SignIn />
            </div>
            <div style={{ marginTop: '30vh', marginBottom: '30vh' }}>
                <p> This app was developed and deployed to the cloud using: </p>
                <div className='icons'>
                    <img className='icon' src='react.png' alt='React Logo' />
                    <img className='icon' src='bootstrap.png' alt='Bootstrap Logo' />
                    <img className='icon' src='firebase.png' alt='Firebase Logo' />
                    <img className='icon' src='docker.png' alt='Docker Logo' />
                    <img className='icon' src='github.png' alt='Github Logo' />
                    <img className='icon' src='heroku.png' alt='Heroku Logo' />
                </div>
                <p style={{ fontSize: '2vh', paddingBottom: '5vh' }}>&#169; SUP'COM. 2021</p>
            </div>
        </div>
    )
}

export default Home
