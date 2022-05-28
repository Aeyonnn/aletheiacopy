import React, { useState, useEffect, useMemo} from 'react'
import { Container, FormWrap, FormContent, FormLoader, ContentTable, Button} from './BenchmarkElements'
import { Link } from 'react-router-dom'
//CSS
import './table.css'
import './history.css'
import './navbar.css'
//Icons
import {FaBars} from 'react-icons/fa'
//FORMIK
import { Formik, Field, Form } from 'formik';
import RadioGroup from '@mui/material/RadioGroup';
import  Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
//AWS
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);


const reviewSchemaText = yup.object({
  newsSubmit:yup.string()
  .required()
})

const reviewSchemaURL = yup.object({
  newsSubmit:yup.string()
  .url()
  .required()
})

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
  //Setting Loading
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
  //Submitting
  const [submitting,setSubmitting] = useState(false)
  //Text Field Var
  const [textf, getText] = useState(null)
  const historyClick = () => {
    setEnable(!enable)
    fetchUserId(user.attributes.email)
    console.log(user_hist)
    console.table(user_hist)
  }
  const handleClick = () => {
    setLoading(true)
    setDisable(false)
    setEnable(false)
    getHist(null)
  }
  //For mobile
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
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
    getHist(apiData.inputHistory)
  }
  async function writeUserQuery(user_id, type, newsbody, comb, usereval){
    inputUserQuery.queryStringParameters.user = user_id
    inputUserQuery.queryStringParameters.ntype = type
    inputUserQuery.queryStringParameters.nbody = newsbody
    inputUserQuery.queryStringParameters.alcomb = comb
    inputUserQuery.queryStringParameters.usereval = usereval
    const apiData = await API.get('algoapi', '/aletheiadbwrite', inputUserQuery)
  }
  //Create or Check User from database
  async function fetchUserId(email){
    getUser.queryStringParameters.user = email
    const apiData = await API.get('algoapi', '/aletheiadbconnect', getUser)
    getId(apiData.user_id)
    getHistory(apiData.user_id)
  }
  //Calling API to get results
  async function fetchNewsAlgo(article){
    getPredict.queryStringParameters.news = article
    const apiData = await API.get('algoapi', '/pythonapi', getPredict)
    setLoading(false)
    getCombination(apiData.combination)
    getDecision(apiData.decision)
    getNeural(apiData.neural)
    getRandomf(apiData.randomf)
    setprediction(apiData)
    setSubmitting(false);
  }
  //Calling API to extract new from link
  async function fetchNewsArt(link){
    getNews.queryStringParameters.newslink = link
    const apiData = await API.get('algoapi', '/aletheiawebscraper-dev', getNews)
    getNewsArt(apiData.newsart)
    await fetchNewsAlgo(apiData.newsart)
  }


  window.onload = setprediction;
  
  useEffect(() => {
    fetchUserId(user.attributes.email)
    // fetchNewsArt()
    // fetchNewsAlgo()
    setprediction()
    // setCategory()
  }, [prediction])

  return (
    <div>
    {/* Navbar */}
    <nav className='navbar' toggle={toggle}>
      <Link to='/' className='navbar-logo'> Aletheia </Link>
      <ul className='nav-items'>
        <li className='nav-item'>
          <a href='https://forms.gle/zmsf1yn5rwCYKXJm6' id='Survey'>Survey Here!</a>
        </li>
        <li className='nav-item'>
          <p>{user.attributes.email}</p>
        </li>
        <li className='nav-item'><a onClick={signOut}>Log Out</a></li>
      </ul>
    </nav>
    <Container>
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
                        validationSchema={reviewSchemaURL}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)
        
                        fetchNewsArt(values.newsSubmit)
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
                        validationSchema={reviewSchemaText}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
                        getText(values.newsSubmit)

                        fetchNewsAlgo(values.newsSubmit);
                        
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
    </Container>
  <Container>
    <FormWrap>
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
        </FormWrap>
        </Container>
        <Container>
          <div style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={historyClick}>History</Button>
        </div>
          <FormWrap>
        <ContentTable>
        {
          enable ? (
          <table class='fl-table'>
          <thead>
            <tr>
              <th>News Body</th>
              <th>News Prediction</th>
              <th>User Evaluation</th>
              <th>Checked</th>
            </tr>
            
          </thead>
          <tbody>
          {user_hist.slice(1, user_hist.length).map((item,index) => {
            if (item[6] === null){
              item[6] = "To be evaluated"
            }
            return (
              <tr>
                <td>{item[3]}</td>
                <td>{item[4]}</td>
                <td>{item[5]}</td>
                <td>{item[6]}</td>
              </tr>
            )
          })}
          </tbody>
        </table>) : ("")
        }
        </ContentTable>
        </FormWrap>
    </Container>
    </div>
  );
};
export default withAuthenticator(Progress);