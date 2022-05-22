import React, { useState, useEffect} from 'react'
import { Icon , Container, FormWrap, FormContent, FormLoader, ContentTable} from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
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
               <Formik
                  initialValues={{
                  picked: '',
                  }}
                  onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                  }}
                    >
                  {({ values }) => (
                  <Form>
                  <div role="group" aria-labelledby="my-radio-group">
                  <label>
                    <Field type="radio" name="picked" value="URL" />
                      URL
                    </label>
                    <label>
                    <Field type="radio" name="picked" value="Text" />
                      Text
                </label>
                <div>Picked: {values.picked}</div>
              </div>
          </Form>
          )}
        </Formik>
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
