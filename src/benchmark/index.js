import React, {useMemo, useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { Columns } from './table';
import MOCK_DATA from './MOCK_DATA.json'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, IconSearch, input } from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
import {Spinner} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

//KYNCH wag galaw
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
//Up to here

function Progress() {
  // Variables to extract algorithm model predictions
  const [combination, getCombination] = useState(null)
  const [decision, getDecision] = useState(null)
  const [neural, getNeural] = useState(null)
  const [randomf, getRandomf] = useState(null)
  const [news_art,getNewsArt] = useState(null)
  
  const [prediction,setprediction] = useState(null)
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
  
  async function fetchNewsAlgo(){
    //all functions answer are either true or fake, manually input the names of the model.
    //show news use news_art variable
    //combination,decision,neural,randomf
    const apiData = await API.get('algoapi', '/pythonapi', getPredict)
    getCombination(apiData.combination)
    getDecision(apiData.decision)
    getNeural(apiData.neural)
    getRandomf(apiData.randomf)
    
    setprediction(apiData)
    return apiData
  }

  async function fetchNewsArt(){
    const apiData = await API.get('algoapi', '/aletheiawebscraper-dev', getNews)
    getNewsArt(apiData.newsart)
  }

  useEffect(() => {
    // fetchNewsArt()
    // fetchNewsAlgo()
    setprediction(prediction)
  }, [])
  //Up to here
  //Use useMemo() if you want to have the older data in cache
 
  

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
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 5000));
        getNews.queryStringParameters.newslink = values.newsSubmit;
        // await new Promise((r) => setTimeout(r, 5000));
        fetchNewsArt()

        getPredict.queryStringParameters.news = news_art;
        console.log(getPredict.queryStringParameters.news)
        fetchNewsAlgo()

        // await new Promise((r) => setTimeout(r, 20000));
        console.log(prediction)
        alert(JSON.stringify(news_art+neural, null, 2));
      }}
    >
      <Form>
        <label htmlFor="newsSubmit"></label>
        <Field id="newsSubmit" name="newsSubmit" placeholder="Enter News Here" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
               </SearchInputs>
             </Search>
            </FormContent>
            <FormContent>
              {prediction ? (<Table striped bordered hover size="sm">
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
                ("Loading")}
        </FormContent>
        </FormWrap>
    </Container>
    </>
  );
};
export default Progress;


