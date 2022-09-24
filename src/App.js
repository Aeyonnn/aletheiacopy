import React from 'react';
import './App.css';
import Home from './pages';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import bmpage from './pages/bmpage';
import aboutpage from './pages/abtpage';
import privacyact from './pages/privacyact';
import {Adsense} from '@ctrl/react-adsense';
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
/>
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/bmpage' component={bmpage} exact />
        <Route path='/abtpage' component={aboutpage} exact />
        <Route path='/privacyact' component={privacyact} exact />
      </Switch>
    </Router>
  );
}

export default App;