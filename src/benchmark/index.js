import React, { useState, useEffect} from 'react'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, FormContentTable, FormLoader} from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import Table from 'react-bootstrap/Table'
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
  //Loading Spinner
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 5000)
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
    <Container>
      <Icon to='/'>Aletheia</Icon>
        <FormWrap>
            <FormContent>
             <Search>
               {/* Div Input */}
               <SearchInputs>
               <Formik
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
                  <Field id="newsSubmit" name="newsSubmit" placeholder="Enter News Here" />
                  <button id="submit" type="submit" disabled={isSubmitting} onClick={handleClick}> 
                  Submit
                  </button>
                </Form>
                )}
              </Formik>
            </SearchInputs>
          </Search>
        </FormContent>
      <FormLoader>
        {//shows loading screen
        loading ? (<CircularProgress/>) : ("") }
      </FormLoader>
      <FormContentTable>
        {//shows table
        combination ? (
          <Table striped bordered hover size="sm">
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
          </Table>) : 
                    ("")}
        </FormContentTable>
        </FormWrap>
    </Container>
    </>
  );
};
export default Progress;
