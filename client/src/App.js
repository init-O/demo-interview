import './App.css';
import {useEffect, useState} from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import {getQuestionBank, getAllStreams} from './action/user/user'
import {getAuthData} from './action/auth/auth'
import Stream from './components/Streams/Stream'
import StreamList from './components/Streams/StreamList'
import 'react-notifications/lib/notifications.css';
import PageNotFound from './components/Error/PageNotFound';
import LoadingScreen from './components/Layouts/LoadingScreen';

import {NotificationContainer, NotificationManager} from 'react-notifications'

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const userPres = useSelector(state=>state.User.authData);

  const [loading,setLoading] = useState(false);
  const [navbarOpen,setNavbarOpen] = useState(true);


  useEffect(() => {
    dispatch(getQuestionBank())
    dispatch(getAllStreams())
    if(user)
    dispatch(getAuthData(user))
}, [])


  return (
    <Router>
      <div>
      {navbarOpen && <Navbar userPres={userPres} />}
      <NotificationContainer />
      {loading && <LoadingScreen /> }
      <Switch>
          <Route path="/" exact><Home /></Route>

          <Route path='/editor' exact>
            <Redirect to={`/room/${uuidv4()}`} />
          </Route>

          <Route path='/ml' exact>
            <Redirect to={`/ml/room/${uuidv4()}`} />
          </Route>

          <Route path={`/room/:id`} exact><Room setNavbarOpen={setNavbarOpen}/></Route>
          <Route path={`/ml/room/:id`} exact><MachineLearning setNavbarOpen={setNavbarOpen}/></Route>

          <Route path='/signIn' exact><SignIn /></Route> 
          <Route path='/user/dashboard' exact><DashBoard setLoading={setLoading}/></Route>
          <Route path='/questionBanks' exact><QuestionBank setLoading={setLoading} /></Route>
          <Route path='/questionBanks/:id' exact><SingleQuestionBank setLoading={setLoading} /></Route>

          <Route path='/stream/:id' exact><Stream /></Route>
          <Route path='/stream' exact><StreamList /></Route>
          <Route component={PageNotFound}/>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
