import './App.css';
import CodeEditor from './CodeEditor';
import {Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
function App() {
  return (
    <Router>
      <div>
        
      

      <Switch>
          <Route path='/' exact>
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
