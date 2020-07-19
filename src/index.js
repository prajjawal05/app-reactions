import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import AppRouter from './components/Router';
import './style.css';

const history = createBrowserHistory({basePath: ""})

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <AppRouter/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
