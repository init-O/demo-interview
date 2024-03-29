import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import reducers from './reducers';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import "@fortawesome/fontawesome-free/css/all.min.css";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

