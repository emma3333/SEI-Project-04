import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

// import SecureRoute from './components/common/SecureRoute'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import PoolsShow from './components/pools/Show'
import PoolsIndex from './components/pools/Index'
import PoolsMap from './components/pools/Map'
import PoolsNew from './components/pools/New'
import PoolsCollection from './components/pools/Collection'

import UsersShow from './components/user/Show'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/users/:id" component={UsersShow} />
            <Route path='/pools/new' component={PoolsNew} />
            <Route path='/pools/:id' component={PoolsShow} />
            <Route path='/collections' component={PoolsCollection} />
            <Route path='/pools' component={PoolsIndex} />
            <Route path='/map' component={PoolsMap} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
