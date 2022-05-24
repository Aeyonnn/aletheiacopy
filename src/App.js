import React from 'react';
import './App.css';
import Home from './pages';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import bmpage from './pages/bmpage';
import aboutpage from './pages/abtpage';
import login from './pages/login';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/bmpage' component={bmpage} exact />
        <Route path='/abtpage' component={aboutpage} exact />
        <Route path='/login' component={login} exact />
      </Switch>
    </Router>
  );
}

export default App;