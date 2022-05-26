import React, { useState, useEffect, Component} from 'react'
import { Icon , Container, FormWrap, FormContent, FormLoader, ContentTable, NavBtnLink} from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
import RadioGroup from '@mui/material/RadioGroup';
import  Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function Progress({ signOut, user }) {
  //Database Access
  const [userid, getId] = useState(null)
  const [user_hist, getHist] = useState(null)
  // Variables to extract algorithm model predictions
  const [combination, getCombination] = useState(null)
  const [decision, getDecision] = useState(null)
  const [neural, getNeural] = useState(null)
  const [randomf, getRandomf] = useState(null)
  const [news_art, getNewsArt] = useState(null)
  const [prediction, setprediction] = useState(null)

  //Setting Category
  const [category,setCategory] = useState("URL")
  //Loading Spinner
  const [loading, setLoading] = useState(false)
  //Enabling
  const [enable,setEnable] = useState(false)
  //Disabling
  const [disable,setDisable] = useState(false)
  //Feedback
  const [yes,setYes] = useState('')
  const [no,setNo] = useState('')

  //Text Field Var
  const [textf, getText] = useState(null)

  const handleClick = () => {
    setLoading(true)
    setDisable(false)
    setTimeout(() => {
      setLoading(false)
    }, 9000)
  }
  
  //Feedback call
  const feedbackVariable = (value) => {
    if (value === 'YES'){
      setYes(value)
      setDisable(true)
      console.log(value)
      writeUserQuery(userid, category, textf, combination, 'YES')
    }
    if (value === 'NO'){
      setNo(value)
      setDisable(true)
      console.log(value)
      writeUserQuery(userid, category, textf, combination, 'NO')
    }
  }
  //Get user history
  const queryUserHistory = {
    queryStringParameters: {
      user: ""
    }
  };
  //Insert data from user query
  const inputUserQuery = {
    queryStringParameters: {
      user: "",
      ntype: "",
      nbody: "",
      alcomb: "",
      usereval: ""
    }
  };
  const getUser = {
    queryStringParameters: {
      user: ""
    }
  };
  //Prediction Function
  const getPredict = {
    queryStringParameters: {
      news: ""
    }
  };
  const getNews = {
    queryStringParameters: {
      newslink: ""
    }
  };
  //Create or Check User from database
  async function getHistory(user_id){
    queryUserHistory.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/aletheidbhistory', queryUserHistory)
    console.log(apiData)
    getHist(apiData.inputHistory)
  }
  async function writeUserQuery(user_id, type, newsbody, comb, usereval){
    inputUserQuery.queryStringParameters.user = user_id
    inputUserQuery.queryStringParameters.ntype = type
    inputUserQuery.queryStringParameters.nbody = newsbody
    inputUserQuery.queryStringParameters.alcomb = comb
    inputUserQuery.queryStringParameters.usereval = usereval
    const apiData = await API.get('algoapi', '/aletheiadbwrite', inputUserQuery)
    console.log(apiData)
  }
  //Create or Check User from database
  async function fetchUserId(email){
    getUser.queryStringParameters.user = email
    const apiData = await API.get('algoapi', '/aletheiadbconnect', getUser)
    getId(apiData.user_id)
  }
  //Calling API to get results
  async function fetchNewsAlgo(article){
    getPredict.queryStringParameters.news = article
    const apiData = await API.get('algoapi', '/pythonapi', getPredict)
    getCombination(apiData.combination)
    getDecision(apiData.decision)
    getNeural(apiData.neural)
    getRandomf(apiData.randomf)
    setprediction(apiData)
  }
  //Calling API to extract new from link
  async function fetchNewsArt(link){
    getNews.queryStringParameters.newslink = link
    const apiData = await API.get('algoapi', '/aletheiawebscraper-dev', getNews)
    getNewsArt(apiData.newsart)
    await fetchNewsAlgo(apiData.newsart)
  }


  window.onload = setprediction;
  fetchUserId(user.attributes.email)
  useEffect(() => {
    // fetchNewsArt()
    // fetchNewsAlgo()
    setprediction()
    // setCategory()
  }, [prediction])

  return (
    <>
    <Icon to='/'>Aletheia</Icon>
    <Container>
        {/* user reference for new navbar since hatdog si ej */}
        <h1>Hello {user.attributes.email}</h1>
        {/* <h1>Hello {userid}</h1> */}
        <button onClick={signOut}>Sign out</button>
        <FormWrap>
            <FormContent>
              <FormLabel>Select Category</FormLabel>
               <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} row>
                  <FormControlLabel value="TEXT" control={<Radio/>} label="Text"/>
                  <FormControlLabel value="URL" control={<Radio/>} label="URL"/>
               </RadioGroup>
                                  {(() => {

                    if (category === "URL") {
                      return (
                        <div> You are using URL
                        <Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)
        
                        fetchNewsArt(values.newsSubmit);
                        actions.setSubmitting(false);
                        }}>  
                        {({isSubmitting}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field id="newsSubmit" name="newsSubmit" placeholder="Enter URL Here" />
                          <button id="submit" type="submit" disabled={isSubmitting} onClick={handleClick}> 
                          Submit
                          </button>
                        </Form>
                        )}
                      </Formik></div>
                      )
                    } else if (category === "TEXT") {
                      return (
                        <div> You are using Text
                        <Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)

                        fetchNewsAlgo(values.newsSubmit);
                        actions.setSubmitting(false);
                        }}>  
                        {({isSubmitting}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field id="newsSubmit" name="newsSubmit" placeholder="Enter Text Here" />
                          <button id="submit" type="submit" disabled={isSubmitting} onClick={handleClick}> 
                          Submit
                          </button>
                        </Form>
                        )}
                      </Formik></div>
                      )
                    }
                    })()}
          </FormContent>
        </FormWrap>
      <FormLoader>
        {//shows loading screen
        loading ? (<CircularProgress/>) : ("") }
      </FormLoader>
      <ContentTable>
        {//shows table
        combination ? (
                  <div class="table-wrapper">
                  <table class="fl-table">
                      <thead>
                      <tr>
                          <th>Model</th>
                          <th>Result</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>Combination</td>
                          <td>{combination}</td>
                      </tr>
                      <tr>
                          <td>Decision Tree</td>
                          <td>{decision}</td>
                      </tr>
                      <tr>
                          <td>Neural Network</td>
                          <td>{neural}</td>
                      </tr>
                      <tr>
                          <td>Random Forest</td>
                          <td>{randomf}</td>
                      </tr>
                      </tbody>
                  </table>
                  <div>
                    <p>Is it true?</p>
                    <button id="submit" type="submit" disabled={disable}  onClick={() => feedbackVariable('YES')}> 
                          Yes
                          </button>
                          <button id="submit" type="submit" disabled={disable} onClick={() => feedbackVariable('NO')}> 
                          No
                          </button>
                  </div>
              </div>) : ("")}
        </ContentTable>
        <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href='https://forms.gle/zmsf1yn5rwCYKXJm6';
              }}
        Click here>Survey Here!</button>
        <NavBtnLink to ="/historypage">History</NavBtnLink>
    </Container>

    </>
  );
};
export default withAuthenticator(Progress);