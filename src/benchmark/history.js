import React, {useState, useMemo} from 'react'
import './history.css'
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useTable } from 'react-table'
import { Columns } from './table'
import '@aws-amplify/ui-react/styles.css';
import MOCK_DATA from './MOCK_DATA.json'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function History() {

  var userid = require('./index.js')

  var datauserid = userid.user


  console.log(datauserid)
  const columns = useMemo(() => Columns,[])
  const data = useMemo(() => MOCK_DATA,[])
  const tableInstance = useTable({
    columns,
    data
  })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,} = tableInstance
  //Database Access
  // const [userid, getId] = useState(null)
  // const [user_hist, getHist] = useState(null)

  //Get user history
  const queryUserHistory = {
    queryStringParameters: {
      user: ""
    }
  };

  const getUser = {
    queryStringParameters: {
      user: ""
    }
  };

  // //Create or Check User from database
  // async function getHistory(userid){
  //   queryUserHistory.queryStringParameters.user = userid
  //   const apiData = await API.get('algoapi', '/aletheidbhistory', queryUserHistory)
  //   console.log(apiData)
  //   getHist(apiData.inputHistory)
  // }
  // // console.log(user.attributes.email)
  // //Create or Check User from database
  // async function fetchUserId(email){
  //   getUser.queryStringParameters.user = email
  //   const apiData = await API.get('algoapi', '/aletheiadbconnect', getUser)
  //   getId(apiData.user_id)
  //   getHistory(apiData.user_id)
  // }
  
  // fetchUserId(user.attributes.email)
  return (
    <>
    <div>
      {userid}
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
              )) 
            }
        </tr>
        ))}
        
      </thead>
      <tbody {...getTableBodyProps()}>
        
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map( cell => {
                    return <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                      
                    </td>
                  })
                }
            </tr>
            )
          })
        }
        
      </tbody>
    </table>
    </div>
    </>
  )
}

export default History;