import React, {useState} from 'react'
import '@aws-amplify/ui-react/styles.css';
import { API } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

function History({ signOut, user }) {
  //Database Access
  const [userid, getId] = useState(null)
  const [user_hist, getHist] = useState(null)

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
    <div>{userid} hello</div> 
    </>
  )
}

export default withAuthenticator(History);