import './App.css';
import Room from './components/CodingRound/Room/Room'
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Layouts/Navbar'
import SignIn from './components/Auth/SignIn'

import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';

function App() {
  return (
    <Router>
      <div>
      <Navbar />
      <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path='/editor' exact>
            <Redirect to={`/room/${uuidv4()}`} />
          </Route>
          <Route path={`/room/:id`} exact><Room/></Route>
          <Route path='/signIn' exact><SignIn /></Route>

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
