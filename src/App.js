import React from 'react';
import './App.css';
import Home from './pages';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import bmpage from './pages/bmpage';
import aboutpage from './pages/abtpage';



function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/bmpage' component={bmpage} exact />
        <Route path='/abtpage' component={aboutpage} exact />
      </Switch>
    </Router>
  );
}

export default App;