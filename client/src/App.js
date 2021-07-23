import './App.css';
import {useEffect} from 'react'
import Room from './components/CodingRound/Room/Room'
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Layouts/Navbar'
import SignIn from './components/Auth/SignIn'
import DashBoard from './components/User/dashboard'
import QuestionBank from './components/QuestionBank/QuestionBank'
import SingleQuestionBank from './components/QuestionBank/SingleQuestionBank'
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import {useDispatch} from 'react-redux'
import {getQuestionBank} from './action/user/user'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuestionBank())
}, [])

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
          <Route path='/user/dashboard' exact><DashBoard /></Route>
          <Route path='/questionBanks' exact><QuestionBank /></Route>
          <Route path='/questionBanks/:id' exact><SingleQuestionBank /></Route>

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
