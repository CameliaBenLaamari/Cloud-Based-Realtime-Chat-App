import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from "react-bootstrap"
import AuthProvider from "../context/AuthContext"
import Chat from "./Chat"
import Home from "./Home"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

function App() {

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "100%" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/chat' component={Chat} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;