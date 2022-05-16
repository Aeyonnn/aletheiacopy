import React, {useMemo, useState, useEffect} from 'react'
import {useTable} from 'react-table'
import { Columns } from './table';
import MOCK_DATA from './MOCK_DATA.json'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, IconSearch, input } from './BenchmarkElements'
import './table.css'
import SearchIcon from '@mui/icons-material/Search';

//KYNCH wag galaw
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
//Up to here

function Progress() {
  const [greeting, setGreeting] = useState(null)
  const myInit = {
    queryStringParameters: {
      news: "More people come together for the benefit of the school"
    }
  };
  
  async function fetchNewsAlgo(){
    const apiData = await API.get('algoapi', '/pythonapi', myInit)
    setGreeting(apiData.message)
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
  
  const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow, } = tableInstance


  return (
    <>
    <Container>
      <Icon to='/'>Aletheia</Icon>
        <FormWrap>
            <FormContent>
             <Search>
               <SearchInputs>
                <input type="text" placeholder={greeting}/>
                <IconSearch>
                <SearchIcon />
                </IconSearch>
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