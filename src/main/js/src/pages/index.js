import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../utils/Auth'
import Main from '../components/Layout/Main'

function Register() {
  const history = useHistory()
  const { user } = useAuth()

  return <Main background={false}>FitnessCentar</Main>
}

export default Register
