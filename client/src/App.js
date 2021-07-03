import './App.css';
import CodeEditor from './components/CodeEditor/CodeEditor';
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
            <Redirect to={`/editors/${uuidv4()}`} />
          </Route>
          <Route path='/editors/:id'>
            <CodeEditor />
          </Route>

      </Switch>
    </div>
    </Router>
    
  );
}

export default App;
