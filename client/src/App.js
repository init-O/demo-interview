import './App.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
import VideoPlayer from './components/Video/Video'
import Room from './components/Room/Room'
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Navbar from './components/Layouts/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <Router>
      <div>
        
      

      <Navbar />
      <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path='/editor' exact>
            <Redirect to={`/room/:${uuidv4()}`} />
          </Route>
          <Route path={`/room/:id`} exact><Room/></Route>
          <Route path={`/room/video/:videoId`} exact><VideoPlayer /></Route>

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
