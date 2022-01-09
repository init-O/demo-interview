import './App.css';
import {useEffect, useState} from 'react'
import Room from './components/CodingRound/Room/Room'
import MachineLearning from './components/MachineLearning/Room/Room'
import Whiteboard from './components/CodingRound/Whiteboard/Whiteboard'
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home/Home' 
import Viva from './components/Viva/Room/Room'
import Frontend from './components/FrontendRound/Room/Room'

import Contact from './components/Home/Contact' 
import Disclaimer from './components/Home/Disclaimer' 
import Footer from './components/Home/Footer' 
import MitLiscense from './components/Home/MitLiscense'  
import PrivacyPoilicy from './components/Home/PrivacyPoilicy' 
import Team from './components/Home/Team' 
import Tnc from './components/Home/Tnc'  

import Navbar from './components/Layouts/Navbar'
import SignIn from './components/Auth/SignIn'
import DashBoard from './components/User/dashboard'
import QuestionBank from './components/QuestionBank/QuestionBank'
import SingleQuestionBank from './components/QuestionBank/SingleQuestionBank'
import SingleQuestionBankView from './components/QuestionBankView/SingleQuestionBankView'
import InterviewQuestionBank from './components/QuestionBankView/Main'
import InterviewScoreForm from './components/Forms/InterviewScore'
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
import Videos from './components/Videos/Main'
import TestRecorder from './components/Test/Room'

import {NotificationContainer, NotificationManager} from 'react-notifications'

import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";

import logo from "./components/Home/assets/img/interviewhubplainlogo.jpg"

const override = css`
  display: block;
  text-color: purple;
  margin: 0 auto;
  border-color: red;
  background-color: #282c34;  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const userPres = useSelector(state=>state.User.authData);

  const [loading,setLoading] = useState(false);
  const [navbarOpen,setNavbarOpen] = useState(true);

  const [color, setColor] = useState("#934DCE");

  useEffect(() => {
    dispatch(getQuestionBank())
    dispatch(getAllStreams())
    if(user)
    dispatch(getAuthData(user))

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },4000)
}, [])


  return (
    <Router>
      <div>
        
        <PropagateLoader color={color}  loading={loading} css={override} size={30} >
          
        </PropagateLoader>
      {navbarOpen && <Navbar userPres={userPres} />}
      <NotificationContainer />
      <Switch>
          <Route path="/" exact><Home /></Route>

          <Route path='/editor' exact>
            <Redirect to={`/room/${uuidv4()}`} />
          </Route>

          <Route path='/ml' exact>
            <Redirect to={`/ml/room/${uuidv4()}`} />
          </Route>

          <Route path='/viva' exact>
            <Redirect to={`/viva/room/${uuidv4()}`} />
          </Route>

          <Route path='/frontend' exact>
            <Redirect to={`frontend/room/${uuidv4()}`} />
          </Route>

          <Route path={`/room/:id`} exact><Room setNavbarOpen={setNavbarOpen}/></Route>
          <Route path={`/ml/room/:id`} exact><MachineLearning setNavbarOpen={setNavbarOpen}/></Route>
          <Route path={`/viva/room/:id`} exact><Viva setNavbarOpen={setNavbarOpen}/></Route>
          <Route path={`/frontend/room/:id`} exact> <Frontend setNavbarOpen={setNavbarOpen} /> </Route>

          <Route path='/signIn' exact><SignIn /></Route> 
          <Route path='/user/dashboard' exact><DashBoard setLoading={setLoading}/></Route>
          <Route path='/questionBanks' exact><QuestionBank setLoading={setLoading} /></Route>
          <Route path='/questionBanks/:id' exact><SingleQuestionBank setLoading={setLoading} /></Route>
          <Route path='/interviewscore' exact> <InterviewScoreForm /></Route>
          <Route path='/stream/:id' exact><Stream /></Route>
          <Route path='/stream' exact><StreamList /></Route>

          <Route path='/contact' exact><Contact /></Route>
          <Route path='/disclaimer' exact><Disclaimer /></Route>
          <Route path='/Footer' exact><Footer /></Route>
          <Route path='/mit-license' exact><MitLiscense /></Route>
          <Route path='/privacy-policy' exact><PrivacyPoilicy /></Route>
          <Route path='/our-team' exact><Team /></Route>
          <Route path='/tnc' exact><Tnc /></Route> 
          <Route path='/uploadedVideos' exact><Videos /></Route> 
          <Route path='/testRecorder' exact><TestRecorder /></Route> 

          <Route component={PageNotFound}/>
      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
