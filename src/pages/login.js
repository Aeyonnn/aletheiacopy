import React from 'react'
import Signup from '../authenticator'
import Login from '../authenticator/login'
import {Account} from '../authenticator/account'
import Status from '../authenticator/status'

const login = () => {
  return (
    <Account>
    <Status />
    <Signup />
    <Login />
    </Account>
  )
}

export default login