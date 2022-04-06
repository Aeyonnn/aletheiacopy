import React, { useState, useEffect } from 'react';
import '../App.css';
// Kynch wag mo galawin ito
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
// Hanggang dito



function App() {
  const [greeting, setGreeting] = useState(null)
  async function fetchGreeting(){
    const apiData = await API.get('algoapi', '/pythonapi')
    setGreeting(apiData.message)
  }

  useEffect(() => {
    fetchGreeting()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
      </header>
    </div>
  );
}

export default App;