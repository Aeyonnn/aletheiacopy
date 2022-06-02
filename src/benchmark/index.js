import React, { useState, useEffect, useMemo} from 'react'
import { Container, FormWrap, FormContent, FormLoader, ContentTable,ContentTableHistory, Button, ContainerWhole, ContainerWholeAdmin,ContainerAdmin,ContainerAdminButton,ContainerTable,ContainerTableAdminSum, ContainerAdminShow} from './BenchmarkElements'
import { Link } from 'react-router-dom'
import * as yup from 'yup';
//CSS
import './table.css'
import './history.css'
import './navbar.css'
import './styles.css'
//Icons
import { GrRefresh } from "react-icons/gr";
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

const adminSchemaEval = yup.object({
   adminsearch:yup.number()
   .integer("Must be more than 0")
   .required("This field is required")
})

function Progress({ signOut, user }) {
  //Database Access
  const [userid, getId] = useState(null)
  const [user_hist, getHist] = useState(null)
  const [admin_hist, getAdminquery] = useState(null)
  const [adminsummary, getSumCon] = useState(null)
  const [userdb, getUserDbCon] = useState(null)
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

  //Shows Admin Table
  const [showadmin, setAdmin] = useState(null)
  const [searchadmin, setSearchAdmin] = useState(null)
  //Show 5 secs disabled button
  const [dbutton,setdbutton] = useState(true)
  // const disabledButton = () => {
  //   setdbutton(true);
  //   setTimeout(timeout_trigger,5000)
  // }
  const historyClick = () => {
    setRefresh(!refresh)
    setEnable(!enable)
    //Fetch UserId Executes get History and Summary
    fetchUserId(user.attributes.email)
    console.table(adminsummary)
    console.table(user_hist)
    console.table(userdb)
  }

  const refreshclick = () => {
    fetchUserId(user.attributes.email)
    getSummary(userid)
  }
  const handleClick = () => {
    setLoading(true)
    setDisable(false)
    setEnable(false)
    getHist(null)
    setShowtable(false)
    setSubmitting(true)
    setOutcome(true)
  }
  const adminClick = () => {
    setAdmin(!showadmin)
    setSearchAdmin(false)
    fetchUserId(user.attributes.email)
  }
  const adminSearch = () => {
    setSearchAdmin(true)
    setAdmin(false)
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

  const queryadminHistory = {
    queryStringParameters: {
      user: ""
    }
  };

  //Get Admin History
  const getAdminSum = {
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
  //Update getUserDb
  const getUserDb = {
    queryStringParameters: {
      user: ""
    }
  };
  //Get user database in API
  async function getUserDatabase(user_id){
    getUserDb.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/getuserdb', getUserDb)
    getUserDbCon(apiData.UserDataBase)
  }
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
  //Get User History per ID
  async function getAdminHistory(user_id){
    queryadminHistory.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/aletheiadbhistory', queryUserHistory)
    getHist(apiData.inputHistory)
  }
    //Admin Summary
  async function getSummary(user_id){
    getAdminSum.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/adminsum', getAdminSum)
    getSumCon(apiData.summarystat)
    return apiData.summarystat
  }
  //Write user Query
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
    getSummary(apiData.user_id)
    getUserDatabase(apiData.user_id)
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
    setTimeout(()=> setdbutton(false), 1500)
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
  <ContainerAdminShow>
    <Button onClick={historyClick}>Welcome! Click me</Button>
    {refresh ?(''):('')}
  </ContainerAdminShow>
  <ContainerTable>
  {
      enable ? (
    <ContainerTableAdminSum>
    <div class="table-wrapper-adminsummary">

      <table class='tl-table-adminsummary'>
      <thead>
        <tr>
          <th>Evaluation</th>
          <th>Feedback</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
      {adminsummary.slice(0, adminsummary.length).map((item,index) => {
        return (
          <tr>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </div>
    <div class="table-wrapper-adminusers">
    <table class='tl-table-adminusers'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
      {userdb.slice(0, userdb.length).map((item,index) => {
        return (
          <tr>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </div>
    </ContainerTableAdminSum>
    ) : ("")
    }
    {enable ? (
      <ContainerWhole>
      <ContainerAdmin>
            <Formik
              initialValues={{
                adminsearch: '',
              }}
              validationSchema={adminSchemaEval}
              onSubmit=
              {async (values, actions) => {
                getHistory(values.adminsearch)
                }}>  
              {({isSubmitting,errors,touched,isValid,dirty}) => (
                  <Form className='formadminsearch'>
                    <label htmlFor="adminsearch"></label>
                      <Field className="adminsearch" name="adminsearch" placeholder="Enter User ID" />
                        <button id="submit" type="submit" disabled={!(dirty && isValid) || isSubmitting} onClick={adminSearch}> 
                        Search User
                        </button>
                        {
                            errors.adminsearch && touched.adminsearch && <p className='errorsearchuser' style={{color: "black"}}> {errors.adminsearch} </p>
                          }
                        <ContainerAdminButton>
                        <button id="showadmintable" onClick={adminClick}>Show Admin Table</button>
                        </ContainerAdminButton>
                          
                  </Form>
                        )}
          </Formik>
          </ContainerAdmin>
          <ContainerTable>
          {searchadmin ? (
            <div class="table-wrapperadmin">
            <table class='tl-table-admin'>
            <thead>
              <tr>
                <th>News</th>
                <th>News Prediction</th>
                <th>User Evaluation</th>
                <th>Checked</th>
                <th>Date Submitted</th>
                <th>Date Checked</th>
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
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                  <td>{item[6]}</td>
                  <td>{item[7]}</td>
                  <td>{item[8]}</td>
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
                <button id="valid" type="valid" disabled={!(dirty && isValid) || isSubmitting} onClick={()=>{getUpdates(handleClick); refreshclick()}}> 
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
          ) : ("")}
          {showadmin ? (    
<div class="table-wrapperadmin">
<table class='tl-table-admin'>
<thead>
  <tr>
    <th>News ID</th>
    <th>User ID</th>
    <th>News Type</th>
    <th>News</th>
    <th>News Prediction</th>
    <th>User Evaluation</th>
    <th>Checked</th>
    <th>Date Submitted</th>
    <th>Date Checked</th>
    <th>Update</th>
  </tr>
  
</thead>
<tbody>
{user_hist.slice(0, user_hist.length).map((item,index) => {
  return (
    <tr>
      <td>{item[0]}</td>
      <td>{item[1]}</td>
      <td>{item[2]}</td>
      <td>{item[3]}</td>
      <td>{item[4]}</td>
      <td>{item[5]}</td>
      <td>{item[6]}</td>
      <td>{item[7]}</td>
      <td>{item[8]}</td>
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
                <button id="valid" type="valid" disabled={!(dirty && isValid) || isSubmitting} onClick={()=>{getUpdates(handleClick); refreshclick()}}> 
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
</div>) : ("")}
                  </ContainerTable>
        </ContainerWhole> 
          
          ) : ("")}
  </ContainerTable>
</ContainerWholeAdmin>
        )}
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
              <FormLabel><h3>Test your news here!</h3></FormLabel>
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
                          <Field className="newsSubmit" name="newsSubmit" placeholder="Enter URL Here" />
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
                          <Field className="newsSubmit" name="newsSubmit" placeholder="Enter Text Here" />
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
                  <div className="table-wrapper">
                    <div>{outcome ? (<h1>The news is {combination}</h1>) : ("")}</div>
                  <table class="fl-table">
                      <thead>
                      <tr>
                          <th>Model</th>
                          <th>Result</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td><div data-tooltip='This is the combination of the three algorithms and is the product of the study. Using Ensemble voting classifier, we combined the three algorithms to provide which of the algorithms will be best suited when working together for the dataset that we built. 'className='tooltip'>Combination</div></td>
                          <td><b>{combination}</b></td>
                      </tr>
                      <tr>
                        <td colSpan={2}><b>Algorithms</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='A decision tree is a type of supervised machine learning that categorizes or predicts outcomes based on the answers to prior questions. The model is supervised learning, which means it is trained and tested on a set of data containing the intended categorization.'className='tooltip'>Decision Tree</div></td>
                          <td><b>{decision}</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='The type of Neural Network used in this study is an MLP (Multilayer Perceptron). An MLP creates outputs from a set of inputs. The input is distributed in multiple layers that are linked to the data and the output'className='tooltip'>Neural Network</div></td>
                          <td><b>{neural}</b></td>
                      </tr>
                      <tr>
                          <td><div data-tooltip='A random forest is a decision tree that is bundled up together. In this case multiple decision tree exist to create output based on the data and input.'className='tooltip'>Random Forest</div></td>
                          <td><b>{randomf}</b></td>
                      </tr>
                      </tbody>
                  </table>
                  <div style={{backgroundColor: '#EDEDED', display: 'flex', justifyContent: 'center',marginTop:10}}>
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
          <div style={{display: "flex", justifyContent: "center", marginBottom: 20, marginTop: -70}}>
        <Button id="history" onClick={historyClick} disabled={dbutton} >History</Button>
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
              <th>Date Submitted</th>
              <th>Date Checked</th>
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
                <td>{item[7]}</td>
                <td>{item[8]}</td>
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