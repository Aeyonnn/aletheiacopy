import React, { useState, useEffect, useMemo} from 'react'
import { Container, FormWrap, FormContent, FormLoader, ContentTable,ContentTableHistory, Button, ContainerWhole, ContainerWholeAdmin,ContentTableAdmin,ContainerAdmin} from './BenchmarkElements'
import { Link } from 'react-router-dom'
import * as yup from 'yup';
//CSS
import './table.css'
import './history.css'
import './navbar.css'
import './styles.css'
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
import { ErrorSharp } from '@material-ui/icons';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);


const reviewSchemaText = yup.object({
  newsSubmit:yup.string()
  .required('Input is required')
})

const reviewSchemaURL = yup.object({
  newsSubmit:yup.string()
  .url('Not a valid URL')
  .required('Input is required')
})
const reviewSchemaEval = yup.object({
  updateValue:yup.string()
  .required('Input is required')
  .min(2,'Use TRUE or FALSE')
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
  const [showtable, setShowtable] = useState(null)
  //Setting Results
  const [outcome,setOutcome] = useState(null)
  //Setting Category
  const [category,setCategory] = useState("URL")
  //Loading Spinner
  const [loading, setLoading] = useState(false)
  //Enabling
  const [enable,setEnable] = useState(null)
  //Disabling
  const [disable,setDisable] = useState(false)
  //Feedback
  const [yes,setYes] = useState('')
  const [no,setNo] = useState('')
  //Submitting
  const [submitting,setSubmitting] = useState(false)
  //Text Field Var
  const [textf, getText] = useState(null)

  const [adminEval, setAdminEval] = useState(null)

  const historyClick = () => {
    setRefresh(!refresh)
    setEnable(!enable)
    fetchUserId(user.attributes.email)
    console.log(user_hist)
    console.table(user_hist)
  }

  const refreshclick = () => {
    fetchUserId(user.attributes.email)
  }

  const handleClick = () => {
    setLoading(true)
    setDisable(false)
    setEnable(false)
    getHist(null)
    setShowtable(false)
  }
  //For mobile
  const [isOpen, setIsOpen] = useState(false)

  const [refresh, setRefresh] = useState(null)

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
  //Update History
  const updateAdminHistory = {
    queryStringParameters: {
      admineval: "",
      newsid: ""
    }
  };
  async function getUpdates(check, news_id){
    updateAdminHistory.queryStringParameters.admineval = check
    updateAdminHistory.queryStringParameters.newsid = news_id
    const apiData = await API.get('algoapi', '/aletheiadbupdate', updateAdminHistory)
  }
  //Create or Check User from database
  async function getHistory(user_id){
    queryUserHistory.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/aletheiadbhistory', queryUserHistory)
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
    setSubmitting(false)
    setShowtable(true)
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

  if (userid === 1 || userid === 2 || userid === 3 ){
    return (
      <ContainerWholeAdmin>
      <nav className='navbar' toggle={toggle}>
        <Link to='/' className='navbar-logo'> Aletheia </Link>
        <ul className='nav-items'>
          <li className='nav-item'>
            <p>{user.attributes.email}</p>
          </li>
          <li className='nav-item'>
            <p>Admin</p>
          </li>
          <li className='nav-item'><a onClick={signOut}>Log Out</a></li>
        </ul>
      </nav>
          <ContainerAdmin>
            <div style={{display: "flex", justifyContent: "center", marginBottom: 20, marginTop:100}}>
          <Button onClick={historyClick}>Show Table</Button>
          {refresh ?(<Button onClick={refreshclick}>refresh</Button>):('')}
          </div>
          <ContentTableAdmin>
          {
            enable ? (
          <div class="table-wrapperadmin">

            <table class='tl-table-admin'>
            <thead>
              <tr>
                <th>News ID</th>
                <th>User ID</th>
                <th>News Type</th>
                <th>News Body</th>
                <th>News Prediction</th>
                <th>User Evaluation</th>
                <th>Checked</th>
                <th>Update</th>
              </tr>
              
            </thead>
            <tbody>
            {user_hist.slice(0, user_hist.length).map((item,index) => {
              if (item[6] === null){
                item[6] = "To be evaluated"
              }
              return (
                <tr>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                  <td>{item[6]}</td>
                  <td>
                    <div>
                    <Formik
                          initialValues={{
                          updateValue: '',
                          }}
                          validationSchema={reviewSchemaEval}
                          onSubmit=
                          {async (values, actions) => {
                            getUpdates(values.updateValue, item[0])
                          }}>
                          {({isSubmitting, errors, touched, isValid, dirty}) => 
                          {console.log(errors)
                            return(
                          <Form className='formupdate'>
                          <label htmlFor="updateValue"></label>
                            <Field id="updateValue" name="updateValue" placeholder="TRUE OR FALSE" />
                            <button id="submit" type="submit" disabled={!(dirty && isValid) || isSubmitting} onClick={()=>{getUpdates(handleClick); refreshclick()}}> 
                            Submit
                            </button>
                            {errors.updateValue && touched.updateValue && <p className='erroradmin' style={{color:"black"}} >{errors.updateValue}</p>}
                          </Form>
                          )}}
                        </Formik>
                   </div></td>
                </tr>
              )
            })}
            </tbody>
          </table>
          </div>
          ) : ("")
          }
          </ContentTableAdmin>
      </ContainerAdmin>
  </ContainerWholeAdmin>
    );
        }
  else {
  return (
    <ContainerWhole>
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
                        {({isSubmitting,errors,touched,isValid,dirty}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field id="newsSubmit" name="newsSubmit" placeholder="Enter URL Here" />
                          <button id="submit" type="submit" disabled={isSubmitting || !(dirty && isValid)} onClick={handleClick}> 
                          Submit
                          </button>
                          {
                            errors.newsSubmit && touched.newsSubmit && <p className='error' style={{color: "black"}}> {errors.newsSubmit} </p>
                          }
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
                        {({isSubmitting,errors,touched,isValid,dirty}) => (
                        <Form>
                        <label htmlFor="newsSubmit"></label>
                          <Field id="newsSubmit" name="newsSubmit" placeholder="Enter Text Here" />
                          <button id="submit" type="submit" disabled={isSubmitting || !(dirty && isValid)} onClick={handleClick}> 
                          Submit
                          </button>
                          {
                            errors.newsSubmit && touched.newsSubmit && <p className='error' style={{color: "black"}}> {errors.newsSubmit} </p>
                          }
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
        combination && showtable
         ? (
                  <div class="table-wrapper">
                    {({condition}) => {
                      if({condition} === "['TRUE']"){
                        setOutcome(true)
                      }
                      else{
                        setOutcome(false)
                      }
                    }}
                    {outcome ? (<h1>The news is real</h1>) : (<h1>The news is fake</h1>)}
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
                  <div style={{backgroundColor: '#979DAC', display: 'flex', justifyContent: 'center'}}>
                    <p id='paragraph'>Is this true?</p>
                    <div id='yesbutton'>
                    <button id="submittable" type="submit" disabled={disable}  onClick={() => {feedbackVariable('YES'); refreshclick()}}> 
                          Yes
                          </button>
                          </div>
                    <div id='nobutton'>
                          <button id="submittable" type="submit" disabled={disable} onClick={() => {feedbackVariable('NO'); refreshclick()}}> 
                          No
                          </button>
                          </div>
                  </div>
              </div>) : ("")}
        </ContentTable>
        </FormWrap>
        </Container>
        <Container>
          <div style={{display: "flex", justifyContent: "center", marginBottom: 20, marginTop: -100}}>
        <Button onClick={historyClick}>History</Button>
        </div>
        <ContentTableHistory>
        {
          enable ? (
        <div class="table-wrapperbench">
          <table class='tl-table'>
          <thead>
            <tr>
              <th>News Body</th>
              <th>News Prediction</th>
              <th>User Evaluation</th>
              <th>Checked</th>
            </tr>
            
          </thead>
          <tbody>
          {user_hist.slice(0, user_hist.length).map((item,index) => {
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
        </table>
        </div>
        ) : ("")
        }
        </ContentTableHistory>
    </Container>
</ContainerWhole>
  );
};
  }
export default withAuthenticator(Progress);