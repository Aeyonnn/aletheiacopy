import React, {useMemo, useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { Columns } from './table';
import MOCK_DATA from './MOCK_DATA.json'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, IconSearch, input } from './BenchmarkElements'
import './table.css'
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Field, Form } from 'formik';


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
  
  const getPredict = {
    queryStringParameters: {
      news: "More people come together for the benefit of the school"
    }
  };
  
  async function fetchNewsAlgo(){
    const apiData = await API.get('algoapi', '/pythonapi', getPredict)
    getCombination(apiData.combination)
    getDecision(apiData.decision)
    getNeural(apiData.neural)
    getRandomf(apiData.randomf)
  }

  useEffect(() => {
    fetchNewsAlgo()
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
        news: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
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
            <table {...getTableProps()}>
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
        </table>
        </FormContent>
        </FormWrap>
    </Container>
    </>
  );
};
export default Progress;


