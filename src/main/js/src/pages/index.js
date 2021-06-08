import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../utils/Auth'
import Main from '../components/Layout/Main'

import Center from '../components/Layout/Center'
import { Link } from 'react-router-dom'

function Register() {
  const history = useHistory()
  const { user, loading } = useAuth()

  return (
    <Main style={{ height: '100vh' }}>
      <Center>
        {!loading && !!user && (
          <Link className='btn btn-primary mt-4' to='/app'>
            Idi na aplikaciju
          </Link>
        )}
      </Center>
    </Main>
  )
}

export default Register
