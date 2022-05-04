import React, {useMemo} from 'react'
import {useTable} from 'react-table'
import { Columns } from './table';
import MOCK_DATA from './MOCK_DATA.json'
import { Container, FormWrap, Icon, FormContent, Search, SearchInputs, IconSearch, input } from './BenchmarkElements'
import './table.css'
import SearchIcon from '@mui/icons-material/Search';
const Progress = () => {

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
                <input type="text" placeholder='Enter URL'/>
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