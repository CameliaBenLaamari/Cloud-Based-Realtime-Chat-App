import React from 'react'
import { useHistory } from 'react-router'

function Home() {

    const history = useHistory()

    function Continue() {
        history.push('/signin')
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
            <div style={{ position: 'relative', top: '30%', display: 'block', alignItems: 'center' }}>
                <h1> Cloud-Based<br></br>Realtime Chat App</h1>
                <p style={{ marginTop: '5vh', marginBottom: '5vh' }}>By Ahmed Kallel & Camelia Ben Laamari</p>
                <button style={{ top: '40%' }} className="round-button" onClick={Continue}>&#707;</button>
            </div>

        </div>
    )
}

export default Home
