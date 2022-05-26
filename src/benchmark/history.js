import React, {useState, useMemo} from 'react'
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useTable } from 'react-table'
import { Columns } from './table'
function History({ signOut, user }) {


  const columns = useMemo(() => Columns,[])
  //const datas = useMemo(() => data,[])
  const tableInstance = useTable({
    columns,
    //datas
  })
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,} = tableInstance
  //Database Access
  const [userid, getId] = useState(null)
  const [user_hist, getHist] = useState(null)
  const [data, getData] = useState(null)

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

  //Create or Check User from database
  async function getHistory(user_id){
    queryUserHistory.queryStringParameters.user = user_id
    const apiData = await API.get('algoapi', '/aletheidbhistory', queryUserHistory)
    console.log(apiData)
    getHist(apiData.inputHistory)
  }

  //Create or Check User from database
  async function fetchUserId(email){
    getUser.queryStringParameters.user = email
    const apiData = await API.get('algoapi', '/aletheiadbconnect', getUser)
    getId(apiData.user_id)
  }



  fetchUserId(user.attributes.email)

  return (
    <>
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
    </>
  )
}

export default withAuthenticator(History);