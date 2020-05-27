import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/CreateUser'

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/create" exact render={() => <Create />} />
        </Switch>
      </Router>
    </>
  )
}
