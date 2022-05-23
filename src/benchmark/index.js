import React, { useState, useEffect} from 'react'
import { Icon , Container, FormWrap, FormContent, FormLoader, ContentTable} from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
import RadioGroup from '@mui/material/RadioGroup';
import  Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);


function Progress() {
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
  const handleClick = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 9000)
  }
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
  async function fetchNewsArt(link){
    getNews.queryStringParameters.newslink = link
    const apiData = await API.get('algoapi', '/aletheiawebscraper-dev', getNews)
    getNewsArt(apiData.newsart)
    await fetchNewsAlgo(apiData.newsart)
  }
  window.onload = setprediction;
  useEffect(() => {
    // fetchNewsArt()
    // fetchNewsAlgo()
    setprediction()
  }, [prediction])

  return (
    <>
    <Icon to='/'>Aletheia</Icon>
    <Container>
        <FormWrap>
            <FormContent>
              <FormLabel>Select Category</FormLabel>
               <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)} row>
                  <FormControlLabel value="Text" control={<Radio/>} label="Text" />
                  <FormControlLabel value="URL" control={<Radio/>} label="URL" />
               </RadioGroup>
                                  {(() => {

                    if (category === "URL") {
                      return (
                        <div><Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
        
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
                    } else if (category === "Text") {
                      return (
                        <div><Formik
                        initialValues={{
                        newsSubmit: '',
                        }}
                        onSubmit=
                        {async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 1000));
                        getNews.queryStringParameters.newslink = values.newsSubmit;
        
                        fetchNewsArt(values.newsSubmit);
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
              </div>) : ("")}
        </ContentTable>
    </Container>
    </>
  );
};
export default Progress;
