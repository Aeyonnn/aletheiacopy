import React, {useMemo, useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { Columns } from './table';
import MOCK_DATA from './MOCK_DATA.json'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, IconSearch, input } from './BenchmarkElements'
import './table.css'
import { Formik, Field, Form } from 'formik';
import {Spinner} from 'react-bootstrap'

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
  const columns = useMemo(() => Columns, [])
  const data = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable({
    columns,
    data,
  })
  
  const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow, } = tableInstance;
  

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
        await new Promise((r) => setTimeout(r, 2000));
        getNews.queryStringParameters.newslink = values.newsSubmit;
        fetchNewsArt()
        await new Promise((r) => setTimeout(r, 20000));
        getPredict.queryStringParameters.news = news_art;
        console.log(getPredict.queryStringParameters.news)
        
        fetchNewsAlgo()
        await new Promise((r) => setTimeout(r, 20000));
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
              {prediction ? (<table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps}>
                  {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows.map(row => {
                prepareRow(row)
                return(
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>
                        {cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>) : ("Loading")}
            
        </FormContent>
        </FormWrap>
    </Container>
    </>
  );
};
export default Progress;


