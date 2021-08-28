import './App.css';
import {useEffect} from 'react'
import Room from './components/CodingRound/Room/Room'
import MachineLearning from './components/MachineLearning/Room/Room'
import Whiteboard from './components/CodingRound/Whiteboard/Whiteboard'
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Layouts/Navbar'
import SignIn from './components/Auth/SignIn'
import DashBoard from './components/User/dashboard'
import QuestionBank from './components/QuestionBank/QuestionBank'
import SingleQuestionBank from './components/QuestionBank/SingleQuestionBank'
import SingleQuestionBankView from './components/QuestionBankView/SingleQuestionBankView'
import InterviewQuestionBank from './components/QuestionBankView/Main'
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';
import {useDispatch} from 'react-redux'
import {getQuestionBank} from './action/user/user'
import Stream from './components/Stream'

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

          <Route path='/ml' exact>
            <Redirect to={`/ml/room/${uuidv4()}`} />
          </Route>

          <Route path={`/room/:id`} exact><Room/></Route>
          <Route path={`/ml/room/:id`} exact><MachineLearning/></Route>

          <Route path='/signIn' exact><SignIn /></Route>
          <Route path='/user/dashboard' exact><DashBoard /></Route>
          <Route path='/questionBanks' exact><QuestionBank /></Route>
          <Route path='/questionBanks/:id' exact><SingleQuestionBank /></Route>

          <Route path='/stream/:id' exact><Stream /></Route>

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
